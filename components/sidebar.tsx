"use client"

import { useState } from "react"
import Link from "next/link"
import { Projects } from "@/app/[category]/projects/[id]/page"

interface SidebarProps {
  projects: Projects[]
  selectedProjectId: string | null
  onProjectClick: (id: string) => void
  category: string
}

export default function Sidebar({
  projects,
  selectedProjectId,
  onProjectClick,
  category,
}: SidebarProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <aside className="w-1/2 bg-white border-r border-gray-200 p-8 pb-0 flex flex-col justify-between min-h-screen">
      <div>
        <div className="mb-20">
          <Link
            href="/"
            className="text-xl font-light tracking-widest text-gray-400 hover:text-gray-600 transition"
          >
            CT PROJECTS PORTAL
          </Link>
        </div>

        <nav className="space-y-12">
          {projects.map((project) => {
            const isHovered = hoveredProject === project.id
            const isSelected = selectedProjectId === project.id

            return (
              <Link
                key={project.id}
                href={`/${category}/projects/${project.id}`}
                className="block cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onFocus={() => setHoveredProject(project.id)}
                onBlur={() => setHoveredProject(null)}
                aria-current={isSelected ? "page" : undefined}
              >
                <div
                  onClick={() => onProjectClick(project.id)}
                  className="flex items-center gap-3"
                >
                  {/* Fixed-size icon container so the title never shifts */}
                  <div
                    className="flex-shrink-0 relative"
                    style={{ width: 34, height: 12 }}
                    aria-hidden
                  >
                    {/* SVG always present; animated via opacity + translate for smooth entrance */}
                    <svg
                      viewBox="-403 292.3 34 12"
                      xmlns="http://www.w3.org/2000/svg"
                      width="34"
                      height="12"
                      className={`absolute left-0 top-0 transform transition-opacity transition-transform duration-300 ease-out pointer-events-none ${
                        isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                      }`}
                      style={{ transformOrigin: "left center" }}
                    >
                      <polyline
                        fill="none"
                        stroke="#3C3C3C"
                        strokeMiterlimit="10"
                        points="-380.5,293.3 -371,303.3 -403,303.3"
                      />
                    </svg>
                  </div>

                  <p
                    className={`text-3xl font-light tracking-wider transition-all duration-300 ${
                      isSelected ? "text-black" : "text-gray-300 hover:text-gray-500"
                    }`}
                  >
                    {project.title}
                  </p>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
