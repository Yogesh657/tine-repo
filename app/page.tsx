"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import ContentArea from "@/components/content-area"
import { CATEGORIES } from "@/lib/projects"

export const PROJECTS = [
  {
    id: "red-card-tokyo",
    title: "RED CARD TOKYO",
    description:
      "New concept denim from Tokyo, evolving with the times and culture. The theory that denim is sturdy and long wearing is out of date denim that is not constrained to stereotypes. Creation based on producer Yuji Honzawa's 3F principles (Fabric, Fit, Finish), each piece represents each artisan's craftsmanship. This is RED CARD TOKYO denim. The delicate Japanese craftsmanship is prevalent all aspects; wash, whiskers and details to create a real vintage look and feel. Not based on conventional thinking, RED CARD TOKYO represents the Japanese sensitivity to detail. The evolution of REAL DENIM.",
    image: "/images/image.png",
    link: "http://redcard.tokyo/",
    number: "01",
  },
  {
    id: "upper-hights",
    title: "upper hights",
    description:
      "Exploring the upper dimensions of denim aesthetics. A project focused on elevated craftsmanship and premium material selection. Each piece is carefully curated to represent the pinnacle of denim innovation.",
    image: "/premium-denim-fashion.jpg",
    link: "http://example.com/upper-hights",
    number: "02",
  },
  {
    id: "healthy-denim",
    title: "Healthy DENIM",
    description:
      "Sustainable denim production with focus on environmental responsibility. This collection emphasizes healthy manufacturing practices and eco-friendly materials without compromising on quality and design.",
    image: "/sustainable-denim-eco-friendly.jpg",
    link: "http://example.com/healthy-denim",
    number: "03",
  },
  {
    id: "haunt",
    title: "HAUNT",
    description:
      "A haunting collection that explores the darker aesthetics of vintage denim. Each piece carries a mysterious narrative, blending traditional craftsmanship with contemporary edge and bold design statements.",
    image: "/dark-gothic-denim-vintage.jpg",
    link: "http://example.com/haunt",
    number: "04",
  },
  {
    id: "state-of-mind",
    title: "STATE OF MIND",
    description:
      "An introspective collection that reflects emotional states through fabric and form. This project examines how denim can express psychological concepts and personal narratives through innovative design.",

    image: "/abstract-emotional-denim-art.jpg",
    link: "http://example.com/state-of-mind",
    number: "05",
  }
]

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get("project")
  const [selectedProject, setSelectedProject] = useState<string | null>(projectId)

  useEffect(() => {
    setSelectedProject(projectId)
  }, [projectId])

  const currentProject = selectedProject ? PROJECTS.find((p) => p.id === selectedProject) : null

  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col items-center justify-center p-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-light tracking-widest text-foreground mb-4">GUEST LIST</h1>
        <p className="text-sm text-muted-foreground tracking-wide">Select a category to explore projects</p>
      </div>

      <div className="flex gap-8">
        {Object.values(CATEGORIES).map((category) => (
          <Link
            key={category.slug}
            href={`/${category.slug}/projects/${category.projects[0].id}`}
            className="px-12 py-6 border border-foreground text-foreground font-light tracking-widest hover:bg-foreground hover:text-background transition-all duration-300"
          >
            {category.name}
          </Link>
        ))}
      </div>

      {currentProject && <ContentArea project={currentProject} />}
    </div>
  )
}
