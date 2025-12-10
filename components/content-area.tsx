"use client"

import { IProjectTypes } from "@/app/page"
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useState } from "react";

interface ContentAreaProps {
  project: IProjectTypes
}

function formatDate(d?: string | null) {
  if (!d) return "—";
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString(undefined, { year: "numeric", month: "short" });
  } catch {
    return d;
  }
}

export default function ContentArea({ project }: ContentAreaProps) {
  const [copied, setCopied] = useState(false);
  const bgImage = project.images && project.images.length ? project.images[0] : "/placeholder.svg";

  const copyId = async () => {
    if (!project.id) return;
    try {
      await navigator.clipboard.writeText(String(project.id));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <section
      className="w-1/2 relative bg-gray-600 overflow-hidden"
      style={{ maxHeight: "100vh" }}
      aria-labelledby="project-title"
    >
      <div className="absolute top-6 left-8 z-30 flex flex-col gap-2">
        <div className="text-white/70 text-xs">Project</div>
        <h2 id="project-title" className="text-white text-3xl font-light">{project.title}</h2>
        {/* id + copy */}
        {project.id && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-white/60 text-xs select-all">ID: {project.id}</span>
            <button
              onClick={copyId}
              className="text-xs px-2 py-1 bg-white/6 rounded-full hover:bg-white/10 transition"
              aria-label="Copy project id"
            >
              {copied ? "Copied" : "Copy ID"}
            </button>
          </div>
        )}
      </div>

      {/* small chips row (techstack + dates + owners) */}
      <div className="absolute left-8 right-8 top-36 z-30 flex items-center justify-between gap-4">
        {/* tech stack chips */}
        <div className="flex flex-wrap gap-2">
          {project.techStack && project.techStack.length > 0 ? (
            project.techStack.map((t: string, i: number) => (
              <span key={i} className="text-xs px-2 py-1 bg-white/6 text-white/90 rounded-full font-medium">
                {t}
              </span>
            ))
          ) : (
            <span className="text-xs text-white/50">No tech stack listed</span>
          )}
        </div>

        {/* timeline */}
        {project.startDate && project.endDate && <div className="text-white/60 text-sm">
          {formatDate(project.startDate)} <span className="mx-2">→</span> {formatDate(project.endDate)}
        </div>}
        

        {/* owners (avatars) */}
        <div className="flex items-center gap-2">
          {project.owners && project.owners.length ? (
            project.owners.slice(0, 4).map((o: any, idx: number) => (
              <div key={idx} title={o} className="flex items-center gap-2">
                {
                  <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-xs text-white/80">
                    {o ? o[0].toUpperCase() : "U"}
                  </div>
                }
              </div>
            ))
          ) : (
            <span className="text-white/50 text-sm">No owners</span>
          )}
        </div>
      </div>

      {/* Content Card (description + footer) */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-40">
        <div className="max-w-2xl">
          {project.description && (
            <div className="text-white text-sm leading-relaxed font-light mb-6">
              <TinaMarkdown content={project.description} />
            </div>
          )}

          {/* small gallery thumbnails (if any) */}
          {project.images && project.images.length > 1 && (
            <div className="flex gap-3 mb-4">
              {project.images.slice(0, 4).map((src: string, i: number) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  className="w-20 h-12 object-cover rounded-md border border-white/10"
                />
              ))}
            </div>
          )}

          {/* footer links + meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Repo */}
              <a
                href={project.repoLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white text-sm font-light hover:opacity-80 transition"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 8 16 12 12 16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Repo
              </a>

              {/* Deploy */}
              <a
                href={project.deployLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white text-sm font-light hover:opacity-80 transition"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 8 16 12 12 16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Deploy
              </a>
            </div>

            {/* right side: small summary */}
            <div className="flex items-center gap-6">
              <div className="text-white/60 text-sm">
                Owners: {project.owners ? project.owners.length : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
