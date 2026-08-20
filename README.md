# andonivianez-info-ai

[![CI](https://github.com/andonivianez/andonivianez-info-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/andonivianez/andonivianez-info-ai/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-0.5.0-informational.svg)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Portfolio inteligente con **IA generativa 100% local en el navegador**, desarrollado como Trabajo de Fin de Máster (TFM).

**Live:** [www.andonivianez.info](https://www.andonivianez.info)

## Qué es

Un portfolio personal donde el **chat de IA es el protagonista**. Los visitantes preguntan directamente sobre experiencia, stack y proyectos; el CV completo vive en `/about` como documento profesional.

| Ruta         | Propósito                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------- |
| `/es`, `/en` | Chat-first — asistente IA local con boot sequence                                            |
| `/…/about`   | Perfil tipo LinkedIn — experiencia, servicios freelance, FAQ, entrevistas, skills, formación |
| `/…/ai-lab`  | Demo técnica TFM — métricas, proveedores, runtime, distribución de temas                     |
| `/…/legal/*` | Aviso legal, privacidad (RGPD) y cookies                                                     |

Rutas localizadas con `proxy.ts` (Next.js 16): redirección automática según `Accept-Language` y alternates hreflang en sitemap/metadata.

## Funcionalidades principales

- **Chat de IA local** con cascada de proveedores: Chrome Built-in AI → WebLLM (WebGPU) → fallback extractivo
- **RAG sobre JSON bilingüe** (`data/*.json`): experiencia, proyectos, skills, formación, certificaciones
- **Multidioma indexable** con rutas `/es` y `/en`, metadata hreflang y sitemap por idioma
- **Página `/about`** con perfil profesional tipo LinkedIn y GitHub Stats nativos (API cacheada)
- **Página `/ai-lab`** con métricas de runtime, proveedor activo y demo técnica del TFM
- **Privacidad por diseño:** 0 peticiones a APIs de pago (OpenAI, Anthropic, etc.)
- **Calidad de software:** 305 tests unitarios (Vitest), 19 E2E (Playwright), CI en GitHub Actions y Gitflow
- **Versionado SemVer** con historial en [CHANGELOG.md](CHANGELOG.md) (`v0.5.0`)

**Autenticación:** este proyecto **no tiene login**. No se requiere usuario ni contraseña de prueba.

## Novedades v0.5.0

- **Respuestas coherentes:** el chat pasa el contexto RAG al proveedor y sintetiza respuestas extractivas ancladas al CV
- **Quality gate:** si el modelo local genera una respuesta débil, se sustituye por el fallback grounded
- **Legal y consentimiento:** aviso legal, privacidad (RGPD) y cookies en `/legal/*`
- Historial completo: [CHANGELOG.md](CHANGELOG.md)

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
- **Métricas:** localStorage sin almacenar texto de preguntas; analítica agregada opcional vía Vercel Analytics (tema, proveedor, idioma — sin texto literal)
- **Legal:** aviso legal, política de privacidad (RGPD) y cookies en `/legal/*` con aviso informativo de consentimiento

## Stack

| Capa      | Tecnología                                          |
| --------- | --------------------------------------------------- |
| Framework | Next.js 16 · React 19 · TypeScript 5.9              |
| Estilos   | Tailwind CSS 4 · motion                             |
| IA        | @mlc-ai/web-llm · Chrome Prompt API                 |
| Calidad   | Vitest · Playwright · ESLint 9 · Husky · Commitlint |
| Deploy    | Vercel · pnpm 11                                    |

## Instalación

**Requisitos:** Node.js 22.16+ (ver [`.nvmrc`](.nvmrc)), pnpm 11.22+ (ver `packageManager` en `package.json`).

```bash
corepack enable
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) (redirige a `/es` o `/en`).

Build y servidor de producción local:

```bash
pnpm build
pnpm start
```

## Scripts

| Comando              | Descripción                     |
| -------------------- | ------------------------------- |
| `pnpm dev`           | Servidor de desarrollo          |
| `pnpm build`         | Build de producción             |
| `pnpm lint`          | ESLint                          |
| `pnpm typecheck`     | Verificación TypeScript         |
| `pnpm test`          | Tests unitarios (Vitest)        |
| `pnpm test:coverage` | Unitarios + umbral de cobertura |
| `pnpm e2e`           | Tests end-to-end (Playwright)   |

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
docs/
  TFM.md          # Documentación académica
  PRESENTACION.md # Guion de slides (TFM)
  GUION-VIDEO.md  # Guion de vídeo (TFM)
  TFM_Portfolio_IA_Local_Andoni_Vianez.pptx  # Deck de defensa
CHANGELOG.md      # Historial de versiones (SemVer)
```

## Gitflow

Este proyecto sigue **Gitflow**. Ver [CONTRIBUTING.md](CONTRIBUTING.md).

```text
main        ← producción (tags semver: v0.5.0)
develop     ← integración
feature/*   ← nuevas funcionalidades
release/*   ← preparación de versión
hotfix/*    ← correcciones urgentes en producción
```

Versionado: [SemVer](https://semver.org/lang/es/) en `package.json` + tag `vX.Y.Z`. Historial en [CHANGELOG.md](CHANGELOG.md).  
Commits: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`).

## Seguridad

- **Sin secretos de API** en el repo (no hay OpenAI/Anthropic; `.env*` está en `.gitignore`)
- **Teléfono excluido** del portfolio y del chat
- **Email de contacto** (`andoni.bartolo@gmail.com`) es público a propósito
- **NIF y domicilio** solo en `/legal/*` (obligación LSSI). No aparecen en About ni en el chat salvo la FAQ de facturación (NIF de autónomo)
- Ver [SECURITY.md](SECURITY.md)

## Documentación TFM

| Documento                                                                                        | Contenido                                                 |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| [docs/TFM.md](docs/TFM.md)                                                                       | Arquitectura, RAG, proveedores, limitaciones y resultados |
| [docs/TFM_Portfolio_IA_Local_Andoni_Vianez.pptx](docs/TFM_Portfolio_IA_Local_Andoni_Vianez.pptx) | Slides de defensa (PowerPoint)                            |
| [docs/PRESENTACION.md](docs/PRESENTACION.md)                                                     | Guion / notas de orador de las slides                     |
| [docs/GUION-VIDEO.md](docs/GUION-VIDEO.md)                                                       | Guion de vídeo con captura de pantalla                    |
| [CHANGELOG.md](CHANGELOG.md)                                                                     | Historial SemVer (`v0.5.0`)                               |

## Entrega TFM (Fundae)

Material exigido por el máster BigIA — [requisitos oficiales](https://campus.thebigschool.com/wp-content/uploads/2026/02/Documentacion-TFM-Fundae-1.pdf).

**Estado:** el producto y el repo están listos. Solo falta el vídeo de captura y pegar su URL.

| Entregable                     | Estado    | URL                                                                                                                                                             |
| ------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repositorio GitHub (público)   | Hecho     | https://github.com/andonivianez/andonivianez-info-ai                                                                                                            |
| Despliegue en producción       | Hecho     | https://www.andonivianez.info                                                                                                                                   |
| Slides                         | Hecho     | [docs/TFM_Portfolio_IA_Local_Andoni_Vianez.pptx](https://github.com/andonivianez/andonivianez-info-ai/blob/main/docs/TFM_Portfolio_IA_Local_Andoni_Vianez.pptx) |
| Vídeo (captura de pantalla)    | Pendiente | Grabar con [docs/GUION-VIDEO.md](docs/GUION-VIDEO.md) y pegar aquí la URL pública                                                                               |
| Usuario / contraseña de prueba | N/A       | No aplica (sin autenticación)                                                                                                                                   |

Tras publicar el vídeo: sustituir “Pendiente” por la URL en esta tabla y en [docs/TFM.md](docs/TFM.md) §14. Luego enviar el formulario del campus.

## Licencia

MIT — ver [LICENSE](LICENSE).

## Autor

**Andoni Vianez Ulloa** — Senior Full Stack Engineer · T-Shaped Developer

- [LinkedIn](https://www.linkedin.com/in/andoni-vianez/)
- [GitHub](https://github.com/andonivianez)
- [Malt](https://www.malt.es/profile/andonivianez)
