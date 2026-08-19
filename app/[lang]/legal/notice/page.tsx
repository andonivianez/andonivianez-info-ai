import type { Metadata } from "next"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
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
  return buildPageMetadata(locale, "legalNotice", "/legal/notice")
}

function NoticeContent({ locale }: { locale: AppLocale }) {
  const legal = getLegalInfo()
  const isEs = locale === "es"

  if (isEs) {
    return (
      <>
        <section>
          <h2 className="mb-3 text-lg font-semibold">1. Datos identificativos</h2>
          <p>
            Titular del sitio web: <strong>{legal.name}</strong>
            <br />
            NIF: {legal.nif}
            <br />
            Domicilio: {legal.address}
            <br />
            Email de contacto:{" "}
            <a href={`mailto:${legal.email}`} className="underline">
              {legal.email}
            </a>
            <br />
            Actividad: {legal.activity}
            <br />
            Sitio web:{" "}
            <a href={legal.website} className="underline">
              {legal.website}
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">2. Objeto</h2>
          <p>
            El presente aviso legal regula el acceso y uso del sitio web {legal.website}, que tiene
            como finalidad presentar el portfolio profesional de {legal.name}, incluyendo un
            asistente conversacional con IA ejecutada localmente en el navegador del visitante.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">3. Condiciones de uso</h2>
          <p>
            El acceso al sitio implica la aceptación de este aviso legal. El usuario se compromete a
            hacer un uso lícito del sitio, sin introducir contenido ilícito, ofensivo o que pueda
            dañar los sistemas del titular o de terceros. Queda prohibida la reproducción total o
            parcial de los contenidos sin autorización expresa.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">4. Propiedad intelectual</h2>
          <p>
            Los contenidos del sitio (textos, código, diseño, imágenes y demás elementos) son
            propiedad de {legal.name} o se utilizan con la correspondiente licencia. El código
            fuente del portfolio está disponible en GitHub bajo licencia open source, salvo
            indicación contraria.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">5. Responsabilidad</h2>
          <p>
            {legal.name} no se hace responsable de los daños derivados del uso del sitio, de
            interrupciones del servicio, errores en los contenidos generados por el asistente IA, o
            de enlaces a sitios de terceros. Las respuestas del asistente se basan exclusivamente en
            la información del portfolio y pueden contener imprecisiones.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">6. Legislación aplicable</h2>
          <p>
            Este aviso legal se rige por la legislación española. Para cualquier controversia, las
            partes se someten a los juzgados y tribunales del domicilio del titular, salvo derecho
            imperativo del consumidor.
          </p>
        </section>
      </>
    )
  }

  return (
    <>
      <section>
        <h2 className="mb-3 text-lg font-semibold">1. Identifying information</h2>
        <p>
          Website owner: <strong>{legal.name}</strong>
          <br />
          Tax ID: {legal.nif}
          <br />
          Address: {legal.address}
          <br />
          Contact email:{" "}
          <a href={`mailto:${legal.email}`} className="underline">
            {legal.email}
          </a>
          <br />
          Activity: {legal.activity}
          <br />
          Website:{" "}
          <a href={legal.website} className="underline">
            {legal.website}
          </a>
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">2. Purpose</h2>
        <p>
          This legal notice governs access to and use of {legal.website}, which presents the
          professional portfolio of {legal.name}, including a conversational assistant with AI
          running locally in the visitor&apos;s browser.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">3. Terms of use</h2>
        <p>
          Accessing the site implies acceptance of this legal notice. Users agree to use the site
          lawfully, without introducing unlawful, offensive or harmful content. Reproduction of
          content without express authorization is prohibited.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">4. Intellectual property</h2>
        <p>
          Site contents (text, code, design, images and other elements) belong to {legal.name} or
          are used under the corresponding license. Portfolio source code is available on GitHub
          under an open source license, unless otherwise stated.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">5. Liability</h2>
        <p>
          {legal.name} is not liable for damages arising from use of the site, service
          interruptions, inaccuracies in AI assistant responses, or links to third-party sites. AI
          responses are based solely on portfolio information and may contain inaccuracies.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">6. Applicable law</h2>
        <p>
          This legal notice is governed by Spanish law. Any dispute shall be submitted to the courts
          of the owner&apos;s domicile, subject to mandatory consumer rights.
        </p>
      </section>
    </>
  )
}

export default async function LegalNoticePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = resolveLocale(lang) as AppLocale

  return (
    <LegalPageLayout locale={locale} title={locale === "es" ? "Aviso legal" : "Legal notice"}>
      <NoticeContent locale={locale} />
    </LegalPageLayout>
  )
}
