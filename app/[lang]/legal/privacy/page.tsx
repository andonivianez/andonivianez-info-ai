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
  return buildPageMetadata(locale, "legalPrivacy", "/legal/privacy")
}

function PrivacyContent({ locale }: { locale: AppLocale }) {
  const legal = getLegalInfo()
  const isEs = locale === "es"

  if (isEs) {
    return (
      <>
        <section>
          <h2 className="mb-3 text-lg font-semibold">1. Responsable del tratamiento</h2>
          <p>
            {legal.name} · NIF {legal.nif} · {legal.address} ·{" "}
            <a href={`mailto:${legal.email}`} className="underline">
              {legal.email}
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">2. Datos que se tratan</h2>
          <p>
            <strong>Chat IA:</strong> Las preguntas del chat se procesan exclusivamente en el
            navegador del visitante. No se envían a servidores del titular ni a proveedores de IA
            externos (OpenAI, Anthropic, Google Cloud, etc.). No se almacena el texto de las
            preguntas en ningún servidor.
          </p>
          <p className="mt-3">
            <strong>Analítica anónima agregada:</strong> Si el visitante acepta la analítica, se
            registran eventos agregados sin texto literal: tema detectado del vocabulario controlado
            del portfolio, proveedor IA usado, idioma, latencia aproximada y longitud de pregunta en
            rangos. Gestionado por Vercel Analytics.
          </p>
          <p className="mt-3">
            <strong>Contacto por email:</strong> Si contactas directamente por email, trataremos tu
            dirección y el contenido del mensaje para responder a tu consulta.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">3. Finalidad y base jurídica</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Funcionamiento del sitio y del asistente IA local: interés legítimo (art. 6.1.f RGPD).
            </li>
            <li>
              Analítica agregada anónima: consentimiento del visitante (art. 6.1.a RGPD), revocable
              en cualquier momento.
            </li>
            <li>
              Respuesta a consultas por email: ejecución de medidas precontractuales (art. 6.1.b).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">
            4. Transparencia de IA (Reglamento UE de IA)
          </h2>
          <p>
            El asistente del portfolio es un sistema de IA automatizado. Informa sobre la
            experiencia profesional de {legal.name} basándose en datos estructurados del CV. No toma
            decisiones automatizadas con efectos jurídicos sobre el visitante. Si necesitas
            información verificada o contratar servicios, contacta directamente por email.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">5. Encargados y transferencias</h2>
          <p>
            <strong>Vercel Inc.</strong> (hosting y analítica): puede implicar transferencia
            internacional de datos amparada en cláusulas contractuales tipo y DPA de Vercel.{" "}
            <strong>GitHub</strong> (API pública para estadísticas de repositorio): datos agregados,
            no personales del visitante.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">6. Plazos de conservación</h2>
          <p>
            Datos locales del navegador (métricas, preferencias): hasta que el visitante los borre.
            Analítica Vercel: según política de retención de Vercel (típicamente 24 meses). Emails
            de contacto: el tiempo necesario para gestionar la consulta.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">7. Derechos</h2>
          <p>
            Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y
            portabilidad escribiendo a{" "}
            <a href={`mailto:${legal.email}`} className="underline">
              {legal.email}
            </a>
            . También puedes reclamar ante la Agencia Española de Protección de Datos (
            <a href="https://www.aepd.es" className="underline" rel="noopener noreferrer">
              www.aepd.es
            </a>
            ).
          </p>
        </section>
      </>
    )
  }

  return (
    <>
      <section>
        <h2 className="mb-3 text-lg font-semibold">1. Data controller</h2>
        <p>
          {legal.name} · Tax ID {legal.nif} · {legal.address} ·{" "}
          <a href={`mailto:${legal.email}`} className="underline">
            {legal.email}
          </a>
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">2. Data processed</h2>
        <p>
          <strong>AI chat:</strong> Questions are processed exclusively in the visitor&apos;s
          browser. They are not sent to the owner&apos;s servers or external AI providers. Question
          text is not stored on any server.
        </p>
        <p className="mt-3">
          <strong>Anonymous aggregated analytics:</strong> If the visitor accepts analytics,
          aggregated events are recorded without literal text: detected topic from controlled
          portfolio vocabulary, AI provider used, language, approximate latency and question length
          ranges. Managed by Vercel Analytics.
        </p>
        <p className="mt-3">
          <strong>Email contact:</strong> If you contact us by email, we process your address and
          message content to respond.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">3. Purpose and legal basis</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Site and local AI assistant operation: legitimate interest (GDPR Art. 6.1.f).</li>
          <li>
            Anonymous aggregated analytics: visitor consent (GDPR Art. 6.1.a), revocable anytime.
          </li>
          <li>Email inquiries: pre-contractual measures (GDPR Art. 6.1.b).</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">4. AI transparency (EU AI Act)</h2>
        <p>
          The portfolio assistant is an automated AI system. It provides information about{" "}
          {legal.name}&apos;s professional experience based on structured CV data. It does not make
          automated decisions with legal effects on visitors. For verified information or hiring,
          contact directly by email.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">5. Processors and transfers</h2>
        <p>
          <strong>Vercel Inc.</strong> (hosting and analytics): may involve international data
          transfers covered by Vercel&apos;s DPA and standard contractual clauses.{" "}
          <strong>GitHub</strong> (public API for repository stats): aggregated data, not visitor
          personal data.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">6. Retention</h2>
        <p>
          Browser-local data (metrics, preferences): until the visitor clears them. Vercel
          analytics: per Vercel retention policy (typically 24 months). Contact emails: as long as
          needed to handle the inquiry.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">7. Your rights</h2>
        <p>
          You may exercise access, rectification, erasure, objection, restriction and portability
          rights by writing to{" "}
          <a href={`mailto:${legal.email}`} className="underline">
            {legal.email}
          </a>
          . You may also lodge a complaint with the Spanish Data Protection Agency (
          <a href="https://www.aepd.es" className="underline" rel="noopener noreferrer">
            www.aepd.es
          </a>
          ).
        </p>
      </section>
    </>
  )
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = resolveLocale(lang) as AppLocale

  return (
    <LegalPageLayout
      locale={locale}
      title={locale === "es" ? "Política de privacidad" : "Privacy policy"}
    >
      <PrivacyContent locale={locale} />
    </LegalPageLayout>
  )
}
