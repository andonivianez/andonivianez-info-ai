# Portfolio IA Local — Documentación TFM

## Objetivo

Demostrar experimentalmente que es posible construir un portfolio inteligente y privado utilizando IA generativa ejecutada localmente en navegadores modernos.

## Arquitectura

```text
Pregunta → Retriever → Context Builder → AIProvider → Respuesta
                ↑                              ↑
           data/*.json              Chrome AI / WebLLM / Fallback
```

## Proveedores de IA

| Prioridad | Proveedor                        | Requisitos                    |
| --------- | -------------------------------- | ----------------------------- |
| 1         | Chrome Built-in AI (Gemini Nano) | Chrome 148+, gesto de usuario |
| 2         | WebLLM + WebGPU                  | WebGPU, ~1-2 GB descarga      |
| 3         | Fallback extractivo              | Siempre disponible            |

## RAG local

- **chunker.ts**: fragmenta el portfolio en chunks indexables
- **retriever.ts**: búsqueda ponderada con sinónimos ES/EN
- **context-builder.ts**: presupuesto de contexto (~2000 chars) y umbral de confianza

## Métricas

Registradas en `localStorage` (sin contenido de preguntas). Visualizables en `/ai-lab`.

## Privacidad

Cuando el proveedor activo es generativo y local, se muestra el aviso de IA privada. En modo fallback, se indica que no hay modelo generativo.

## Limitaciones conocidas

- Chrome AI requiere hardware compatible y descarga inicial del modelo
- WebLLM no funciona en iOS/Safari sin WebGPU
- TypeScript 5.9 (TS 7 no es compatible aún con typescript-eslint; ver issue #10940)
- Los tests de proveedores reales no se ejecutan en CI (requieren hardware)

## Comandos

```bash
pnpm dev          # Desarrollo
pnpm build        # Build producción
pnpm test         # Tests unitarios
pnpm e2e          # Tests end-to-end
pnpm typecheck    # Verificación de tipos
```
