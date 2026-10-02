import { describe, expect, it } from 'vitest';
import { parseJdl, toJdl, JdlError } from '../src/jdl';
import { buildRows, computeEdges, computeLayout, measureBox } from '../src/layout';
import type { Box } from '../src/layout';
import type { Schema } from '../src/types';

const schema: Schema = {
  manager: 'default',
  managers: [],
  entities: [
    { id: 'App\\Entity\\Author', name: 'Author', namespace: 'App\\Entity', table: 'author', kind: 'entity', parent: null,
      fields: [{ name: 'id', column: 'id', type: 'integer', nullable: false, unique: false, id: true, length: null }, { name: 'name', column: 'name', type: 'string', nullable: false, unique: false, id: false, length: 120 }] },
    { id: 'App\\Entity\\Book', name: 'Book', namespace: 'App\\Entity', table: 'book', kind: 'entity', parent: null,
      fields: [{ name: 'id', column: 'id', type: 'integer', nullable: false, unique: false, id: true, length: null }, { name: 'summary', column: 'summary', type: 'text', nullable: true, unique: false, id: false, length: null }] },
  ],
  relations: [{ id: 'App\\Entity\\Book::author', type: 'ManyToOne', source: 'App\\Entity\\Book', target: 'App\\Entity\\Author', field: 'author', inverseField: 'books', joinColumns: ['author_id'], joinTable: null, nullable: false }],
};

describe('JDL', () => {
  it('exports entities, types and relations', () => {
    const jdl = toJdl(schema);
    expect(jdl).toContain('entity Author {');
    expect(jdl).toContain('name String required');
    expect(jdl).toContain('summary TextBlob');
    expect(jdl).toContain('relationship ManyToOne {');
    expect(jdl).toContain('Book{author} to Author{books}');
  });

  it('round-trips class names, tables and relations', () => {
    const parsed = parseJdl(toJdl(schema));
    expect(parsed.entities.map((e) => e.id).sort()).toEqual(['App\\Entity\\Author', 'App\\Entity\\Book']);
    const book = parsed.entities.find((e) => e.name === 'Book')!;
    expect(book.table).toBe('book');
    expect(book.fields.find((f) => f.name === 'summary')!.nullable).toBe(true);
    expect(parsed.relations).toHaveLength(1);
    expect(parsed.relations[0]).toMatchObject({ type: 'ManyToOne', source: 'App\\Entity\\Book', target: 'App\\Entity\\Author', field: 'author', inverseField: 'books' });
  });

  it('turns a OneToMany into the owning ManyToOne', () => {
    const parsed = parseJdl('entity Post { title String }\nentity Comment { body TextBlob }\nrelationship OneToMany { Post{comments} to Comment{post required} }');
    expect(parsed.relations[0]).toMatchObject({ type: 'ManyToOne', source: 'Comment', target: 'Post', field: 'post', inverseField: 'comments', nullable: false });
  });

  it('skips unsupported statements and reports errors with a line', () => {
    expect(parseJdl('paginate * with pagination\napplication { config { baseName x } }\nentity A').entities).toHaveLength(1);
    try {
      parseJdl('entity A {\n  name String\n}\nrelationship Weird { A to B }');
      throw new Error('should fail');
    } catch (e) {
      expect(e).toBeInstanceOf(JdlError);
      expect((e as JdlError).line).toBe(4);
    }
  });
});

describe('layout', () => {
  it('lays out entities without overlap and anchors edges on the foreign key row', () => {
    const measure = (text: string) => text.length * 7;
    const names = new Map(schema.entities.map((e) => [e.id, e.name]));
    const sized = schema.entities.map((entity) => {
      const rows = buildRows(entity, schema.relations, names, 'all');
      return { id: entity.id, entity, rows, ...measureBox(entity, rows, measure) };
    });
    const positions = computeLayout(sized, schema.relations, 'LR');
    const boxes: Box[] = sized.map((b) => ({ ...b, ...positions.get(b.id)! }));
    const [a, b] = boxes;
    const overlap = a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
    expect(overlap).toBe(false);

    const bookRows = boxes.find((x) => x.entity.name === 'Book')!.rows;
    expect(bookRows.find((r) => r.kind === 'fk')!.label).toBe('author');
    expect(boxes.find((x) => x.entity.name === 'Author')!.rows.find((r) => r.kind === 'collection')!.type).toBe('Book[]');

    const edges = computeEdges(new Map(boxes.map((x) => [x.id, x])), schema.relations);
    expect(edges).toHaveLength(1);
    expect(edges[0].d.startsWith('M')).toBe(true);
  });
});
