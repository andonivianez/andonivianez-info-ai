import { describe, expect, it } from "vitest"
import {
  getCertifications,
  getEducation,
  getExperiences,
  getLanguages,
  getPortfolioData,
  getProfile,
  getProjects,
  getSoftSkills,
  localize,
} from "@/lib/portfolio"

describe("portfolio accessors", () => {
  it("returns complete portfolio data", () => {
    const data = getPortfolioData()
    expect(data.profile.name).toContain("Andoni")
    expect(data.experience.length).toBeGreaterThan(0)
    expect(data.projects.length).toBeGreaterThan(0)
    expect(data.education.some((e) => e.id === "master-bigia")).toBe(true)
  })

  it("localizes profile fields", () => {
    const es = getProfile("es")
    const en = getProfile("en")
    expect(es.bio).not.toEqual(en.bio)
    expect(es.tagline).toBeTruthy()
    expect(es.role).toBeTruthy()
  })

  it("localizes experience, projects, education and languages", () => {
    expect(getExperiences("es")[0]?.description).not.toEqual(getExperiences("en")[0]?.description)
    expect(getProjects("es")[0]?.name).toBeTruthy()
    expect(getEducation("es").some((e) => e.degree.includes("BigIA"))).toBe(true)
    expect(getLanguages("es").length).toBeGreaterThan(0)
  })

  it("localizes certifications and soft skills", () => {
    expect(getCertifications("es").length).toBeGreaterThan(0)
    expect(getSoftSkills("en")).toContain("Mentoring")
    expect(localize({ es: "hola", en: "hello" }, "en")).toBe("hello")
  })
})
