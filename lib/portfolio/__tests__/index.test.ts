import { describe, expect, it } from "vitest"
import {
  getCertifications,
  getEducation,
  getExperiences,
  getFaq,
  getLanguages,
  getMedia,
  getPortfolioData,
  getProfile,
  getProjects,
  getServices,
  getSoftSkills,
  localize,
} from "@/lib/portfolio"

describe("portfolio accessors", () => {
  it("returns complete portfolio data", () => {
    const data = getPortfolioData()
    expect(data.profile.name).toContain("Andoni")
    expect(data.experience.length).toBeGreaterThan(0)
    expect(data.projects.length).toBeGreaterThan(0)
    expect(data.services.length).toBeGreaterThan(0)
    expect(data.faq.length).toBeGreaterThan(30)
    expect(data.media.length).toBeGreaterThan(0)
    expect(data.education.some((e) => e.id === "master-bigia")).toBe(true)
  })

  it("localizes profile fields including availability", () => {
    const es = getProfile("es")
    const en = getProfile("en")
    expect(es.bio).not.toEqual(en.bio)
    expect(es.tagline).toBeTruthy()
    expect(es.role).toBeTruthy()
    expect(es.availability).toBeTruthy()
    expect(es.openTo?.length).toBeGreaterThan(0)
  })

  it("localizes experience, projects, education and languages", () => {
    expect(getExperiences("es")[0]?.description).not.toEqual(getExperiences("en")[0]?.description)
    expect(getProjects("es")[0]?.name).toBeTruthy()
    expect(getProjects("es")[0]?.problem).toBeTruthy()
    expect(getEducation("es").some((e) => e.degree.includes("BigIA"))).toBe(true)
    expect(getLanguages("es").length).toBeGreaterThan(0)
  })

  it("localizes services, faq and media", () => {
    expect(getServices("es")[0]?.title).toBeTruthy()
    expect(getFaq("es").some((e) => e.category === "hiring")).toBe(true)
    expect(getFaq("es").some((e) => e.category === "boundaries")).toBe(true)
    expect(getFaq("en")[0]?.question).not.toEqual(getFaq("es")[0]?.question)
    expect(getMedia("es")[0]?.title).toContain("Andoni")
  })

  it("localizes certifications and soft skills", () => {
    expect(getCertifications("es").length).toBeGreaterThan(0)
    expect(getSoftSkills("en")).toContain("Mentoring")
    expect(localize({ es: "hola", en: "hello" }, "en")).toBe("hello")
  })
})
