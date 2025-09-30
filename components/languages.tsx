import { Badge } from "@/components/ui/badge"
import { Globe, Award } from "lucide-react"

const languages = [
  {
    language: "Castellano",
    level: "Nativo",
    description: "Lengua materna",
    proficiency: 100,
    color: "bg-blue-600",
  },
  {
    language: "Euskera",
    level: "B2",
    description: "Título B2 (2009)",
    proficiency: 85,
    color: "bg-blue-500",
  },
  {
    language: "Inglés",
    level: "B2",
    description: "PET Certificate (2011)",
    proficiency: 75,
    color: "bg-blue-400",
  },
  {
    language: "Francés",
    level: "Básico",
    description: "Nivel básico",
    proficiency: 30,
    color: "bg-blue-300",
  },
  {
    language: "Portugués",
    level: "Medio",
    description: "Nivel medio",
    proficiency: 20,
    color: "bg-blue-200",
  },
]

export function Languages() {
  return (
    <section id="languages" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">Idiomas</h2>

        <div className="space-y-4">
          {languages.map((lang, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">{lang.language}</h3>
                  <Badge className={`${lang.color} text-white`}>{lang.level}</Badge>
                </div>
                <span className="text-lg font-bold text-blue-600">{lang.proficiency}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className={`h-3 rounded-full ${lang.color} transition-all duration-700`}
                  style={{ width: `${lang.proficiency}%` }}
                ></div>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {lang.level !== "Nativo" && <Award className="h-3 w-3" />}
                <span>{lang.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
