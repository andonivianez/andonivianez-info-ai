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
git checkout -b release/0.3.0 develop
# ajustar versión / docs
# PR: release/0.3.0 → main  (+ tag v0.3.0)
# mergear también release → develop
```

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
