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
              Ingeniero informático con más de 14 años de experiencia en desarrollo full stack y administración de
              sistemas. Especializado en React, Angular, Node.js, React Native y tecnologías cloud. Experiencia como
              freelance desde 2015 y en empresas como BQ, Fundación Onkologikoa y actualmente Orbis Tecnología
              Eléctrica. Experto en desarrollo de aplicaciones web, móviles y software embebido con C++ para ESP32.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-600 mb-2">14+</div>
              <p className="text-muted-foreground text-sm">Años de experiencia</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Code className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-muted-foreground text-sm">Proyectos entregados</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-600 mb-2">8+</div>
              <p className="text-muted-foreground text-sm">Empresas trabajadas</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Lightbulb className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <p className="text-muted-foreground text-sm">Tecnologías dominadas</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
