# andonivianez-info-ai

Portfolio profesional inteligente con **IA generativa ejecutada localmente en el navegador**, desarrollado como Trabajo de Fin de Máster (TFM).

## Contribuir

Flujo Gitflow, commits convencionales y checklist de PR: ver [CONTRIBUTING.md](CONTRIBUTING.md).

## Características

- **IA 100% local**: Chrome Built-in AI, WebLLM/WebGPU o fallback extractivo
- **RAG local**: retrieval ponderado sobre datos estructurados del portfolio
- **Privacidad**: sin APIs de pago (OpenAI, Anthropic, etc.)
- **Métricas experimentales**: página `/ai-lab` para análisis del TFM
- **Bilingüe**: español e inglés
- **Tests**: unitarios (Vitest), componente (Testing Library), e2e (Playwright)

## Stack

- Next.js 16 · React 19 · TypeScript 5.9
- Tailwind CSS 4 · shadcn/ui · ESLint 9
- @mlc-ai/web-llm · Chrome Prompt API
- Vitest · Playwright · ESLint 10 · Prettier

## Instalación

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando              | Descripción             |
| -------------------- | ----------------------- |
| `pnpm dev`           | Servidor de desarrollo  |
| `pnpm build`         | Build de producción     |
| `pnpm lint`          | ESLint                  |
| `pnpm typecheck`     | Verificación TypeScript |
| `pnpm test`          | Tests unitarios         |
| `pnpm test:coverage` | Cobertura               |
| `pnpm e2e`           | Tests end-to-end        |
| `pnpm knip`          | Detectar código muerto  |

## Estructura

```text
app/              # App Router (/, /ai-lab)
components/       # UI del portfolio y chat IA
data/             # Base de conocimiento JSON bilingüe
hooks/            # use-ai-runtime, use-ai-assistant
lib/
  ai/             # Providers, manager, prompts
  rag/            # Chunker, retriever, context builder
  metrics/        # Métricas locales
  portfolio/      # Tipos y selectores de datos
docs/             # Documentación del TFM
e2e/              # Tests Playwright
```

## Arquitectura de IA

```text
AIProviderManager
├── ChromeAIProvider    (Gemini Nano via Prompt API)
├── WebLLMProvider      (WebGPU + Web Worker)
└── FallbackProvider    (búsqueda extractiva)
```

Prioridad automática: Chrome AI → WebLLM → Fallback.

## Documentación TFM

Ver [docs/TFM.md](docs/TFM.md) para arquitectura detallada, limitaciones y resultados experimentales.

## Licencia

MIT — ver [LICENSE](LICENSE).

## Autor

**Andoni Vianez Ulloa**

- [LinkedIn](https://www.linkedin.com/in/andoni-vianez/)
- [GitHub](https://github.com/andonivianez)
- [Malt](https://www.malt.es/profile/andonivianez)
