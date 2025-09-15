import { Button } from "@/components/ui/button"
import { ArrowDown, Linkedin, Mail, Download, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl border-4 border-blue-200">
            <Image
              src="/images/andoni-profile.png"
              alt="Andoni Vianez"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
            Andoni Vianez Ulloa
          </h1>
          <p className="text-2xl sm:text-3xl text-blue-600 font-semibold mb-6 text-balance">Full Stack Developer</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty leading-relaxed">
            Ingeniero informático con más de 10 años de experiencia en desarrollo full stack. Especializado en React,
            Node.js, React Native y tecnologías modernas. Actualmente trabajando en Orbis Tecnología Eléctrica
            desarrollando soluciones web y móviles innovadoras.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" />
              <a href="mailto:andoni.bartolo@gmail.com" className="hover:text-blue-600 transition-colors">
                andoni.bartolo@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-600" />
              <a href="tel:+34[REDACTED]" className="hover:text-blue-600 transition-colors">
                [REDACTED]
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span>Astigarraga, Guipúzcoa</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
            <Mail className="mr-2 h-4 w-4" />
            Contactar
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
          >
            <Download className="mr-2 h-4 w-4" />
            Descargar CV
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
            asChild
          >
            <a href="https://www.malt.es/profile/andonivianez" target="_blank" rel="noopener noreferrer">
              Contratar en Malt
            </a>
          </Button>
        </div>

        <div className="flex justify-center space-x-8 mb-12">
          <a
            href="https://www.linkedin.com/in/andoni-vianez/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-600 transition-colors transform hover:scale-110"
          >
            <Linkedin className="h-7 w-7" />
          </a>
          <a
            href="mailto:andoni.bartolo@gmail.com"
            className="text-muted-foreground hover:text-blue-600 transition-colors transform hover:scale-110"
          >
            <Mail className="h-7 w-7" />
          </a>
        </div>

        <div className="animate-bounce">
          <a href="#about">
            <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
          </a>
        </div>
      </div>
    </section>
  )
}
