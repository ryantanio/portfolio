import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, Check, Copy, Download, Github, Mail, Menu, X } from 'lucide-react'
import { email, experience, github, projects, selectedProjectIds, stack } from './content'
import ProjectReader from './ProjectReader'

const sections = [
  { id: 'home', label: 'Work' }, { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' }, { id: 'contact', label: 'Contact' },
]
type Filter = 'Selected' | 'All' | 'Web' | 'Mobile' | 'Services'
const readProjectHash = () => projects.find(project => window.location.hash === `#work-${project.id}`)?.id ?? null

function App() {
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('home')
  const [filter, setFilter] = useState<Filter>(() => {
    const id = readProjectHash()
    return id && !selectedProjectIds.includes(id) ? 'All' : 'Selected'
  })
  const [selectedId, setSelectedId] = useState<string | null>(readProjectHash)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  const menuButton = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const returnHash = useRef('#home')
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    const start = performance.now()
    let timer: ReturnType<typeof setTimeout>
    const finish = () => {
      clearTimeout(timer)
      timer = setTimeout(() => { if (!cancelled) setLoading(false) }, Math.max(0, 450 - (performance.now() - start)))
    }
    timer = setTimeout(finish, 1600)
    void document.fonts.ready.then(() => { if (!cancelled) finish() })
    return () => { cancelled = true; clearTimeout(timer); clearTimeout(copyTimer.current) }
  }, [])

  useEffect(() => {
    let frame = 0
    const update = () => {
      let current = 'home'
      for (const section of sections) {
        if ((document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= window.innerHeight * .35) current = section.id
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5) current = 'contact'
      setActive(current)
    }
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    const restore = () => {
      const projectId = readProjectHash()
      setSelectedId(projectId)
    }
    restore()
    update()
    window.addEventListener('hashchange', restore)
    window.addEventListener('popstate', restore)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', restore)
      window.removeEventListener('popstate', restore)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus() }
      if (event.key === 'Tab') {
        const last = document.querySelector<HTMLAnchorElement>('#mobile-nav a:last-child')
        if (event.shiftKey && document.activeElement === menuButton.current) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); menuButton.current?.focus() }
      }
    }
    const media = window.matchMedia('(min-width: 901px)')
    const onResize = () => { if (media.matches) setMenuOpen(false) }
    media.addEventListener('change', onResize)
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey); media.removeEventListener('change', onResize) }
  }, [menuOpen])

  function openProject(id: string) {
    if (!selectedId) {
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      returnHash.current = window.location.hash.startsWith('#work-') ? '#home' : window.location.hash || '#home'
    }
    window.history.pushState(null, '', `#work-${id}`)
    setSelectedId(id)
  }

  function closeProject() {
    window.history.pushState(null, '', returnHash.current)
    setSelectedId(null)
    requestAnimationFrame(() => {
      const target = returnFocus.current?.isConnected ? returnFocus.current : document.getElementById('work-index-title')
      target?.focus({ preventScroll: true })
    })
  }

  function navigate(id: string) {
    setMenuOpen(false)
    requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }))
  }

  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopyStatus('Email copied') }
    catch { setCopyStatus("Couldn't copy. Please select the address above.") }
    clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopyStatus(''), 3500)
  }

  const visibleProjects = filter === 'Selected'
    ? selectedProjectIds.map(id => projects.find(project => project.id === id)!)
    : projects.filter(project => filter === 'All' || project.kind === filter)
  const project = projects.find(item => item.id === selectedId)
  const darkSection = active === 'experience'

  return <>
    {loading && <div className="loading-screen" role="status" aria-label="Loading Ryan Tan's portfolio"><span className="loading-monogram">rt.</span><p>Loading portfolio</p><div className="loading-track"><span /></div></div>}
    <div className="portfolio" inert={loading}>
      <a className="skip-link" href="#main">Skip to content</a>
      <button ref={menuButton} className={`menu-button ${menuOpen ? 'is-open' : ''}`} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav id="mobile-nav" className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation" inert={!menuOpen}>
        <p>Ryan Tan / Index</p>{sections.map((section, i) => <a key={section.id} href={`#${section.id}`} onClick={() => navigate(section.id)}><span>0{i + 1}</span>{section.label}</a>)}
      </nav>
      <aside className="identity" aria-label="Introduction" inert={menuOpen}>
        <div className="identity-top"><a href="#home" className="monogram" aria-label="Ryan Tan, home">rt<span>.</span></a><span className="small-label">Web · Mobile · Cloud<br />2019 — 2026</span></div>
        <div className="identity-copy"><p className="small-label role-label">Senior Full-Stack Engineer</p><h1>Ryan{' '}<br /><span>Tan<span className="name-period">.</span></span></h1><p className="identity-intro">I build software and take care<br className="wide-break" /> of it after launch.</p><p className="identity-description">Seven years in product engineering, most recently on healthcare web and cloud services at Masimo.</p></div>
        <div className="identity-bottom"><div className="identity-links"><a className="desktop-about-link" href="#about">A little about me <ArrowRight size={14} /></a><a className="mobile-work-link" href="#home">Browse the work <ArrowDown size={14} /></a><a href="/ryan-tan-resume.pdf" download>Résumé <Download size={14} /></a></div><div className="identity-landscape" aria-hidden="true"><img src="/alps.jpg" alt="" /><span>Room to think.</span></div><div className="identity-location"><span><i /> Based in Singapore</span><a href={`mailto:${email}`}>Say hello <Mail size={13} /></a></div></div>
      </aside>
      <nav className={`dot-nav ${darkSection ? 'on-dark' : ''}`} aria-label="Section navigation">
        <ul>{sections.map(section => <li key={section.id}><a href={`#${section.id}`} aria-label={section.label} aria-current={active === section.id ? 'location' : undefined} onClick={() => navigate(section.id)}><span className="dot" /><span className="dot-label">{section.label}</span></a></li>)}</ul>
      </nav>
      <main id="main" tabIndex={-1} inert={menuOpen}>
        <section id="home" className="work-index" tabIndex={-1} aria-labelledby="work-index-title">
          <div className="index-masthead"><span className="small-label">Portfolio / Working record</span><span className="index-edition">01—08</span></div>
          <div className="index-introduction"><div><p className="small-label">Selected projects</p><h2 id="work-index-title" tabIndex={-1}>A working<br /><em>record.</em></h2></div><p>Read about the product<br />and what I worked on.</p></div>
          <div id="projects" className="project-toolbar"><div className="project-filters" role="group" aria-label="Filter projects">{(['Selected', 'All', 'Web', 'Mobile', 'Services'] as const).map(kind => <button key={kind} aria-pressed={filter === kind} onClick={() => setFilter(kind)}>{kind}<sup>{kind === 'Selected' ? selectedProjectIds.length : kind === 'All' ? projects.length : projects.filter(item => item.kind === kind).length}</sup></button>)}</div></div>
          <div className="index-column-labels small-label"><span>Project / Company</span><span>Discipline</span></div>
          <div className="project-index-list">{visibleProjects.map(item => <a className={`project-row ${item.theme}`} key={item.id} href={`#work-${item.id}`} onClick={event => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); openProject(item.id) }} aria-label={`Open ${item.title}`}>
            <span className="record-number">{String(projects.indexOf(item) + 1).padStart(2, '0')}</span>
            <div className="record-title"><h3>{item.title}</h3><p>{item.company}<span> / </span>{item.period}</p></div>
            <div className="record-thumbnail"><img src={item.images[0]} alt="" loading="eager" /></div>
            <span className="record-discipline">{item.id === 'masimo' ? 'Web & cloud' : item.kind}<span>View record</span></span><ArrowRight className="record-arrow" size={19} aria-hidden="true" />
          </a>)}</div>
          <div className="index-footer"><p><span className="index-count" aria-live="polite">{visibleProjects.length} of {projects.length} records</span>Dates show my time at each company.</p><a href="#experience">See my experience <ArrowDown size={15} /></a></div>
        </section>

        <section id="experience" className="experience" tabIndex={-1} aria-labelledby="experience-title">
          <div className="mountain-background" aria-hidden="true" />
          <div className="section-content"><div className="section-label"><span>02 / Experience</span><span>2018 — 2026</span></div><h2 id="experience-title">Where I’ve<br /><em>worked.</em></h2><p className="section-intro">I started at Vinova as a student intern and returned after graduating from NUS.</p>
            <ol className="timeline">{experience.map((job, i) => <li className="timeline-entry" key={job.company + job.role}><div className="timeline-marker" aria-hidden="true">{String(experience.length - i).padStart(2, '0')}</div><article className="timeline-card"><p className="timeline-date">{job.date}</p><div className="timeline-heading"><h3>{job.company}</h3>{job.type && <span>{job.type}</span>}</div><p className="timeline-role">{job.role}</p><p className="timeline-summary">{job.summary}</p><ul>{job.contributions.map(item => <li key={item}>{item}</li>)}</ul><span className="timeline-location">{job.location}</span></article></li>)}</ol>
            <a className="text-link light" href="/ryan-tan-resume.pdf" download>Download my résumé <Download size={16} /></a><p className="photo-credit">Austrian Alps / <a href="https://unsplash.com/photos/grayscale-photography-of-mountain-HJLlOcoFJcw" target="_blank" rel="noreferrer">Dennis Maliepaard</a></p>
          </div>
        </section>

        <section id="about" className="about" tabIndex={-1} aria-labelledby="about-title"><div className="section-content">
          <div className="section-label"><span>03 / About</span><span>Singapore</span></div>
          <h2 id="about-title">A little<br /><em>background.</em></h2>
          <div className="about-copy"><p>I like understanding enough of a system to follow a problem wherever it leads.</p><p>That might mean starting with a React screen and ending up in an API or a database query. Full-stack work suits me because I enjoy making those connections.</p><p>Most of my career has been with teams building software for clients in healthcare, finance, and the public sector. I've learned a lot from working with product managers, designers, and QA, especially when an existing product needs to change while people are still using it.</p></div>
          <div className="education"><span className="small-label">Education<br />2015 — 2019</span><div><h3>National University of Singapore</h3><p>Bachelor of Computing (Honours)<br />Computer Science</p></div></div>
          <div id="skills" className="skills"><div className="skills-heading"><h3>What I work with</h3><p>My recent work has centered on TypeScript, React, Node.js, Python, and AWS. Other tools I've used:</p></div>{stack.map(group => <details className="stack-group" key={group.title}><summary>{group.title}<span aria-hidden="true">+</span></summary><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></details>)}</div>
        </div></section>

        <section id="contact" className="contact" tabIndex={-1} aria-labelledby="contact-title"><div className="section-content">
          <div className="section-label"><span>04 / Contact</span><span>Singapore / UTC+8</span></div><p className="contact-prelude">For roles, projects, or a quick introduction</p><h2 id="contact-title">Let’s<br /><em>talk.</em></h2><p className="contact-copy">Send me a note about your team or what you're building.<br className="wide-break" /> I'll be glad to hear from you.</p>
          <div className="contact-panel"><a href={`mailto:${email}`} className="email-link">{email}</a><div className="contact-actions"><a href={`mailto:${email}?subject=Let%27s%20connect`} className="email-button"><Mail size={16} />Email Ryan</a><button onClick={copyEmail} className="copy-button" aria-label="Copy email address">{copyStatus === 'Email copied' ? <Check size={16} /> : <Copy size={16} />}{copyStatus === 'Email copied' ? 'Copied' : 'Copy address'}</button></div><p className="copy-status" role="status">{copyStatus}</p></div>
          <div className="contact-links"><a href={github} target="_blank" rel="noreferrer"><Github size={16} />Find me on GitHub</a><a href="/ryan-tan-resume.pdf" download><Download size={16} />Download résumé</a></div><footer><span>© {new Date().getFullYear()} Ryan Tan</span><a href="#home"><ArrowLeft size={14} /> Back to the work</a></footer>
        </div></section>
      </main>
    </div>
    {!loading && <ProjectReader project={project} onClose={closeProject} onSelect={openProject} />}
  </>
}

export default App
