# Guion de presentación — TFM Portfolio IA Local

**Deck oficial (adjunto al repo):** [TFM_Portfolio_IA_Local_Andoni_Vianez.pptx](TFM_Portfolio_IA_Local_Andoni_Vianez.pptx)  
**URL pública:** https://github.com/andonivianez/andonivianez-info-ai/blob/main/docs/TFM_Portfolio_IA_Local_Andoni_Vianez.pptx

Este markdown es el guion / notas de orador. Duración estimada: **10–12 minutos**.

---

## Slide 1 — Portada

**Título:** Portfolio inteligente con IA local en el navegador  
**Subtítulo:** Trabajo de Fin de Máster — BigIA  
**Autor:** Andoni Vianez Ulloa  
**Institución:** Universidad Isabel I · 2026  
**Enlaces:** www.andonivianez.info · github.com/andonivianez/andonivianez-info-ai

> **Nota de orador (30 s):** Presentarte brevemente. Menciona que el TFM demuestra que un portfolio puede ser interactivo y privado sin APIs de pago.

---

## Slide 2 — El problema

**Título:** Los portfolios estáticos no responden preguntas

- Un CV web lista experiencia, pero el visitante debe leerlo entero
- Reclutadores y clientes quieren respuestas concretas: stack, proyectos, disponibilidad
- Integrar ChatGPT externo implica coste, latencia y fugas de privacidad
- ¿Se puede hacer IA generativa **sin enviar datos a terceros**?

> **Nota de orador (35 s):** Explica la motivación personal: como senior full stack, recibes las mismas preguntas una y otra vez. El portfolio debería responderlas.

---

## Slide 3 — Objetivo del TFM

**Título:** Objetivo

- Construir un portfolio donde el **chat de IA es el protagonista**
- Ejecutar modelos **localmente en el navegador** (Chrome AI, WebLLM)
- Recuperar contexto del CV con **RAG sobre JSON estructurado**
- Garantizar **privacidad**: 0 peticiones a APIs de pago
- Desplegar en producción con calidad de software (tests, CI, Gitflow)

> **Nota de orador (35 s):** Enfatiza que no es un chatbot genérico: es un asistente entrenado con tus datos reales.

---

## Slide 4 — Decisión de diseño

**Título:** Chat-first + CV en `/about`

| Ruta         | Propósito                                    |
| ------------ | -------------------------------------------- |
| `/es`, `/en` | Home con chat como hero                      |
| `/about`     | Perfil tipo LinkedIn (SEO, lectura lineal)   |
| `/ai-lab`    | Demo técnica: proveedores, métricas, runtime |

- Mobile-first, compacto, barra de runtime en mono
- Multidioma real con rutas indexables (`/es`, `/en`)

> **Nota de orador (35 s):** Muestra captura de la home. Explica por qué separaste el chat del CV completo.

---

## Slide 5 — Arquitectura

**Título:** Flujo de datos

```text
Usuario → AIChat → useAIAssistant → RAG (chunker + retriever)
                                        ↓
                              AIProviderManager
                              ├── ChromeAIProvider
                              ├── WebLLMProvider
                              └── FallbackProvider
```

- Next.js 16 · React 19 · TypeScript
- Datos en `data/*.json` bilingüe
- Despliegue en Vercel

> **Nota de orador (40 s):** Recorre el diagrama de arriba a abajo. Destaca que todo ocurre en el cliente excepto el SSR de páginas estáticas.

---

## Slide 6 — RAG local

**Título:** Retrieval Augmented Generation sin servidor

- **Chunker:** fragmenta perfil, experiencia, proyectos, skills, certificaciones
- **Retriever:** scoring lexical + sinónimos ES/EN + boost por audiencia
- **Context builder:** presupuesto ~2000 chars, umbral de confianza
- Sin embeddings (fase 1): rápido, determinista, fácil de depurar

> **Nota de orador (40 s):** Explica por qué elegiste RAG lexical antes que embeddings: simplicidad, reproducibilidad y cero infraestructura.

---

## Slide 7 — Cascada de proveedores

**Título:** Tres niveles de IA local

| Prioridad | Proveedor           | Cuándo                       |
| --------- | ------------------- | ---------------------------- |
| 1         | Chrome Built-in AI  | Chrome 148+, hardware OK     |
| 2         | WebLLM + WebGPU     | Descarga ~1–2 GB, Web Worker |
| 3         | Fallback extractivo | Siempre disponible           |

- Privacidad: candado “local” en la barra de runtime
- Fallback nunca deja al visitante sin respuesta

> **Nota de orador (40 s):** Menciona que probaste en Chrome con WebGPU y en Safari donde solo funciona fallback.

---

## Slide 8 — Multidioma y SEO

**Título:** `/es` y `/en` indexables

- `proxy.ts` detecta `Accept-Language` y redirige
- Metadata, sitemap y JSON-LD con hreflang
- GitHub Stats nativos (API cacheada, sin widget externo)
- Objetivo: visibilidad profesional en ES y EN

> **Nota de orador (30 s):** Breve. Muestra el conmutador ES/EN y el sitemap si tienes captura.

---

## Slide 9 — Calidad de software

**Título:** Ingeniería, no solo demo

- **138 tests unitarios** (Vitest) + **14 E2E** (Playwright)
- CI en GitHub Actions: lint, typecheck, coverage, build, e2e
- Gitflow + Conventional Commits + Husky
- Sin secretos en el repo; datos sensibles excluidos

> **Nota de orador (35 s):** Muestra badge CI verde. Esto demuestra madurez de TFM de ingeniería informática.

---

## Slide 10 — Demo en vivo

**Título:** Recorrido recomendado

1. Home `/es` — boot sequence → pregunta sugerida → respuesta
2. Cambio a `/en` — misma pregunta en inglés
3. `/about` — experiencia, máster BigIA, GitHub Stats
4. `/ai-lab` — proveedor activo, métricas de latencia

> **Nota de orador (60 s):** Si es defensa oral, haz la demo aquí. Si es solo slides, usa capturas o GIF.

---

## Slide 11 — Limitaciones y futuro

**Título:** Lo que aprendí

**Limitaciones:**

- Safari/iOS sin WebGPU → solo fallback
- Chrome AI requiere hardware y descarga inicial
- RAG lexical no captura sinónimos semánticos profundos

**Trabajo futuro:**

- Embeddings locales
- Service Worker para offline
- Panel admin de `data/*.json`

> **Nota de orador (35 s):** Sé honesto con limitaciones; demuestra criterio técnico.

---

## Slide 12 — Cierre

**Título:** Gracias

- **Live:** www.andonivianez.info
- **Repo:** github.com/andonivianez/andonivianez-info-ai
- **Vídeo:** pendiente de grabar (ver [GUION-VIDEO.md](GUION-VIDEO.md))
- **Contacto:** LinkedIn / GitHub / Malt

> **Nota de orador (30 s):** Agradece. Invita a probar el chat en sus propios navegadores. Preguntas.

---

## Checklist del deck

- [x] Deck PowerPoint adjunto en `docs/`
- [x] URL pública en README → sección “Entrega TFM”
- [x] Enlaces clicables a web, repo, LinkedIn, GitHub y Malt
- [ ] Pegar la URL de GitHub en el formulario de entrega del campus
- [x] Sin datos sensibles (teléfono, DNI)
