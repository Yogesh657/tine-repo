"use client"

import { useRouter, useParams } from "next/navigation"
import { useState, useEffect, use } from "react"
import Sidebar from "@/components/sidebar"
import ContentArea from "@/components/content-area"
import { getAllProjectTitlesByCategory, getCategoryBySlug, getProjectById } from "@/lib/projects"
import { IProjectTypes } from "@/app/page"

export interface Projects {
  id: string
  title: string
  number: number
}

export default function ProjectPage() {
  const router = useRouter()
  const params = useParams()
  const category = params.category as string
  const projectId = params.id as string

  const categoryData = getCategoryBySlug(category)
  const [mounted, setMounted] = useState(false)

  const [projectList, setProjectList] = useState<Projects[]>([])
  const [currentProject, setCurrentProject] = useState<IProjectTypes>({
    number: 0,
    id: "", 
    title: "", 
    repoLink: "",
    techStack: [],
    owners: []
  });

  useEffect(() => {

    (async () => {
      const currentProjectData = categoryData ? await getProjectById(category, projectId) : null
      const data = await getAllProjectTitlesByCategory(category)

      setCurrentProject({number: 0, ...currentProjectData!})
      setProjectList(data);
    })()

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

  return (
    <div className="min-h-screen bg-white text-foreground flex">
      <Sidebar
        projects={projectList}
        selectedProjectId={projectId}
        onProjectClick={handleProjectClick}
        category={category}
      />
      <ContentArea project={currentProject} />
    </div>
  )
}
