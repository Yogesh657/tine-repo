"use client"

interface Project {
  id: string
  title: string
  description: string
  image: string
  link: string
  number: string
}

interface ContentAreaProps {
  project: Project
}

export default function ContentArea({ project }: ContentAreaProps) {
  return (
    <section className="w-1/2 relative bg-gray-600 overflow-hidden" style={{maxHeight: '100vh'}}>
      {/* Background Image */}
      {/* <div className="absolute inset-0">
        <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div> */}

      {/* Top Navigation Overlay */}
      <div className="absolute top-0 right-0 left-0 p-8 flex justify-between items-start z-10">
        <div className="text-white text-4xl font-light tracking-widest">{project.number}</div>
        <div className="flex gap-8 text-white text-sm font-light">
          <button className="hover:opacity-70 transition">ABOUT</button>
          <button className="hover:opacity-70 transition">RECRUIT</button>
          <button className="hover:opacity-70 transition">ONLINE STORE</button>
        </div>
      </div>

      {/* Content Card */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20">
        <div className="max-w-2xl">
          <p className="text-white text-sm leading-relaxed font-light mb-6">{project.description}</p>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white text-sm font-light hover:opacity-70 transition"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 8 16 12 12 16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            {project.link}
          </a>
        </div>
      </div>
    </section>
  )
}
