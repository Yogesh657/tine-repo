"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { getAllProjectTitlesByCategory, getCategoryBySlug } from "@/lib/projects"

export default function ProjectPage() {
    const router = useRouter()

    const params = useParams()
    const category = params.category as string

    const categoryData = getCategoryBySlug(category)
    if(!categoryData){
        router.replace("/");
    }

    useEffect(()=>{
        (async () => {
            const data = await getAllProjectTitlesByCategory(category)

            console.log("data", data)
            if(data.length > 0){
                router.replace(`/${category}/projects/${data[0].id}`)
            }

        })()
    })   
}