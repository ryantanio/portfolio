import { useEffect, useRef, useState } from 'react'
import { ArrowDown, BriefcaseBusiness, Check, Copy, Download, Github, GraduationCap, Mail, Menu, X } from 'lucide-react'
import { email, experience, github, projects, stack } from './content'

const sections = [
  { id: 'home', label: 'Intro' }, { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' }, { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' }, { id: 'contact', label: 'Contact' },
]

function App() {
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [copyStatus, setCopyStatus] = useState('')
  const menuButton = useRef<HTMLButtonElement>(null)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    const start = performance.now()
    let timer: ReturnType<typeof setTimeout>
    const finish = () => {
      clearTimeout(timer)
      timer = setTimeout(() => { if (!cancelled) setLoading(false) }, Math.max(0, 650 - (performance.now() - start)))
    }
    timer = setTimeout(finish, 1600)
    void document.fonts.ready.then(() => { if (!cancelled) finish() })
    return () => { cancelled = true; clearTimeout(timer) }
  }, [])

  useEffect(() => {
    let frame = 0
    let mounted = true
    const update = () => {
      const marker = window.innerHeight * .4
      let current = sections[0].id
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element && element.getBoundingClientRect().top <= marker) current = section.id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) current = 'contact'
      setActive(current)
    }
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    update()
    const initialHash = window.location.hash.slice(1)
    if (sections.some(section => section.id === initialHash)) {
      void document.fonts.ready.then(() => {
        if (mounted && window.location.hash.slice(1) === initialHash) {
          document.getElementById(initialHash)?.scrollIntoView({ behavior: 'instant' })
          update()
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { mounted = false; cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); clearTimeout(copyTimer.current) }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus() }
      if (event.key === 'Tab') {
        const lastLink = document.querySelector<HTMLAnchorElement>('#mobile-nav a:last-child')
        if (event.shiftKey && document.activeElement === menuButton.current) { event.preventDefault(); lastLink?.focus() }
        else if (!event.shiftKey && document.activeElement === lastLink) { event.preventDefault(); menuButton.current?.focus() }
      }
    }
    const media = window.matchMedia('(min-width: 769px)')
    const onResize = () => { if (media.matches) setMenuOpen(false) }
    media.addEventListener('change', onResize)
    window.addEventListener('keydown', close)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', close); media.removeEventListener('change', onResize) }
  }, [menuOpen])

  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopyStatus('Email copied') }
    catch { setCopyStatus('Couldn’t copy. Please select the email address.') }
    clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopyStatus(''), 3500)
  }

  function navigate(id: string) {
    setMenuOpen(false)
    requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }))
  }

  const darkSection = ['home', 'experience', 'contact'].includes(active)

  return <>
    {loading && <div className="loading-screen" role="status" aria-label="Loading Ryan Tan’s portfolio"><span className="loading-monogram">rt<span>.</span></span><p>RYAN TAN</p><div className="loading-track"><span /></div><span className="loading-caption">Loading portfolio</span></div>}
    <div inert={loading}>
    <a className="skip-link" href="#main">Skip to content</a>
    <nav className={`dot-nav ${darkSection ? 'on-dark' : ''}`} aria-label="Section navigation">
      <ul>{sections.map(section => <li key={section.id}>
        <a href={`#${section.id}`} aria-label={section.label} aria-current={active === section.id ? 'location' : undefined} onClick={() => navigate(section.id)}>
          <span className="dot" /><span className="dot-label">{section.label}</span>
        </a>
      </li>)}</ul>
    </nav>
    <button ref={menuButton} className={`menu-button ${darkSection || menuOpen ? 'on-dark' : ''}`} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    <nav id="mobile-nav" className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation" inert={!menuOpen}>
      <span className="mobile-name">RYAN TAN</span>
      {sections.map((section, i) => <a key={section.id} href={`#${section.id}`} onClick={() => navigate(section.id)}><span>0{i + 1}</span>{section.label}</a>)}
    </nav>

    <main id="main" inert={menuOpen}>
      <section id="home" className="hero" tabIndex={-1} aria-labelledby="hero-title">
        <header className="intro-header"><a href="#home" className="wordmark">RYAN TAN<span> / SOFTWARE ENGINEER</span></a><a href="/ryan-tan-resume.pdf" download className="header-resume">Résumé <Download size={14} /></a></header>
        <div className="hero-inner">
          <div className="hero-introduction">
          <p className="eyebrow">SINGAPORE</p>
          <h1 id="hero-title">Ryan Tan<span>.</span></h1>
          <p className="hero-role">Senior Full-Stack Engineer</p>
          <p className="hero-copy">I build and maintain web, mobile, and cloud applications.<br className="desktop-break" /> My work spans healthcare, financial services, and the public sector.</p>
          <div className="hero-links"><a href="#projects">View my work</a><a href={`mailto:${email}`}>Get in touch</a><a href={github} target="_blank" rel="noreferrer">GitHub</a></div>
          </div>
          <aside className="hero-work" aria-label="Featured project preview"><p className="eyebrow">A FEW PRODUCTS I’VE WORKED ON</p><a href="#projects" className="hero-preview"><span className="price-preview"><img src="/price-kaki-2.webp" alt="Price Kaki app preview" width="600" height="1300" /></span><span><img src="/fwd-1.png" alt="FWD Tapp app preview" width="375" height="812" /></span></a><div className="hero-work-labels"><span>Price Kaki</span><span>FWD Mobile</span></div><p className="hero-work-note">Consumer technology & insurance</p></aside>
        </div>
        <div className="hero-bottom"><span>7+ YEARS OF PROFESSIONAL EXPERIENCE</span><a href="#about" aria-label="Read about Ryan"><span>SCROLL TO EXPLORE</span><ArrowDown size={17} /></a></div>
      </section>

      <section className="section about" id="about" tabIndex={-1} aria-labelledby="about-title">
        <div className="section-inner about-layout"><div className="about-sidebar"><p className="eyebrow">ABOUT</p><h2 id="about-title">Hello, I’m Ryan.</h2><span className="section-rule" /><dl className="about-facts"><div><dt>Based in</dt><dd>Singapore</dd></div><div><dt>Experience</dt><dd>7+ years in software</dd></div><div><dt>Working across</dt><dd>Web, mobile & cloud</dd></div><div><dt>Recently at</dt><dd>Masimo · OriginallyUs · Vinova</dd></div></dl><a className="about-resume" href="/ryan-tan-resume.pdf" download>Read my résumé <Download size={14} /></a></div><div className="about-copy"><p className="lead">I’m a software engineer based in Singapore, with seven years of experience working on products from development through to production support.</p><p>I started out at Vinova while studying computer science at NUS, then returned as a full-stack developer after graduating. My work there included FWD Mobile and other financial and public-sector applications.</p><p>At OriginallyUs, I spent four years building and maintaining mobile apps, web applications, and backend services. I contributed to Price Kaki after its nationwide launch, including work around community-contributed data and AI-assisted moderation.</p><p>Most recently, I joined Masimo on contract to work on web and cloud services for connected patient monitoring. My role covered feature development, releases, and maintaining services that were already in use.</p><div className="education"><GraduationCap size={24} strokeWidth={1.4} /><div><strong>National University of Singapore</strong><span>Bachelor of Computing (Honours), Computer Science</span><span>2015 – 2019</span></div></div></div></div>
      </section>

      <section className="experience" id="experience" tabIndex={-1} aria-labelledby="experience-title">
        <div className="mountain-background" aria-hidden="true" />
        <div className="experience-inner"><div className="center-heading"><p className="eyebrow">CAREER</p><h2 id="experience-title">Experience</h2><span className="section-rule" /><p>Seven years across product teams and client projects,<br className="desktop-break" /> from my first development role to senior full-stack engineering.</p></div>
          <ol className="timeline">{experience.map((job, i) => <li className="timeline-entry" key={`${job.company}-${job.role}`}>
            <article className="timeline-card"><p className="timeline-company">{job.company}{job.type && <span> · {job.type}</span>}</p><h3>{job.role}</h3><p className="timeline-location">{job.location}</p><p className="timeline-summary">{job.summary}</p><ul>{job.contributions.map(item => <li key={item}>{item}</li>)}</ul></article>
            <span className="timeline-node" aria-hidden="true">{i === experience.length - 1 ? <GraduationCap size={20} strokeWidth={1.5} /> : <BriefcaseBusiness size={19} strokeWidth={1.5} />}</span>
            <p className="timeline-date">{job.date}</p>
          </li>)}</ol>
          <a href="/ryan-tan-resume.pdf" download className="outline-button">Download my résumé <Download size={15} /></a>
          <p className="photo-credit">Austrian Alps · <a href="https://unsplash.com/photos/grayscale-photography-of-mountain-HJLlOcoFJcw" target="_blank" rel="noreferrer">Photograph by Dennis Maliepaard</a></p>
        </div>
      </section>

      <section className="section projects" id="projects" tabIndex={-1} aria-labelledby="projects-title">
        <div className="section-inner"><div className="projects-heading"><div><p className="eyebrow">PROJECTS</p><h2 id="projects-title">Selected work</h2><span className="section-rule" /></div><p>A closer look at the applications and services I’ve worked on, and my part in delivering them.</p></div>
          <div className="project-list">{projects.map((project, i) => <article className="project" key={project.title}>
            <figure className={`project-visual ${project.theme}`}><div className="project-screens">{project.images.map((src, index) => <a key={src} href={src} target="_blank" rel="noreferrer" aria-label={`Enlarge ${project.title} screenshot ${index + 1}`}><img src={src} alt={project.imageAlt[index]} loading="lazy" width={project.theme.startsWith('web') ? 1440 : project.theme === 'fwd' ? 375 : 600} height={project.theme.startsWith('web') ? 960 : project.theme === 'fwd' ? 812 : 1300} /></a>)}</div><figcaption>{project.imageCredit}</figcaption></figure>
            <div className="project-copy"><div className="project-meta"><span>0{i + 1} / {project.company}</span><span>{project.period}</span></div><h3>{project.title}</h3><p className="project-category">{project.format}</p><p>{project.description}</p><h4>My contribution</h4><ul>{project.contributions.map(item => <li key={item}>{item}</li>)}</ul><p className="project-tech">{project.technologies.join(' / ')}</p><div className="project-links"><a className="project-primary-link" href={project.url} target="_blank" rel="noreferrer">{project.linkLabel}</a><a href={project.source} target="_blank" rel="noreferrer">{project.sourceLabel}</a></div></div>
          </article>)}</div>
        </div>
      </section>

      <section className="section skills" id="skills" tabIndex={-1} aria-labelledby="skills-title"><div className="section-inner"><p className="eyebrow">TECHNICAL BACKGROUND</p><h2 id="skills-title">Tools & technologies</h2><span className="section-rule" /><div className="stack-grid">{stack.map(group => <div key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></div></section>

      <section className="contact" id="contact" tabIndex={-1} aria-labelledby="contact-title"><div className="section-inner"><div className="contact-layout"><div className="contact-intro"><p className="eyebrow">LET’S CONNECT</p><h2 id="contact-title">Start a conversation.</h2><span className="section-rule" /><p className="contact-copy">Have a role or a project in mind?<br />Send me a little about what you’re working on<br className="desktop-break" /> and where you need an engineer.</p><p className="contact-location">Based in Singapore · UTC+8</p></div><div className="contact-panel"><p className="contact-panel-label">EMAIL</p><a href={`mailto:${email}`} className="email-link">{email}</a><p className="contact-helper">The best way to reach me.</p><div className="contact-actions"><a href={`mailto:${email}?subject=Let%27s%20connect`} className="email-button"><Mail size={17} />Email Ryan</a><button onClick={copyEmail} className="copy-button" aria-label="Copy email address">{copyStatus === 'Email copied' ? <Check size={16} /> : <Copy size={16} />}{copyStatus === 'Email copied' ? 'Copied' : 'Copy email'}</button></div><p className="contact-action-note">Opens your email app. Or copy the address to use it elsewhere.</p><p className="copy-status" role="status">{copyStatus}</p><div className="contact-links"><a href={github} target="_blank" rel="noreferrer"><Github size={17} />Find me on GitHub</a><a href="/ryan-tan-resume.pdf" download><Download size={17} />Download résumé</a></div></div></div><footer><span>© {new Date().getFullYear()} Ryan Tan</span><span>Singapore</span><a href="#home">Back to top</a></footer></div></section>
    </main>
    </div>
  </>
}

export default App
