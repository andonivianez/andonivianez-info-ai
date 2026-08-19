import type { Metadata } from "next"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { PrivacyPreferencesButton } from "@/components/legal/privacy-preferences-button"
import { getLegalInfo } from "@/lib/legal/config"
import { buildPageMetadata } from "@/lib/i18n/metadata"
import { resolveLocale } from "@/lib/i18n/routing"
import type { AppLocale } from "@/lib/i18n/config"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = resolveLocale(lang)
  return buildPageMetadata(locale, "legalCookies", "/legal/cookies")
}

function CookiesContent({ locale }: { locale: AppLocale }) {
  const legal = getLegalInfo()
  const isEs = locale === "es"

  if (isEs) {
    return (
      <>
        <section>
          <h2 className="mb-3 text-lg font-semibold">
            1. Qué tecnologías de almacenamiento usa este sitio
          </h2>
          <p>
            Este sitio utiliza cookies técnicas, almacenamiento local del navegador y analítica sin
            cookies. A continuación, el inventario completo.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">2. Cookies</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b">
                  <th className="py-2 pr-4">Nombre</th>
                  <th className="py-2 pr-4">Tipo</th>
                  <th className="py-2 pr-4">Finalidad</th>
                  <th className="py-2">Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-mono">NEXT_LOCALE</td>
                  <td className="py-2 pr-4">Técnica</td>
                  <td className="py-2 pr-4">Recordar preferencia de idioma (es/en)</td>
                  <td className="py-2">Sesión / persistente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">
            3. Almacenamiento local (localStorage / sessionStorage)
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>portfolio-ai-metrics</strong> (localStorage): métricas locales del chat (sin
              texto de preguntas). Funcional.
            </li>
            <li>
              <strong>portfolio-ai-session</strong> (sessionStorage): identificador de sesión
              anónimo para métricas locales.
            </li>
            <li>
              <strong>webllm-model</strong> (localStorage): preferencia de modelo WebLLM. Funcional.
            </li>
            <li>
              <strong>portfolio-consent</strong> (localStorage): preferencia de analítica
              (aceptada/rechazada).
            </li>
            <li>
              <strong>Caché WebLLM</strong> (IndexedDB / Cache API del navegador): modelos de IA
              descargados localmente (cientos de MB). Solo si el visitante usa WebLLM.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">4. Vídeo incrustado (YouTube)</h2>
          <p>
            La sección «Entrevistas y apariciones» en la página About muestra una miniatura local.
            El reproductor de YouTube (<code>youtube-nocookie.com</code>) solo se carga cuando
            pulsas reproducir. Hasta entonces no se contacta con servidores de Google.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b">
                  <th className="py-2 pr-4">Servicio</th>
                  <th className="py-2 pr-4">Tipo</th>
                  <th className="py-2 pr-4">Finalidad</th>
                  <th className="py-2">Activación</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 pr-4">YouTube (Google)</td>
                  <td className="py-2 pr-4">Terceros</td>
                  <td className="py-2 pr-4">Reproducir entrevista en vídeo incrustada</td>
                  <td className="py-2">Solo tras clic en reproducir</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">5. Analítica (Vercel Analytics)</h2>
          <p>
            Vercel Analytics no utiliza cookies. Registra visitas de página y eventos personalizados
            agregados (tema de pregunta del chat, proveedor IA, idioma) solo si el visitante acepta
            la analítica. Puedes rechazarla desde el aviso inicial o restablecer tu preferencia:
          </p>
          <p className="mt-3">
            <PrivacyPreferencesButton />
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">6. Cómo gestionar o eliminar</h2>
          <p>
            Puedes borrar cookies y almacenamiento local desde la configuración de tu navegador.
            Para la analítica, usa el botón de preferencias arriba o rechaza en el aviso inicial.
            Para más información sobre el tratamiento de datos, consulta la{" "}
            <a href={`/${locale}/legal/privacy`} className="underline">
              política de privacidad
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">7. Contacto</h2>
          <p>
            {legal.name} ·{" "}
            <a href={`mailto:${legal.email}`} className="underline">
              {legal.email}
            </a>
          </p>
        </section>
      </>
    )
  }

  return (
    <>
      <section>
        <h2 className="mb-3 text-lg font-semibold">1. Storage technologies used</h2>
        <p>
          This site uses technical cookies, browser local storage and cookieless analytics. Full
          inventory below.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">2. Cookies</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">NEXT_LOCALE</td>
                <td className="py-2 pr-4">Technical</td>
                <td className="py-2 pr-4">Remember language preference (es/en)</td>
                <td className="py-2">Session / persistent</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">
          3. Local storage (localStorage / sessionStorage)
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>portfolio-ai-metrics</strong> (localStorage): local chat metrics (no question
            text). Functional.
          </li>
          <li>
            <strong>portfolio-ai-session</strong> (sessionStorage): anonymous session ID for local
            metrics.
          </li>
          <li>
            <strong>webllm-model</strong> (localStorage): WebLLM model preference. Functional.
          </li>
          <li>
            <strong>portfolio-consent</strong> (localStorage): analytics preference
            (accepted/rejected).
          </li>
          <li>
            <strong>WebLLM cache</strong> (IndexedDB / browser Cache API): locally downloaded AI
            models (hundreds of MB). Only if the visitor uses WebLLM.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">4. Embedded video (YouTube)</h2>
        <p>
          The &quot;Interviews and appearances&quot; section on the About page shows a local
          thumbnail. The YouTube player (<code>youtube-nocookie.com</code>) only loads when you
          click play. Until then, no Google servers are contacted.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 pr-4">Service</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2">Activation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4">YouTube (Google)</td>
                <td className="py-2 pr-4">Third party</td>
                <td className="py-2 pr-4">Play embedded interview video</td>
                <td className="py-2">Only after clicking play</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">5. Analytics (Vercel Analytics)</h2>
        <p>
          Vercel Analytics does not use cookies. It records page visits and custom aggregated events
          (chat topic, AI provider, language) only if the visitor accepts analytics. You can reject
          from the initial notice or reset your preference:
        </p>
        <p className="mt-3">
          <PrivacyPreferencesButton />
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">6. How to manage or delete</h2>
        <p>
          You can delete cookies and local storage from your browser settings. For analytics, use
          the preferences button above or reject in the initial notice. For more on data processing,
          see the{" "}
          <a href={`/${locale}/legal/privacy`} className="underline">
            privacy policy
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">7. Contact</h2>
        <p>
          {legal.name} ·{" "}
          <a href={`mailto:${legal.email}`} className="underline">
            {legal.email}
          </a>
        </p>
      </section>
    </>
  )
}

export default async function CookiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = resolveLocale(lang) as AppLocale

  return (
    <LegalPageLayout
      locale={locale}
      title={locale === "es" ? "Política de cookies" : "Cookie policy"}
    >
      <CookiesContent locale={locale} />
    </LegalPageLayout>
  )
}
