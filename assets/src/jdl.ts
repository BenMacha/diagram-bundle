import type { Entity, Field, Relation, RelationType, Schema } from './types';

/*
 * Minimal JDL (JHipster Domain Language) support:
 *   - parse(): entity / enum / relationship blocks (other statements are skipped)
 *   - toJdl(): the same output as the PHP JdlExporter, so files round-trip.
 */

export class JdlError extends Error {
  line: number;

  constructor(message: string, line: number) {
    super(message);
    this.line = line;
  }
}

type TokenType = 'ident' | 'punct' | 'string' | 'number' | 'doc' | 'annotation';

interface Token {
  type: TokenType;
  value: string;
  line: number;
}

const RELATION_TYPES: RelationType[] = ['OneToOne', 'ManyToOne', 'OneToMany', 'ManyToMany'];
const VALIDATORS = new Set(['required', 'unique', 'min', 'max', 'minlength', 'maxlength', 'pattern', 'minbytes', 'maxbytes']);

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let line = 1;
  const n = source.length;

  while (i < n) {
    const c = source[i];
    if (c === '\n') {
      line++;
      i++;
      continue;
    }
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (c === '/' && source[i + 1] === '/') {
      while (i < n && source[i] !== '\n') i++;
      continue;
    }
    if (c === '/' && source[i + 1] === '*') {
      const start = i;
      const startLine = line;
      const end = source.indexOf('*/', i + 2);
      const stop = end === -1 ? n : end + 2;
      const text = source.slice(start, stop);
      for (const ch of text) if (ch === '\n') line++;
      if (text.startsWith('/**')) tokens.push({ type: 'doc', value: text, line: startLine });
      i = stop;
      continue;
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < n && source[j] !== c) {
        if (source[j] === '\\') j++;
        j++;
      }
      tokens.push({ type: 'string', value: source.slice(i + 1, j), line });
      i = j + 1;
      continue;
    }
    if (c === '@') {
      let j = i + 1;
      while (j < n && /[\w]/.test(source[j])) j++;
      tokens.push({ type: 'annotation', value: source.slice(i + 1, j), line });
      i = j;
      continue;
    }
    if ('{}(),;=*'.includes(c)) {
      tokens.push({ type: 'punct', value: c, line });
      i++;
      continue;
    }
    if (/[0-9-]/.test(c)) {
      let j = i + 1;
      while (j < n && /[0-9.]/.test(source[j])) j++;
      tokens.push({ type: 'number', value: source.slice(i, j), line });
      i = j;
      continue;
    }
    if (/[\w\\$.]/.test(c)) {
      let j = i + 1;
      while (j < n && /[\w\\$.]/.test(source[j])) j++;
      tokens.push({ type: 'ident', value: source.slice(i, j), line });
      i = j;
      continue;
    }
    throw new JdlError(`Unexpected character "${c}"`, line);
  }

  return tokens;
}

function snake(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}

function lowerFirst(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

function splitClass(id: string): { name: string; namespace: string } {
  const pos = id.lastIndexOf('\\');
  return pos === -1 ? { name: id, namespace: '' } : { name: id.slice(pos + 1), namespace: id.slice(0, pos) };
}

interface Doc {
  fqcn?: string;
  table?: string;
}

function readDoc(text: string): Doc {
  const lines = text
    .replace(/^\/\*\*|\*\/$/g, '')
    .split('\n')
    .map((l) => l.replace(/^\s*\*\s?/, '').trim())
    .filter(Boolean);
  const doc: Doc = {};
  for (const l of lines) {
    const table = /^@table\s+(\S+)/.exec(l);
    if (table) doc.table = table[1];
    else if (!doc.fqcn && /^[\w\\]+\\[\w]+$/.test(l)) doc.fqcn = l;
  }
  return doc;
}

export function parseJdl(source: string, manager = 'jdl'): Schema {
  const tokens = tokenize(source);
  let pos = 0;
  let pendingDoc: Doc | null = null;

  const entities = new Map<string, Entity>();
  const relations: Relation[] = [];
  const peek = (offset = 0): Token | undefined => tokens[pos + offset];
  const lastLine = () => (tokens.length ? tokens[tokens.length - 1].line : 1);

  const next = (): Token => {
    const t = tokens[pos++];
    if (!t) throw new JdlError('Unexpected end of file', lastLine());
    return t;
  };
  const expect = (value: string): Token => {
    const t = next();
    if (t.value !== value) throw new JdlError(`Expected "${value}" but found "${t.value}"`, t.line);
    return t;
  };
  const expectIdent = (what: string): Token => {
    const t = next();
    if (t.type !== 'ident') throw new JdlError(`Expected ${what} but found "${t.value}"`, t.line);
    return t;
  };
  const skipParens = () => {
    if (peek()?.value !== '(') return;
    let depth = 0;
    do {
      const t = next();
      if (t.value === '(') depth++;
      if (t.value === ')') depth--;
    } while (depth > 0);
  };
  const skipBlock = () => {
    let depth = 0;
    do {
      const t = next();
      if (t.value === '{') depth++;
      if (t.value === '}') depth--;
    } while (depth > 0);
  };
  const skipDocs = () => {
    while (peek()?.type === 'doc' || peek()?.type === 'annotation') {
      const t = next();
      if (t.type === 'annotation') skipParens();
    }
  };

  const ensureEntity = (name: string): Entity => {
    let entity = entities.get(name);
    if (!entity) {
      const { name: short, namespace } = splitClass(name);
      entity = { id: name, name: short, namespace, table: snake(short), kind: 'entity', parent: null, fields: [] };
      entities.set(name, entity);
    }
    return entity;
  };

  const parseEntity = () => {
    const nameToken = expectIdent('an entity name');
    const doc = pendingDoc || {};
    pendingDoc = null;
    let table: string | null = doc.table || null;
    if (peek()?.value === '(') {
      next();
      table = expectIdent('a table name').value;
      expect(')');
    }
    const name = nameToken.value;
    const id = doc.fqcn || name;
    const { namespace } = splitClass(id);
    const fields: Field[] = [];

    if (peek()?.value === '{') {
      next();
      while (peek() && peek()!.value !== '}') {
        skipDocs();
        if (peek()?.value === '}') break;
        const fieldName = expectIdent('a field name');
        const type = expectIdent('a field type');
        let required = false;
        let unique = false;
        let length: number | null = null;
        while (peek()?.type === 'ident' && VALIDATORS.has(peek()!.value.toLowerCase())) {
          const v = next().value.toLowerCase();
          if (v === 'required') required = true;
          if (v === 'unique') unique = true;
          if (v === 'maxlength' && peek()?.value === '(') {
            next();
            const n = next();
            length = parseInt(n.value, 10) || null;
            expect(')');
          } else {
            skipParens();
          }
        }
        if (peek()?.value === ',') next();
        fields.push({ name: fieldName.value, column: snake(fieldName.value), type: type.value, nullable: !required, unique, id: false, length });
      }
      expect('}');
    }

    if (!fields.some((f) => f.name === 'id')) {
      fields.unshift({ name: 'id', column: 'id', type: 'Long', nullable: false, unique: true, id: true, length: null });
    } else {
      fields.forEach((f) => {
        if (f.name === 'id') f.id = true;
      });
    }

    const existing = entities.get(name);
    const entity: Entity = {
      id,
      name: splitClass(id).name,
      namespace,
      table: table || snake(splitClass(name).name),
      kind: 'entity',
      parent: null,
      fields,
    };
    if (existing) Object.assign(existing, entity);
    else entities.set(name, entity);
  };

  const parseEnum = () => {
    const name = expectIdent('an enum name').value;
    pendingDoc = null;
    const fields: Field[] = [];
    expect('{');
    while (peek() && peek()!.value !== '}') {
      skipDocs();
      const t = next();
      if (t.type === 'ident') {
        fields.push({ name: t.value, column: t.value, type: '', nullable: false, unique: false, id: false, length: null });
        skipParens();
      }
    }
    expect('}');
    const { name: short, namespace } = splitClass(name);
    entities.set(name, { id: name, name: short, namespace, table: null, kind: 'enum', parent: null, fields });
  };

  const parseSide = (): { entity: string; field?: string; required: boolean } => {
    skipDocs();
    const entity = expectIdent('an entity name').value;
    let field: string | undefined;
    let required = false;
    if (peek()?.value === '{') {
      next();
      if (peek()?.type === 'ident') {
        field = next().value;
        skipParens();
      }
      while (peek() && peek()!.value !== '}') {
        const t = next();
        if (t.value.toLowerCase() === 'required') required = true;
      }
      expect('}');
    }
    return { entity, field, required };
  };

  const parseRelationship = () => {
    const typeToken = expectIdent('a relationship type');
    const type = RELATION_TYPES.find((r) => r.toLowerCase() === typeToken.value.toLowerCase());
    if (!type) throw new JdlError(`Unknown relationship type "${typeToken.value}"`, typeToken.line);
    pendingDoc = null;
    expect('{');
    while (peek() && peek()!.value !== '}') {
      const from = parseSide();
      const to = next();
      if (to.value.toLowerCase() !== 'to') throw new JdlError(`Expected "to" but found "${to.value}"`, to.line);
      const target = parseSide();
      if (peek()?.value.toLowerCase() === 'with') {
        next();
        next();
      }
      skipDocs();
      if (peek()?.value === ',') next();

      ensureEntity(from.entity);
      ensureEntity(target.entity);

      if (type === 'OneToMany' && target.field) {
        // Doctrine view: the owning side of a OneToMany is the ManyToOne on the target.
        relations.push({
          id: `${target.entity}::${target.field}`,
          type: 'ManyToOne',
          source: target.entity,
          target: from.entity,
          field: target.field,
          inverseField: from.field || null,
          joinColumns: [`${snake(target.field)}_id`],
          joinTable: null,
          nullable: !target.required,
        });
        continue;
      }

      const field = from.field || lowerFirst(splitClass(target.entity).name);
      relations.push({
        id: `${from.entity}::${field}`,
        type,
        source: from.entity,
        target: target.entity,
        field,
        inverseField: target.field || null,
        joinColumns: type === 'ManyToMany' || type === 'OneToMany' ? [] : [`${snake(field)}_id`],
        joinTable: type === 'ManyToMany' ? `${snake(splitClass(from.entity).name)}_${snake(splitClass(target.entity).name)}` : null,
        nullable: !from.required,
      });
    }
    expect('}');
  };

  while (pos < tokens.length) {
    const t = peek()!;
    if (t.type === 'doc') {
      pendingDoc = readDoc(t.value);
      pos++;
      continue;
    }
    if (t.type === 'annotation') {
      pos++;
      skipParens();
      continue;
    }
    const keyword = t.type === 'ident' ? t.value.toLowerCase() : '';
    if (keyword === 'entity') {
      pos++;
      parseEntity();
    } else if (keyword === 'enum') {
      pos++;
      parseEnum();
    } else if (keyword === 'relationship') {
      pos++;
      parseRelationship();
    } else {
      // Unsupported statement (paginate, dto, service, application { … }, …): skip it.
      pendingDoc = null;
      pos++;
      while (peek() && !['entity', 'enum', 'relationship'].includes(peek()!.value.toLowerCase()) && peek()!.type !== 'doc') {
        if (peek()!.value === '{') skipBlock();
        else pos++;
      }
    }
  }

  // Relations reference JDL names: map them to entity ids (FQCN from doc comments).
  const idOf = (name: string) => entities.get(name)?.id || name;
  const resolved = relations.map((r) => ({ ...r, source: idOf(r.source), target: idOf(r.target), id: `${idOf(r.source)}::${r.field}` }));

  return {
    manager,
    managers: [{ name: manager, connection: null, database: null, driver: 'JDL', default: true }],
    entities: Array.from(entities.values()).sort((a, b) => a.id.localeCompare(b.id)),
    relations: resolved,
  };
}

const TYPES: Record<string, string> = {
  string: 'String', ascii_string: 'String', text: 'TextBlob', integer: 'Integer', smallint: 'Integer',
  bigint: 'Long', float: 'Double', decimal: 'BigDecimal', boolean: 'Boolean', date: 'LocalDate',
  date_immutable: 'LocalDate', datetime: 'Instant', datetime_immutable: 'Instant', datetimetz: 'ZonedDateTime',
  datetimetz_immutable: 'ZonedDateTime', time: 'Duration', time_immutable: 'Duration', guid: 'UUID', uuid: 'UUID',
  ulid: 'String', blob: 'Blob', binary: 'Blob', json: 'TextBlob', json_array: 'TextBlob', array: 'TextBlob',
  simple_array: 'TextBlob', object: 'TextBlob',
};

function jdlType(type: string): string {
  if (TYPES[type]) return TYPES[type];
  return /^[A-Z]/.test(type) ? type : 'String';
}

export function toJdl(schema: Schema): string {
  const counts = new Map<string, number>();
  schema.entities.forEach((e) => counts.set(e.name, (counts.get(e.name) || 0) + 1));
  const names = new Map<string, string>();
  schema.entities.forEach((e) => names.set(e.id, counts.get(e.name) === 1 ? e.name : e.id.replace(/\\/g, '_')));
  const ident = (s: string) => s.replace(/\./g, '_');

  const lines: string[] = [`/* Doctrine entity manager "${schema.manager}" */`, ''];

  for (const entity of schema.entities) {
    if (entity.kind === 'enum') {
      lines.push(`enum ${names.get(entity.id)} {`, `  ${entity.fields.map((f) => f.name).join(', ')}`, '}', '');
      continue;
    }
    lines.push('/**', ` * ${entity.id}`);
    if (entity.table) lines.push(` * @table ${entity.table}`);
    lines.push(' */', `entity ${names.get(entity.id)} {`);
    for (const field of entity.fields) {
      if (field.id && field.name === 'id') continue;
      lines.push(`  ${ident(field.name)} ${jdlType(field.type)}${field.nullable ? '' : ' required'}`);
    }
    lines.push('}', '');
  }

  for (const type of RELATION_TYPES) {
    const list = schema.relations.filter((r) => r.type === type);
    if (!list.length) continue;
    lines.push(`relationship ${type} {`);
    list.forEach((r, i) => {
      const inverse = r.inverseField ? `{${ident(r.inverseField)}}` : '';
      lines.push(`  ${names.get(r.source) || r.source}{${ident(r.field)}} to ${names.get(r.target) || r.target}${inverse}${i < list.length - 1 ? ',' : ''}`);
    });
    lines.push('}', '');
  }

  return lines.join('\n');
}
