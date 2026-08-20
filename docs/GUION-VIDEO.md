# Guion de vídeo — TFM Portfolio IA Local

Duración objetivo: **6–8 minutos**.  
Formato: **captura de pantalla obligatoria**; cámara frontal opcional.

Publicar en YouTube (no listado o público) o Google Drive con enlace público.  
Pegar la URL en [README.md](../README.md) → sección “Entrega TFM” y en [TFM.md](TFM.md) §14.

---

## Checklist antes de grabar

- [ ] Resolución **1080p** (1920×1080 o 1280×720 mínimo)
- [ ] Sitio en producción: https://www.andonivianez.info/es (no localhost)
- [ ] Chrome (recomendado). Si no hay Chrome AI / WebGPU, el fallback extractivo es válido y se explica
- [ ] Cerrar pestañas con `.env`, correo, Slack o datos personales
- [ ] **No abrir** Aviso legal ni Privacidad en cámara (constan NIF y domicilio por LSSI)
- [ ] Si aparece el aviso de cookies, pulsar **Entendido** antes de empezar
- [ ] Warm-up: pulsar «¿Cuál es tu experiencia principal?» y esperar la respuesta
- [ ] Silenciar notificaciones (Slack, mail, móvil)
- [ ] Micrófono a ~15 cm, habitación sin eco
- [ ] Opcional: OBS / Loom / QuickTime / ShareX

---

## Estructura del vídeo

| Tiempo    | Pantalla               | Qué decir / qué hacer                                                                                                                                                     |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0:00–0:40 | Home `/es`             | “Soy Andoni Vianez. TFM del máster BigIA: portfolio chat-first con IA **local en el navegador**, sin APIs de pago.”                                                       |
| 0:40–2:10 | Chat en `/es`          | Boot sequence. Pulsar **«¿Cuál es tu experiencia principal?»**. Leer 1–2 frases. Luego **«¿Estás disponible para proyectos freelance?»**. Señalar runtime rail y candado. |
| 2:10–3:00 | Cambio a `/en`         | Conmutador ES/EN. Pulsar **«Do you have AI experience?»**. “Rutas reales `/es` `/en`, indexables, hreflang.”                                                              |
| 3:00–4:00 | `/es/about`            | Scroll: Orbis (empleo actual), freelance, Wattiocorp (firmware). Máster BigIA / Isabel I. GitHub Stats nativo.                                                            |
| 4:00–5:10 | `/es/ai-lab`           | Proveedor activo, retrieval / generation time, chunks. “No guardo el texto de las preguntas; solo métricas agregadas.” Clear metrics.                                     |
| 5:10–6:20 | GitHub + Actions       | Repo `andonivianez-info-ai`. README, [CHANGELOG](../CHANGELOG.md) **v0.5.0**, badge CI verde. “305 tests unitarios, 19 E2E, Gitflow, SemVer.”                             |
| 6:20–7:00 | Home o slide de cierre | Limitaciones: Safari sin WebGPU → fallback; Chrome AI necesita hardware. Enlaces: web, repo, slides. “Gracias.”                                                           |

---

## Guión detallado (texto para leer o adaptar)

### Intro (0:00–0:40)

> Hola, soy Andoni Vianez Ulloa. Este vídeo presenta mi Trabajo de Fin de Máster del máster en Desarrollo con Inteligencia Artificial — BigIA — de la Universidad Isabel I.
>
> He construido un portfolio personal donde el visitante **pregunta en lenguaje natural** sobre mi experiencia, servicios o proyectos. Lo diferencial: la IA se ejecuta **en tu navegador**. Si no hay modelo local, un fallback extractivo responde solo con datos de mi CV en JSON. Cero APIs de pago.

**Acción:** Home `/es` con el chat visible. Si sale el aviso de consentimiento, cerrarlo.

---

### Demo chat ES (0:40–2:10)

> Al cargar, una secuencia de arranque indica el runtime: Chrome Built-in AI, WebGPU o modo compatible.
>
> Pulso una pregunta sugerida… [«¿Cuál es tu experiencia principal?»]. El sistema hace **RAG** sobre mi CV en JSON, recupera chunks y **sintetiza** la respuesta. Si el modelo local se va de contexto, un quality gate la sustituye por la extractiva.
>
> Segunda pregunta… [«¿Estás disponible para proyectos freelance?»]. Debe hablar de kick-off y de compatibilidad con Orbis, no inventar tarifas.
>
> Barra superior: proveedor activo, candado local, limpiar conversación.

**Acción:** Sugerida 1 → leer respuesta → sugerida 2 → señalar runtime rail.

**Si la respuesta no encaja:** no improvisar. Limpiar, repetir la misma sugerida o pasar a «¿Tienes experiencia con IA?».

---

### Multidioma (2:10–3:00)

> Cambio a inglés con el conmutador. No es solo la UI: las rutas `/en` y `/es` son indexables, con hreflang.
>
> Pregunto… [«Do you have AI experience?»]. El RAG usa los mismos datos bilingües y debe mencionar RAG local, BigIA o el TFM.

**Acción:** `/en` → sugerida de IA → respuesta en inglés.

---

### About (3:00–4:00)

> El CV lineal está en About: Orbis (empleo actual, energía), proyectos freelance, firmware en Wattiocorp, y el máster BigIA en la Universidad Isabel I.
>
> GitHub Stats es un bloque **nativo**: API pública de GitHub cacheada en servidor, sin widgets externos.

**Acción:** Scroll `/es/about`. No abrir Aviso legal.

---

### AI Lab (4:00–5:10)

> AI Lab es la demo técnica. Aquí se ve el proveedor, tiempos de retrieval y generación, y cuántos chunks se usaron.
>
> **No guardo el texto de las preguntas.** Solo métricas agregadas en localStorage. La analítica de Vercel, si se acepta, tampoco lleva el literal.

**Acción:** `/es/ai-lab` → métricas → Clear metrics.

---

### Repo y CI (5:10–6:20)

> El código es público. README de entrega, changelog SemVer — ahora **v0.5.0** —, tests con Vitest y Playwright, y CI que corre lint, typecheck, cobertura, build y E2E en cada push a main.
>
> Cifras actuales: **305 tests unitarios** y **19 E2E**.

**Acción:** GitHub → README (badge CI + versión) → CHANGELOG → pestaña Actions (run verde).

---

### Cierre (6:20–7:00)

> Limitaciones: en Safari o iOS sin WebGPU solo corre el fallback extractivo; Chrome AI pide hardware compatible. En ambos casos el visitante obtiene una respuesta anclada al CV, no un silencio.
>
> Enlaces en la descripción: andonivianez.info, el repositorio y las slides. Gracias por ver el proyecto.

**Acción:** Home o slide de cierre con URLs.

---

## Descripción sugerida para YouTube

```text
TFM — Portfolio inteligente con IA local en el navegador
Máster BigIA · Universidad Isabel I · 2026
Andoni Vianez Ulloa

🌐 https://www.andonivianez.info
📦 https://github.com/andonivianez/andonivianez-info-ai
📊 Slides: https://github.com/andonivianez/andonivianez-info-ai/blob/main/docs/TFM_Portfolio_IA_Local_Andoni_Vianez.pptx
📝 Changelog: https://github.com/andonivianez/andonivianez-info-ai/blob/main/CHANGELOG.md

Portfolio chat-first con RAG, Chrome Built-in AI, WebLLM y fallback extractivo (v0.5.0).
0 APIs de pago. Privacidad por diseño.
```

---

## Después de publicar

1. Copiar URL pública del vídeo
2. Sustituir el `TODO` del vídeo en [README.md](../README.md) → tabla “Entrega TFM”
3. Sustituir el `TODO` del vídeo en [docs/TFM.md](TFM.md) → sección 14
4. Enviar el formulario de entrega del campus
