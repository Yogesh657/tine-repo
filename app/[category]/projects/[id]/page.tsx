"use client"

import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar"
import ContentArea from "@/components/content-area"
import { getCategoryBySlug, getProjectById } from "@/lib/projects"

export default function ProjectPage() {
  const router = useRouter()
  const params = useParams()
  const category = params.category as string
  const projectId = params.id as string

  const categoryData = getCategoryBySlug(category)
  const currentProject = categoryData ? getProjectById(category, projectId) : null
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (!categoryData || !currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Project not found</p>
      </div>
    )
  }

  const handleProjectClick = (id: string) => {
    router.push(`/${category}/projects/${id}`)
  }

  const handleClose = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-white text-foreground flex">
      <Sidebar
        projects={categoryData.projects}
        selectedProjectId={projectId}
        onProjectClick={handleProjectClick}
        category={category}
      />
      <ContentArea project={currentProject} />
    </div>
  )
}
