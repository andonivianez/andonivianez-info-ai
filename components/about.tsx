import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Code, Lightbulb } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">Resumen Profesional</h2>

        <Card className="mb-8">
          <CardContent className="p-8">
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Senior Full Stack Engineer con más de 8 años de experiencia diseñando y desarrollando arquitecturas
              escalables para aplicaciones web de alto rendimiento. Especializado en liderar equipos técnicos,
              implementar mejores prácticas de desarrollo y crear soluciones innovadoras que impulsan el crecimiento
              empresarial. Experto en tecnologías modernas como React, Node.js, TypeScript y cloud computing.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Award className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-emerald-600 mb-2">8+</div>
              <p className="text-muted-foreground text-sm">Años de experiencia</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Code className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-emerald-600 mb-2">100+</div>
              <p className="text-muted-foreground text-sm">Proyectos entregados</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-emerald-600 mb-2">15+</div>
              <p className="text-muted-foreground text-sm">Desarrolladores mentorizados</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Lightbulb className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-emerald-600 mb-2">20+</div>
              <p className="text-muted-foreground text-sm">Tecnologías dominadas</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
