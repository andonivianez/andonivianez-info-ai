# Portfolio Personal - Andoni Vianez Ulloa

Portfolio personal profesional desarrollado con Next.js 14, TypeScript y Tailwind CSS. Una aplicación web moderna y responsive que presenta el perfil profesional de Andoni Vianez Ulloa, Senior Full Stack Engineer especializado en React Native y desarrollo de IA.

## 🚀 Características

- **Diseño Responsive**: Optimizado para dispositivos móviles, tablets y desktop
- **Multilingüe**: Soporte para español e inglés con cambio dinámico de idioma
- **SEO Optimizado**: Meta tags completos y estructura semántica
- **Componentes Modernos**: UI components basados en Radix UI y Tailwind CSS
- **Animaciones Suaves**: Transiciones y efectos visuales elegantes
- **Navegación Fluida**: Scroll suave entre secciones
- **Analytics**: Integración con Vercel Analytics

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework de React con App Router
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utilitario
- **Radix UI** - Componentes de UI accesibles
- **Lucide React** - Iconografía moderna
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Prefijos CSS automáticos

## 📁 Estructura del Proyecto

```
nextjs-example/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI reutilizables
│   ├── about.tsx         # Sección "Sobre mí"
│   ├── contact.tsx       # Sección de contacto
│   ├── education.tsx     # Sección de formación
│   ├── experience.tsx    # Sección de experiencia
│   ├── header.tsx        # Navegación principal
│   ├── hero.tsx          # Sección hero/principal
│   ├── languages.tsx     # Sección de idiomas
│   ├── projects.tsx      # Sección de proyectos
│   ├── skills.tsx        # Sección de habilidades
│   └── language-provider.tsx # Contexto de idiomas
├── lib/                  # Utilidades
│   └── utils.ts          # Funciones auxiliares
├── public/               # Archivos estáticos
│   └── images/           # Imágenes del portfolio
└── styles/               # Archivos de estilos
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- pnpm (recomendado) o npm

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd nextjs-example
```

2. **Instalar dependencias**
```bash
pnpm install
# o
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
pnpm dev
# o
npm run dev
```

4. **Abrir en el navegador**
Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📝 Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia el servidor de desarrollo

# Producción
pnpm build        # Construye la aplicación para producción
pnpm start        # Inicia el servidor de producción

# Calidad de código
pnpm lint         # Ejecuta ESLint
```

## 🌐 Secciones del Portfolio

- **Hero**: Presentación principal con información de contacto
- **Sobre mí**: Resumen profesional y estadísticas
- **Experiencia**: Trayectoria laboral detallada
- **Habilidades**: Tecnologías y competencias técnicas
- **Formación**: Antecedentes académicos
- **Idiomas**: Competencias lingüísticas
- **Proyectos**: Portfolio de trabajos destacados

## 🎨 Personalización

### Cambiar Información Personal
Edita los siguientes archivos para personalizar el contenido:

- `app/page.tsx` - Metadatos y estructura principal
- `components/hero.tsx` - Información personal y contacto
- `components/about.tsx` - Descripción profesional
- `components/experience.tsx` - Experiencia laboral
- `components/skills.tsx` - Habilidades técnicas
- `components/projects.tsx` - Proyectos destacados

### Cambiar Colores y Estilos
Modifica `app/globals.css` y los archivos de componentes para personalizar la apariencia.

### Agregar Nuevos Idiomas
Extiende el objeto `translations` en `components/language-provider.tsx`.

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno si es necesario
3. Despliega automáticamente

### Otras Plataformas
La aplicación es compatible con cualquier plataforma que soporte Next.js:
- Netlify
- AWS Amplify
- Railway
- Heroku

## 📱 Responsive Design

El portfolio está optimizado para:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Configuración Avanzada

### Variables de Entorno
Crea un archivo `.env.local` para configuraciones específicas:

```env
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Optimizaciones
- Imágenes optimizadas con Next.js Image
- Lazy loading de componentes
- Bundle splitting automático
- Compresión gzip

## 📄 Licencia

Este proyecto es de uso personal y profesional. Todos los derechos reservados.

## 👨‍💻 Autor

**Andoni Vianez Ulloa**
- Email: andoni.bartolo@gmail.com
- LinkedIn: [andoni-vianez](https://www.linkedin.com/in/andoni-vianez/)
- GitHub: [andonivianez](https://github.com/andonivianez)
- Malt: [andonivianez](https://www.malt.es/profile/andonivianez)

---

Desarrollado con ❤️ usando Next.js, TypeScript y Tailwind CSS
