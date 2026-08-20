# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.1.0/) y el versionado [Semantic Versioning](https://semver.org/lang/es/):

- **MAJOR** (`X.0.0`): cambios incompatibles de API o de producto
- **MINOR** (`0.X.0`): funcionalidad nueva compatible
- **PATCH** (`0.0.X`): correcciones y mantenimiento sin cambio de contrato

## [0.5.0] - 2026-08-20

### Added

- Sintetizador extractivo que prioriza FAQ/límites y responde en primera persona con datos del CV
- Quality gate: si Chrome AI o WebLLM generan una respuesta débil, se sustituye por la extractiva
- Páginas legales (`/legal/*`): aviso legal, privacidad RGPD y cookies, con consentimiento de analítica
- Entrevista Opground en About (carátula local y YouTube bajo demanda)
- Banco de tests de coherencia del chat (unitarios y E2E)
- Vídeo de captura TFM en [`docs/TFM-demo.mp4`](docs/TFM-demo.mp4)

### Changed

- El hook del asistente pasa el contexto RAG al proveedor activo
- Chunks RAG con etiquetas localizadas (Tecnologías, Logros, Contacto…)
- Prompts del sistema: no contradecir bloques `[FAQ]` / `[BOUNDARY]` ni copiar etiquetas
- Retrieval: stopwords de pregunta (`what`, `your`, `cuál`…) y sinónimos de trayectoria

### Fixed

- El modo compatible ignoraba el contexto recuperado y devolvía “información insuficiente”
- Preguntas como servicios, experiencia principal o diseño gráfico caían en FAQ irrelevantes
- Warning de Next.js por `scroll-behavior: smooth` en transiciones de ruta
- Cobertura de CI tras los módulos legal y analytics

## [0.4.0] - 2026-08-19

### Added

- Rutas indexables `/es` y `/en` con metadata, sitemap y JSON-LD por idioma
- GitHub Stats nativo con API pública cacheada (sin widget externo)
- Chat compacto mobile-first: barra de runtime, transcript flexible y sugerencias horizontales
- Chat conversacional: saludos, meta-preguntas, despedida, euskera, follow-ups y sugerencias dinámicas

### Changed

- RAG afinado: alias (RN, TS, K8s), lematización, tolerancia a erratas y FAQ ampliada
- Banco de ~100 preguntas con tests de regresión de retrieval

### Fixed

- Cobertura de retrieval y paso de contexto en el fallback extractivo

## [0.3.0] - 2026-08-17

### Added

- Home chat-first con boot sequence y proof strip
- Página `/about` tipo LinkedIn (experiencia, skills, formación)
- SEO: sitemap, robots, OG image y JSON-LD Person
- Sistema visual ink/porcelain con Bricolage Grotesque
- Base de conocimiento enriquecida desde CV y LinkedIn

### Fixed

- Teléfono eliminado de la sección de contacto
- Configuración pnpm 11 / Corepack para el deploy en Vercel

## [0.2.1] - 2026-08-17

### Fixed

- Workspace pnpm 11 y Corepack para que el build de Vercel resuelva dependencias

## [0.2.0] - 2026-08-17

### Added

- Chat de IA local con cascada Chrome Built-in AI → WebLLM → fallback extractivo
- RAG léxico bilingüe sobre `data/*.json`
- Página `/ai-lab` con métricas, proveedor activo y conmutador de runtime
- Métricas en localStorage sin guardar el texto de las preguntas
- Perfiles de audiencia y preguntas sugeridas
- Tests E2E (Playwright) y guía Gitflow

## [0.1.0] - 2026-08-16

### Added

- Portfolio base en Next.js 16 con i18n de secciones (experiencia, formación, idiomas, proyectos)
- Tooling: pnpm 11, ESLint, Vitest, Playwright, Husky y Commitlint
- CI en GitHub Actions, Dependabot, LICENSE y SECURITY

[0.5.0]: https://github.com/andonivianez/andonivianez-info-ai/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/andonivianez/andonivianez-info-ai/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/andonivianez/andonivianez-info-ai/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/andonivianez/andonivianez-info-ai/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/andonivianez/andonivianez-info-ai/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/andonivianez/andonivianez-info-ai/commits/v0.2.0
