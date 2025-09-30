"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github } from "lucide-react"

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">Proyectos Destacados</h2>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl text-balance flex items-center justify-center gap-2">
                <Github className="h-6 w-6" />
                Repositorios en GitHub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 text-pretty">
                Explora mi trabajo y contribuciones en GitHub, donde encontrarás proyectos de desarrollo web,
                aplicaciones móviles, software embebido y más.
              </p>
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                <Badge className="bg-emerald-100 text-emerald-700">React</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">React Native</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">Node.js</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">TypeScript</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">PHP</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">C++</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">Python</Badge>
              </div>
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => window.open("https://github.com/andoni-vianez", "_blank")}
              >
                <Github className="mr-2 h-5 w-5" />
                Ver GitHub Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
