import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { projects, type Project } from './content'

type Props = { project: Project | undefined; onClose: () => void; onSelect: (id: string) => void }

export default function ProjectReader({ project, onClose, onSelect }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const scrollArea = useRef<HTMLDivElement>(null)
  const isOpen = Boolean(project)
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (!isOpen) { element.close(); return }
    element.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { element.close(); document.body.style.overflow = overflow }
  }, [isOpen])
  useEffect(() => { scrollArea.current?.scrollTo({ top: 0, behavior: 'instant' }) }, [project?.id])
  const index = projects.findIndex(item => item.id === project?.id)

  return <dialog ref={dialog} className="project-reader" aria-labelledby="reader-title" onCancel={event => { event.preventDefault(); onClose() }} onKeyDown={event => {
    if (event.key !== 'Tab') return
    const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')]
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    {project && <div className="reader-sheet">
      <header className="reader-toolbar"><span className="small-label">Work record / {String(index + 1).padStart(2, '0')}</span><div><button aria-label="Previous project" disabled={index === 0} onClick={() => onSelect(projects[index - 1].id)}><ArrowLeft size={18} /></button><button aria-label="Next project" disabled={index === projects.length - 1} onClick={() => onSelect(projects[index + 1].id)}><ArrowRight size={18} /></button><button autoFocus className="reader-close" onClick={onClose} aria-label="Close project"><span>Close</span><X size={18} /></button></div></header>
      <div className="reader-scroll" ref={scrollArea}>
        <div className="reader-heading"><p className="small-label">{project.company} / {project.format}</p><h2 id="reader-title">{project.title}</h2><p>{project.focus}</p></div>
        <figure className={`project-visual ${project.theme}`}><div className="project-screens">{project.images.map((src, i) => <a key={src} href={src} target="_blank" rel="noreferrer" aria-label={`Enlarge ${project.title} screenshot ${i + 1}`}><img src={src} alt={project.imageAlt[i]} /></a>)}</div><figcaption>{project.imageCredit}<span>Open an image to enlarge</span></figcaption></figure>
        <div className="reader-content">
          <aside className="reader-facts"><div><span className="small-label">Company</span><p>{project.company}</p></div><div><span className="small-label">Employment dates</span><p>{project.period}</p></div><div><span className="small-label">Project scope</span><ul>{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul></div></aside>
          <div className="reader-story"><p className="reader-description">{project.description}</p><h3>{project.workHeading}</h3><div className="work-copy">{project.work.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>{project.productDetail && <section className="project-detail" aria-label="Product details"><h3>{project.productDetail.heading}</h3><p>{project.productDetail.body}</p></section>}{project.contextNote && <p className="context-note">{project.contextNote}</p>}<div className="project-timeline-note"><h3>Project timeline</h3><p>{project.chronology}</p></div><div className="project-links"><a href={project.url} target="_blank" rel="noreferrer">{project.linkLabel}</a><a href={project.source} target="_blank" rel="noreferrer">{project.sourceLabel}</a></div></div>
        </div><p className="reader-footnote">Images come from public product pages and may show later versions.</p>
        <div className="reader-bottom">{index < projects.length - 1 ? <button onClick={() => onSelect(projects[index + 1].id)}><span className="small-label">Next record</span><span>{projects[index + 1].title}<ArrowRight size={22} /></span></button> : <button onClick={onClose}><span className="small-label">End of the collection</span><span>Back to the work<ArrowLeft size={22} /></span></button>}</div>
      </div>
    </div>}
  </dialog>
}
