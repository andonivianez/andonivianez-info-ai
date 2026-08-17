import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Education } from "@/components/education"
import { Languages } from "@/components/languages"
import { Projects } from "@/components/projects"
import { AssistantSection } from "@/components/ai/assistant-section"

export const metadata = {
  title: "Andoni Vianez Ulloa - Senior Full Stack Engineer | React Native & AI Specialist",
  description:
    "Senior Full Stack Engineer with 14+ years of experience in React, React Native, Node.js, and AI development. Available for freelance projects through Malt.",
  keywords:
    "Full Stack Developer, React Native, AI Development, Freelance, Senior Engineer, JavaScript, TypeScript, Node.js",
  authors: [{ name: "Andoni Vianez Ulloa" }],
  creator: "Andoni Vianez Ulloa",
  openGraph: {
    title: "Andoni Vianez Ulloa - Senior Full Stack Engineer",
    description: "Senior Full Stack Engineer specializing in React Native and AI development",
    url: "https://andonivianez.info",
    siteName: "Andoni Vianez Portfolio",
    images: [
      {
        url: "/images/andoni-profile.png",
        width: 400,
        height: 400,
        alt: "Andoni Vianez Profile Picture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andoni Vianez Ulloa - Senior Full Stack Engineer",
    description: "Senior Full Stack Engineer specializing in React Native and AI development",
    images: ["/images/andoni-profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Languages />
      <Projects />
      <AssistantSection />
    </main>
  )
}
