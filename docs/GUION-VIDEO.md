# Guion de vídeo — TFM Portfolio IA Local

Duración objetivo: **6–8 minutos**.  
Formato: **captura de pantalla obligatoria**; cámara frontal opcional.

Publicar en YouTube (no listado o público) o Google Drive con enlace público.  
Pegar la URL en [README.md](../README.md) → sección “Entrega TFM”.

---

## Checklist antes de grabar

- [ ] Resolución **1080p** (1920×1080 o 1280×720 mínimo)
- [ ] Cerrar pestañas con datos personales, `.env`, emails
- [ ] Silenciar notificaciones (Slack, mail, móvil)
- [ ] Navegador limpio: Chrome recomendado (para mostrar WebGPU/Chrome AI si está disponible)
- [ ] Tener el sitio desplegado abierto: https://www.andonivianez.info
- [ ] Probar una pregunta sugerida antes de grabar (warm-up del fallback)
- [ ] Micrófono a ~15 cm, habitación sin eco
- [ ] Opcional: OBS / Loom / QuickTime / ShareX

---

## Estructura del vídeo

| Tiempo    | Pantalla               | Qué decir / qué hacer                                                                                                                                                                  |
| --------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0:00–0:40 | Home `/es`             | “Soy Andoni Vianez. Este es mi TFM del máster BigIA: un portfolio donde la IA corre en tu navegador, sin enviar datos a OpenAI ni similares.”                                          |
| 0:40–2:00 | Chat en `/es`          | Esperar boot sequence. Pulsar una pregunta sugerida (p. ej. tecnologías o experiencia). Leer parte de la respuesta. Señalar barra de runtime: proveedor, candado local, botón limpiar. |
| 2:00–3:00 | Cambio a `/en`         | Usar conmutador ES/EN. Repetir pregunta en inglés. “Las rutas son reales, indexables, con hreflang para SEO.”                                                                          |
| 3:00–4:00 | `/about`               | Scroll por experiencia (Orbis, Wattiocorp embebido). Mencionar máster BigIA / Universidad Isabel I. Mostrar bloque GitHub Stats nativo.                                                |
| 4:00–5:20 | `/ai-lab`              | Explicar proveedor activo, métricas (retrieval time, generation time). “Las preguntas no se guardan; solo métricas agregadas en localStorage.” Botón Clear metrics.                    |
| 5:20–6:20 | GitHub repo + Actions  | Abrir github.com/andonivianez/andonivianez-info-ai. Mostrar README, estructura, badge CI verde. “138 tests unitarios, 14 E2E, Gitflow.”                                                |
| 6:20–7:00 | Cierre en home o slide | Limitaciones: Safari sin WebGPU, Chrome AI requiere hardware. Enlaces: web, repo, slides. “Gracias por ver el proyecto.”                                                               |

---

## Guión detallado (texto para leer o adaptar)

### Intro (0:00–0:40)

> Hola, soy Andoni Vianez Ulloa. Este vídeo presenta mi Trabajo de Fin de Máster del máster en Desarrollo con Inteligencia Artificial — BigIA — de la Universidad Isabel I.
>
> He construido un portfolio personal donde el visitante puede **preguntar en lenguaje natural** sobre mi experiencia, stack o proyectos. Lo diferencial: la inteligencia artificial se ejecuta **localmente en el navegador**, sin enviar conversaciones a APIs de pago.

**Acción:** Mostrar la home en español con el chat visible.

---

### Demo chat ES (0:40–2:00)

> Al cargar la página, aparece una secuencia de arranque que indica qué runtime se está preparando: WebGPU, Chrome Built-in AI, o el modo fallback.
>
> Voy a pulsar una pregunta sugerida… [pulsa]. El sistema primero **recupera contexto** de mi CV estructurado en JSON — eso es RAG — y luego genera o sintetiza la respuesta.
>
> Fijaros en la barra superior: el punto ámbar indica el proveedor activo, el candado confirma que es local, y puedo limpiar la conversación.

**Acción:** Pregunta sugerida → esperar respuesta → señalar runtime rail.

---

### Multidioma (2:00–3:00)

> Cambio al inglés con el conmutador. No es solo traducir la UI: las rutas son `/en` y `/es`, indexables por buscadores, con metadata hreflang.
>
> Repito la pregunta… [pulsa]. El RAG busca en los mismos datos bilingües.

**Acción:** `/en` → misma pregunta → respuesta en inglés.

---

### About (3:00–4:00)

> El CV completo está en About: experiencia profesional, formación — incluido el máster BigIA — y un bloque de GitHub Stats que consulta la API pública de GitHub, cacheada en servidor, sin widgets externos.

**Acción:** Scroll `/en/about` o `/es/about`.

---

### AI Lab (4:00–5:20)

> AI Lab es la demo técnica del TFM. Aquí veo qué proveedor se usó, tiempos de retrieval y generación, y cuántos chunks se recuperaron.
>
> Importante: **no guardo el texto de las preguntas**, solo métricas agregadas en localStorage del navegador.

**Acción:** `/es/ai-lab` → señalar métricas → Clear metrics.

---

### Repo y CI (5:20–6:20)

> El código es público en GitHub. Hay documentación en el README, tests con Vitest y Playwright, y una pipeline de CI que ejecuta lint, typecheck, cobertura, build y tests end-to-end en cada push a main.

**Acción:** GitHub repo → README → Actions tab (run verde).

---

### Cierre (6:20–7:00)

> Limitaciones: en Safari o iOS sin WebGPU solo funciona el fallback extractivo; Chrome AI requiere hardware compatible.
>
> Enlaces en la descripción: la web en andonivianez.info, el repositorio, y las slides. Gracias por ver el proyecto.

**Acción:** Volver a home o pantalla de cierre con URLs.

---

## Descripción sugerida para YouTube

```text
TFM — Portfolio inteligente con IA local en el navegador
Máster BigIA · Universidad Isabel I · 2026
Andoni Vianez Ulloa

🌐 https://www.andonivianez.info
📦 https://github.com/andonivianez/andonivianez-info-ai
📊 Slides: https://github.com/andonivianez/andonivianez-info-ai/blob/main/docs/TFM_Portfolio_IA_Local_Andoni_Vianez.pptx

Portfolio chat-first con RAG, Chrome Built-in AI, WebLLM y fallback extractivo.
0 APIs de pago. Privacidad por diseño.
```

---

## Después de publicar

1. Copiar URL del vídeo
2. Sustituir `TODO` del vídeo en [README.md](../README.md) → tabla “Entrega TFM”
3. Sustituir `TODO` del vídeo en [docs/TFM.md](TFM.md) → sección 14
4. Rellenar formulario de entrega del campus (fecha límite: **20/07/2026**)
