import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, TrendingUp } from "lucide-react"

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Orbis Tecnología Eléctrica",
    location: "España",
    period: "Mayo 2022 - Presente",
    description:
      "Desarrollo de aplicaciones web full stack con ReactJS, Angular y Node+Express. Desarrollo de aplicaciones móviles para iOS/Android con React Native. Desarrollo de software embebido (C++) para ESP32.",
    technologies: ["React", "Angular", "Node.js", "Express", "React Native", "C++", "ESP32"],
    achievements: ["Aplicaciones web full stack", "Apps móviles multiplataforma", "Software embebido"],
  },
  {
    title: "Freelance SysAdmin & Full Stack Developer",
    company: "Trabajo Independiente",
    location: "España",
    period: "Octubre 2015 - Presente",
    description:
      "Desarrollo e implantación de sistemas Windows Server, Linux, Firewalls (PfSense), routers, Amazon AWS. Desarrollo e implantación de soluciones web con WordPress, Prestashop, PHP (Symfony6), AngularJS, ReactJS, Node+Express, Firebase. Desarrollo de soluciones multiplataforma con React Native y Electron JS.",
    technologies: ["React", "Node.js", "PHP", "Symfony", "AWS", "Linux", "WordPress", "Electron", "Firebase"],
    achievements: ["Soluciones personalizadas", "Infraestructura completa", "Apps multiplataforma"],
  },
  {
    title: "Full Stack Developer",
    company: "Fundación Onkologikoa",
    location: "España",
    period: "Noviembre 2019 - Mayo 2022",
    description:
      "Desarrollo de aplicaciones web full stack con ReactJS/TypeScript y PHP/Symfony. Despliegue de aplicaciones en servidores virtualizados Ubuntu Server (LAMP+Nginx) + Docker. Desarrollo de aplicaciones móviles con Ionic-React. CI/CD con Github Actions.",
    technologies: ["React", "TypeScript", "PHP", "Symfony", "Docker", "Ubuntu Server", "Ionic", "GitHub Actions"],
    achievements: ["Aplicaciones web escalables", "DevOps con Docker", "CI/CD implementation"],
  },
  {
    title: "Mobile Software Engineer",
    company: "BQ",
    location: "España",
    period: "Marzo 2018 - Julio 2019",
    description:
      "Desarrollo de aplicación móvil (Zetup) con React Native para Android e iOS. Desarrollo de módulos en lenguaje nativo para React Native (Java, Kotlin, Swift y Objective-C). Gestión de proyectos con Jira (metodología ágil). Integración continua con Jenkins.",
    technologies: ["React Native", "Java", "Kotlin", "Swift", "Objective-C", "Jenkins", "Firebase"],
    achievements: ["App móvil nativa", "Módulos nativos", "Metodologías ágiles"],
  },
  {
    title: "SysAdmin & R&D Developer",
    company: "TuMaker S.L.",
    location: "España",
    period: "Mayo 2017 - Marzo 2018",
    description:
      "Desarrollo de entornos frontend y backend con ReactJS, Django, Python. Despliegue y mantenimiento de servidores con Proxmox, Linux, Amazon Web Services. Desarrollo de software con C++ y Qt Creator. Desarrollo de aplicación móvil (Voladd) con React Native.",
    technologies: ["React", "Django", "Python", "C++", "Qt", "AWS", "Proxmox", "React Native"],
    achievements: ["Desarrollo full stack", "Infraestructura cloud", "Apps multiplataforma"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">Experiencia Profesional</h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-xl text-balance flex items-center gap-2">
                  {exp.title}
                  {index === 0 && <Badge className="bg-blue-100 text-blue-700">Actual</Badge>}
                </CardTitle>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
                  <span className="font-medium text-blue-600">{exp.company}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-pretty">{exp.description}</p>

                <div className="mb-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    Logros principales:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.achievements.map((achievement) => (
                      <Badge key={achievement} variant="outline" className="border-blue-200 text-blue-700">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
