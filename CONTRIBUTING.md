# Contribuir

Gracias por tu interés en este proyecto del TFM.

## Requisitos

- Node.js 22.16+ (ver `.nvmrc`)
- pnpm 11.22+ (ver `packageManager` en `package.json`)

## Configuración

```bash
corepack enable
pnpm install
pnpm dev
```

## Flujo Git (Gitflow)

Este repositorio sigue una variante de [Gitflow](https://nvie.com/posts/a-successful-git-branching-model/):

| Rama        | Propósito                                                            |
| ----------- | -------------------------------------------------------------------- |
| `main`      | Producción estable. Solo recibe merges desde `release/*` o hotfixes. |
| `develop`   | Integración continua del TFM. Base para nuevas features.             |
| `feature/*` | Trabajo de una funcionalidad (p. ej. `feature/rag-embeddings`).      |
| `release/*` | Preparación de una versión (bump, docs, smoke tests).                |
| `hotfix/*`  | Parches urgentes sobre `main`.                                       |

### Flujo habitual

```bash
# Partir siempre de develop actualizado
git checkout develop
git pull origin develop

# Nueva funcionalidad
git checkout -b feature/mi-cambio
# … commits convencionales …
git push -u origin HEAD

# Abrir PR: feature/mi-cambio → develop
# Tras merge, borrar la feature branch

# Release
git checkout -b release/0.5.0 develop
# 1. bump package.json (SemVer)
# 2. añadir sección en CHANGELOG.md (Keep a Changelog)
# 3. actualizar badge/novedades del README
# PR: release/0.5.0 → main  (+ tag v0.5.0)
# mergear también release → develop
```

## Versionado

Seguimos [Semantic Versioning](https://semver.org/lang/es/) y [Keep a Changelog](https://keepachangelog.com/es/1.1.0/).

| Cambio                           | Versión | Ejemplo           |
| -------------------------------- | ------- | ----------------- |
| Feature compatible               | MINOR   | `0.4.0` → `0.5.0` |
| Bugfix o docs sin API nueva      | PATCH   | `0.5.0` → `0.5.1` |
| Rotura de contrato o de producto | MAJOR   | `0.5.0` → `1.0.0` |

Fuente de verdad:

1. `package.json` → campo `version`
2. [CHANGELOG.md](CHANGELOG.md) → sección `[X.Y.Z] - AAAA-MM-DD`
3. Tag Git `vX.Y.Z` en `main` (alineado con Gitflow)

Los commits `feat:` alimentan **Added/Changed**; `fix:` alimenta **Fixed**. No dejes trabajo mergeado en `main` sin sección de changelog.

### Hotfix

```bash
git checkout -b hotfix/nombre main
# fix + commit
# PR → main (tag) y mergear también a develop
```

## Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/), validados por `commitlint`:

- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` documentación
- `test:` tests
- `chore:` mantenimiento
- `refactor:` refactorización sin cambio funcional
- `ci:` cambios de CI/CD

Ejemplos:

```text
feat(rag): add weighted retriever with bilingual synonyms
chore(repo): rename package to andonivianez-info-ai
docs: document Gitflow branching model
```

## Hooks

- `pre-commit`: Prettier + ESLint (lint-staged)
- `commit-msg`: Conventional Commits
- `pre-push`: `pnpm typecheck` + `pnpm test`

## Antes de abrir un PR

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Checklist: ver plantilla de PR en `.github/pull_request_template.md`.
