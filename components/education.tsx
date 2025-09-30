import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"

const education = [
  {
    degree: "Grado en Ingeniería Informática",
    institution: "Universidad de Burgos (UBU)",
    period: "2017-2023",
    type: "Grado Universitario",
  },
  {
    degree: "Técnico Superior en Administración y Gestión de Sistemas Informáticos en Red [LOE]",
    institution: "AEG Ikastetxea",
    period: "2018-2020",
    type: "Formación Profesional",
  },
  {
    degree: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma",
    institution: "AEG Ikastetxea",
    period: "2014-2016",
    type: "Formación Profesional",
  },
  {
    degree: "Técnico Superior en Administración y Finanzas",
    institution: "AEG Ikastetxea",
    period: "2013-2014",
    type: "Formación Profesional",
  },
  {
    degree: "Técnico Superior en Desarrollo de Aplicaciones Web",
    institution: "AEG Ikastetxea",
    period: "2011-2013",
    type: "Formación Profesional",
  },
  {
    degree: "Técnico Superior en Administración y Gestión de Sistemas Informáticos [LOGSE]",
    institution: "AEG Ikastetxea",
    period: "2009-2011",
    type: "Formación Profesional",
  },
]

const additionalEducation = [
  {
    title: "Título de música nivel 2",
    description: "Instrumentos: Txistu y percusión",
    type: "Música",
  },
  {
    title: "Educación Secundaria y Bachillerato",
    description: "I.E.S. Bidebieta",
    type: "Educación Básica",
  },
]

export function Education() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">Formación Académica</h2>

        <div className="space-y-6 mb-12">
          {education.map((edu, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-balance">{edu.degree}</h3>
                        <p className="text-blue-600 font-medium">{edu.institution}</p>
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mt-2">
                          {edu.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">{edu.period}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">Formación Adicional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {additionalEducation.map((item, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-blue-700">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full mt-2">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
