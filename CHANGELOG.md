# Changelog

All notable changes to `benmacha/diagram-bundle`.

## 2.0.0 — 2026-10-03

Complete rewrite: JSON API + React studio.

### Added
- `GET /api/schema?em=` (entities, fields, owning-side relations, inheritance, embeddables) and `GET /api/managers` (every entity manager with its database and driver, read without opening a connection).
- Mapping read either with Doctrine's metadata factory or directly with the mapping driver (`metadata: auto|factory|driver`): databases that are not reachable still get their diagram.
- React studio: automatic layout (dagre, horizontal / vertical), crow's foot relations anchored on foreign keys, pan / zoom / mini-map, drag to rearrange (remembered), search, show / hide entities and namespaces, focus on neighbours, inspector, JDL editor with live preview and import, SVG / PNG / JSON / JDL export, light / dark themes, `--bmd-*` CSS tokens, English / French.
- Four distributions: React component (`@benmacha/doctrine-diagram`), Vue 3 component (`/vue`), `<doctrine-diagram>` Web Component (`/element`, Shadow DOM), `diagram.js` for Twig / plain HTML; `{{ diagram_widget() }}` Twig function.
- Options `entity_managers`, `exclude`, `metadata`, `access_role`, `title`.
- Functional tests (Symfony 5.4 → 7.4, Doctrine ORM 2 & 3), Vitest suite, CI.

### Changed
- Symfony 5.4+ and PHP 7.2.5+.
- Routes in `Resources/config/routes.yaml` (`routing/routes.yml` kept as an alias).

### Removed
- AngularJS / CodeMirror / nomnoml front-end and the `/sample.jdl` text endpoint (JDL is now exported by the studio).
