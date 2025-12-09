"use client"

import Link from "next/link"
import { CATEGORIES } from "@/lib/projects"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col items-center justify-center p-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-light tracking-widest text-foreground mb-4">CT PROJECTS PORTAL</h1>
        <p className="text-sm text-muted-foreground tracking-wide">Select a category to explore projects</p>
      </div>

      <div className="flex gap-8">
        {Object.values(CATEGORIES).map((category) => (
          <Link
            key={category.slug}
            href={`/${category.slug}/projects`}
            className="px-12 py-6 border border-foreground text-foreground font-light tracking-widest hover:bg-foreground hover:text-background transition-all duration-300"
          >
            {category.name}
          </Link>
        ))}
      </div>

    </div>
  )
}
