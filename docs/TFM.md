# Portfolio IA Local — Documentación TFM

**Autor:** Andoni Vianez Ulloa  
**Máster:** Desarrollo con Inteligencia Artificial (BigIA) — Universidad Isabel I (2026)  
**Repositorio:** https://github.com/andonivianez/andonivianez-info-ai  
**Despliegue:** https://www.andonivianez.info

---

## 1. Objetivo

Demostrar experimentalmente que es posible construir un **portfolio inteligente y privado** utilizando IA generativa ejecutada **localmente en el navegador** del visitante, sin depender de APIs de pago ni enviar datos personales a terceros.

El visitante puede preguntar en lenguaje natural sobre experiencia, stack, proyectos o formación; el sistema recupera contexto relevante del portfolio y genera (o sintetiza) una respuesta fundamentada.

## 2. Hipótesis de trabajo

1. Un RAG ligero sobre datos estructurados (`data/*.json`) es suficiente para responder la mayoría de preguntas de un reclutador o cliente técnico.
2. La cascada Chrome AI → WebLLM → fallback garantiza **disponibilidad universal** sin sacrificar privacidad cuando el hardware lo permite.
3. Un diseño **chat-first** mejora la experiencia frente a un CV estático, manteniendo el perfil completo en `/about` para SEO y lectura lineal.

## 3. Arquitectura general

```text
Visitante → AIChat → useAIAssistant
                         │
                         ├─ buildPromptBundle (RAG)
                         │     ├─ chunker.ts    → indexa data/*.json
                         │     ├─ retriever.ts  → scoring + sinónimos ES/EN
                         │     └─ context-builder.ts → presupuesto ~2000 chars
                         │
                         └─ AIProviderManager
                               ├─ ChromeAIProvider   (Gemini Nano / Prompt API)
                               ├─ WebLLMProvider     (WebGPU + Web Worker)
                               └─ FallbackProvider   (búsqueda extractiva)
```

**Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4.  
**Datos:** JSON bilingüe (`es` / `en`) como fuente única de verdad.  
**Despliegue:** Vercel (SSG + proxy de locale en `proxy.ts`).

## 4. Proveedores de IA

| Prioridad | Proveedor                        | Requisitos                                         | Comportamiento                                  |
| --------- | -------------------------------- | -------------------------------------------------- | ----------------------------------------------- |
| 1         | Chrome Built-in AI (Gemini Nano) | Chrome 148+, gesto de usuario, hardware compatible | Generación local vía Prompt API                 |
| 2         | WebLLM + WebGPU                  | Navegador con WebGPU, ~1–2 GB descarga inicial     | Modelo en Web Worker                            |
| 3         | Fallback extractivo              | Siempre disponible                                 | Respuesta basada en chunks recuperados, sin LLM |

El `AIProviderManager` selecciona el mejor proveedor disponible en tiempo de ejecución. Si ningún modelo generativo está listo, el fallback garantiza una respuesta útil.

## 5. RAG local

- Chunker ampliado: experiencias (ConnectHealth, Titaneumáticos, docencia), FAQ (~40 entradas), límites honestos (`boundary`), entrevista Opground (`media`).
- Retriever mejorado: alias (RN, TS, K8s), lematización ligera, fuzzy match, mínimo 2 tokens coincidentes, `minScore` recalibrado a 2.
- Banco de ~100 preguntas con test de regresión (`question-bank.test.ts`).

### 5.1 Indexación (`lib/rag/chunker.ts`)

Fragmenta el portfolio en chunks indexables a partir de:

- Perfil, experiencia, proyectos, educación, skills (tecnologías, certificaciones, soft skills)
- Chunks-resumen por categoría para preguntas amplias (“¿Qué tecnologías domina?”)

### 5.2 Recuperación (`lib/rag/retriever.ts`)

- Tokenización con eliminación de stopwords (conservando términos semánticos)
- Sinónimos ES ↔ EN para consultas bilingües
- `sourceBoost` según perfil de audiencia (reclutador, técnico, etc.)
- Umbral mínimo configurable (`AI_CONFIG.minRetrievalScore`)

### 5.3 Construcción de contexto (`lib/rag/context-builder.ts`)

- Presupuesto de ~2000 caracteres
- Si el score top es insuficiente, devuelve mensaje de “información insuficiente” sin llamar al modelo
- El contexto se pasa explícitamente al proveedor (corregido en v0.4.0; síntesis extractiva y quality gate en v0.5.0)

## 6. Privacidad

- **0 peticiones** a APIs de pago (OpenAI, Anthropic, etc.) para inferencia
- Las preguntas **no se almacenan** en servidor ni en métricas locales (solo longitudes y tiempos)
- Analítica agregada opcional (Vercel Analytics): tema detectado del vocabulario controlado, proveedor, idioma y latencia en rangos — **sin texto literal** de las preguntas, sujeta a consentimiento del visitante
- Páginas legales: aviso legal (LSSI), política de privacidad (RGPD) y cookies
- Transparencia de IA (Reglamento UE): el visitante sabe que interactúa con un asistente automatizado
- Cuando el proveedor activo es generativo y local, se muestra aviso de IA privada con enlace a la política
- En modo fallback, se indica que no hay modelo generativo activo

## 7. Multidioma y SEO

- Rutas `/es` y `/en` con `generateStaticParams`
- `proxy.ts` redirige según `Accept-Language`
- Metadata, sitemap y JSON-LD con alternates hreflang
- Objetivo: indexación en ambos idiomas para visibilidad profesional

## 8. Métricas (`/ai-lab`)

Registradas en `localStorage` del navegador (sin texto de preguntas):

- Proveedor utilizado, tiempos de retrieval/generación
- Longitud de contexto y respuesta, score top, éxito/error
- Tema clasificado (`source:sourceId`) y términos del vocabulario controlado
- Distribución de temas y tasa de preguntas sin contexto en el dashboard
- Botón “Clear metrics” para reiniciar la sesión de demo

Eventos agregados en Vercel Analytics (`chat_question`, `chat_gap`) si el visitante acepta analítica.

Útil para la defensa del TFM: demostrar latencias reales en distintos proveedores.

## 9. Calidad de software

| Área            | Herramienta                                                       |
| --------------- | ----------------------------------------------------------------- |
| Tests unitarios | Vitest (305 tests, cobertura en módulos core)                     |
| Tests E2E       | Playwright (19 tests: portfolio, a11y, responsive, coherencia)    |
| CI              | GitHub Actions (lint, typecheck, coverage, build, e2e)            |
| Commits         | Conventional Commits + Commitlint                                 |
| Ramas           | Gitflow (`main`, `develop`, `feature/*`, `release/*`, `hotfix/*`) |

## 10. Resultados esperados

| Escenario                        | Resultado                                                                |
| -------------------------------- | ------------------------------------------------------------------------ |
| Cualquier navegador              | Fallback extractivo responde con chunks relevantes                       |
| Chrome + hardware compatible     | Gemini Nano genera respuestas naturales en local                         |
| Chrome/Edge + WebGPU             | WebLLM descarga modelo y genera en Web Worker                            |
| Safari / iOS sin WebGPU          | Solo fallback (limitación documentada)                                   |
| Preguntas sugeridas (5 perfiles) | `hasRelevantContext === true` tras tuning RAG v0.4.0 / coherencia v0.5.0 |

## 11. Limitaciones conocidas

- Chrome AI requiere hardware compatible y descarga inicial del modelo
- WebLLM no funciona en iOS/Safari sin WebGPU
- Los tests de proveedores reales no se ejecutan en CI (requieren hardware del runner)
- TypeScript 5.9 (TS 7 no es compatible aún con typescript-eslint; ver issue #10940)
- El fallback no “inventa”: si no hay chunks relevantes, comunica la insuficiencia

## 12. Trabajo futuro

- Embeddings locales para retrieval semántico (actualmente lexical + sinónimos)
- Modo offline completo con Service Worker para cache del modelo WebLLM
- Panel de administración para editar `data/*.json` sin tocar el repo
- A/B de prompts según audiencia detectada

## 13. Reproducción

```bash
corepack enable
pnpm install
pnpm dev          # http://localhost:3000 → /es o /en
pnpm test         # Tests unitarios
pnpm e2e          # Tests end-to-end (requiere Playwright)
pnpm build        # Build producción
```

Para evaluar métricas: navegar a `/es/ai-lab` o `/en/ai-lab`, hacer varias preguntas en el chat de la home y volver al AI Lab.

## 14. Referencias de entrega

| Material          | Enlace                                                                                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Slides            | [TFM_Portfolio_IA_Local_Andoni_Vianez.pptx](TFM_Portfolio_IA_Local_Andoni_Vianez.pptx) — [URL pública en GitHub](https://github.com/andonivianez/andonivianez-info-ai/blob/main/docs/TFM_Portfolio_IA_Local_Andoni_Vianez.pptx) |
| Vídeo             | Ver [GUION-VIDEO.md](GUION-VIDEO.md) — URL pública: **TODO**                                                                                                                                                                    |
| Requisitos Fundae | [PDF oficial](https://campus.thebigschool.com/wp-content/uploads/2026/02/Documentacion-TFM-Fundae-1.pdf)                                                                                                                        |
