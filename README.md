# andonivianez-info-ai

[![CI](https://github.com/andonivianez/andonivianez-info-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/andonivianez/andonivianez-info-ai/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Portfolio inteligente con **IA generativa 100% local en el navegador**, desarrollado como Trabajo de Fin de Máster (TFM).

**Live:** [www.andonivianez.info](https://www.andonivianez.info)

## Qué es

Un portfolio personal donde el **chat de IA es el protagonista**. Los visitantes preguntan directamente sobre experiencia, stack y proyectos; el CV completo vive en `/about` como documento profesional.

| Ruta         | Propósito                                             |
| ------------ | ----------------------------------------------------- |
| `/es`, `/en` | Chat-first — asistente IA local con boot sequence     |
| `/…/about`   | Perfil tipo LinkedIn — experiencia, skills, formación |
| `/…/ai-lab`  | Demo técnica TFM — métricas, proveedores, runtime     |

Rutas localizadas con `proxy.ts` (Next.js 16): redirección automática según `Accept-Language` y alternates hreflang en sitemap/metadata.

## Novedades v0.4.0

- **Multidioma indexable:** rutas `/es` y `/en` con metadata, sitemap y JSON-LD por idioma
- **GitHub Stats nativo:** bloque propio con API pública cacheada (sin widget externo)
- **RAG afinado:** umbral reducido, sinónimos ES/EN, certificaciones/soft skills indexados
- **Chat compacto mobile-first:** barra de runtime, transcript flexible, sugerencias horizontales

## Arquitectura IA

```text
Usuario → AIChat → useAIAssistant → RAG (chunker + retriever)
                                        ↓
                              AIProviderManager
                              ├── ChromeAIProvider    (Gemini Nano / Prompt API)
                              ├── WebLLMProvider      (WebGPU + Web Worker)
                              └── FallbackProvider    (búsqueda extractiva)
```

- **Privacidad:** 0 peticiones a APIs de pago (OpenAI, Anthropic, etc.)
- **RAG local:** retrieval ponderado sobre `data/*.json` bilingüe
- **Métricas:** localStorage sin almacenar texto de preguntas

## Stack

| Capa      | Tecnología                                          |
| --------- | --------------------------------------------------- |
| Framework | Next.js 16 · React 19 · TypeScript 5.9              |
| Estilos   | Tailwind CSS 4 · motion                             |
| IA        | @mlc-ai/web-llm · Chrome Prompt API                 |
| Calidad   | Vitest · Playwright · ESLint 9 · Husky · Commitlint |
| Deploy    | Vercel · pnpm 11                                    |

## Instalación

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) (redirige a `/es` o `/en`).

## Scripts

| Comando          | Descripción                   |
| ---------------- | ----------------------------- |
| `pnpm dev`       | Servidor de desarrollo        |
| `pnpm build`     | Build de producción           |
| `pnpm lint`      | ESLint                        |
| `pnpm typecheck` | Verificación TypeScript       |
| `pnpm test`      | Tests unitarios               |
| `pnpm e2e`       | Tests end-to-end (Playwright) |

## Estructura

```text
app/              # Rutas: /[lang], /[lang]/about, /[lang]/ai-lab + SEO
components/
  ai/             # Chat compacto, runtime rail, boot sequence
  github-stats.tsx# Stats GitHub nativos (Server Component)
  home/           # Hero chat-first, proof strip
  about/          # Perfil documento
data/             # Base de conocimiento JSON bilingüe (fuente única de verdad)
lib/
  ai/             # Providers, manager, prompts
  rag/            # Chunker, retriever, context builder
  metrics/        # Métricas locales
hooks/            # use-ai-runtime, use-ai-assistant
e2e/              # Playwright
docs/TFM.md       # Documentación académica
```

## Gitflow

Este proyecto sigue **Gitflow**. Ver [CONTRIBUTING.md](CONTRIBUTING.md).

```text
main        ← producción (tags semver)
develop     ← integración
feature/*   ← nuevas funcionalidades
release/*   ← preparación de versión
hotfix/*    ← correcciones urgentes en producción
```

Commits: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`).

## Seguridad

- Sin claves API en el repositorio
- Datos personales sensibles (teléfono, DNI, dirección) excluidos
- Ver [SECURITY.md](SECURITY.md)

## Documentación TFM

Ver [docs/TFM.md](docs/TFM.md) para arquitectura detallada, limitaciones y resultados experimentales.

## Licencia

MIT — ver [LICENSE](LICENSE).

## Autor

**Andoni Vianez Ulloa** — Senior Full Stack Engineer · T-Shaped Developer

- [LinkedIn](https://www.linkedin.com/in/andoni-vianez/)
- [GitHub](https://github.com/andonivianez)
- [Malt](https://www.malt.es/profile/andonivianez)
