import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import {
  FaArrowRight,
  FaCode,
  FaDatabase,
  FaDocker,
  FaEnvelope,
  FaGitAlt,
  FaGithub,
  FaJsSquare,
  FaLinkedinIn,
  FaNodeJs,
  FaPython,
  FaReact,
} from 'react-icons/fa'
import {
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiGit,
  SiGithub,
  SiMysql,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiScikitlearn,
  SiSupabase,
  SiTailwindcss,
} from 'react-icons/si'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  { id: 'home', label: '01 — HOME' },
  { id: 'about', label: '02 — ABOUT' },
  { id: 'work', label: '03 — WORK' },
  { id: 'skills', label: '04 — SKILLS' },
  { id: 'experience', label: '05 — EXPERIENCE' },
  { id: 'contact', label: '06 — CONTACT' },
]

const primarySkills = [
  {
    name: 'PYTHON',
    icon: FaPython,
    category: 'all',
    tag: 'AI • BACKEND • DATA',
  },
  {
    name: 'REACT',
    icon: FaReact,
    category: 'frontend',
    tag: 'FRONTEND • UI',
  },
  {
    name: 'JAVASCRIPT',
    icon: FaJsSquare,
    category: 'languages',
    tag: 'LOGIC • INTERACTIONS',
  },
  {
    name: 'FASTAPI',
    icon: SiFastapi,
    category: 'backend',
    tag: 'BACKEND • REST APIs',
  },
  {
    name: 'NODE.JS',
    icon: FaNodeJs,
    category: 'backend',
    tag: 'SERVERS • TOOLS',
  },
  {
    name: 'POSTGRESQL',
    icon: SiPostgresql,
    category: 'database',
    tag: 'DATABASE • DATA SYSTEMS',
  },
  {
    name: 'DOCKER',
    icon: FaDocker,
    category: 'tools',
    tag: 'DEVOPS • DEPLOYMENT',
  },
  {
    name: 'GIT',
    icon: FaGitAlt,
    category: 'tools',
    tag: 'VERSION CONTROL',
  },
  { name: 'GITHUB', icon: SiGithub, category: 'tools', tag: 'COLLABORATION' },
  { name: 'AI API', icon: FaCode, category: 'ai', tag: 'AI • LLM INTEGRATION' },
]

const secondarySkills = [
  { group: 'AI / ML', items: ['Scikit-learn', 'Pandas', 'NumPy', 'OpenAI APIs'] },
  { group: 'Frontend', items: ['HTML', 'CSS', 'Tailwind CSS'] },
  { group: 'Backend', items: ['Flask', 'REST APIs'] },
  { group: 'Database', items: ['MySQL', 'Firebase', 'Supabase'] },
  { group: 'Languages', items: ['C', 'C++', 'SQL'] },
]

const projectData = [
  {
    number: '01',
    name: 'NEXUS',
    title: 'AI GOVERNANCE INTELLIGENCE PLATFORM',
    description:
      'AI-powered governance intelligence platform integrating real-time public data across weather, water, healthcare, transport and other sectors.',
    features: [
      'Predictive risk analysis',
      'Interactive dashboards',
      'Alerts',
      'Decision support',
      'District-level intelligence',
      'Sector-level intelligence',
    ],
    tech: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'Machine Learning'],
    flow: ['PUBLIC DATA', 'AI ANALYSIS', 'RISK DETECTION', 'DECISION SUPPORT'],
  },
  {
    number: '02',
    name: 'CRIMELINK AI',
    title: 'INTELLIGENT FIR & POLICE ANALYTICS PLATFORM',
    description:
      'AI-powered platform for digital FIR registration, analysis, evidence management, police assignment, and case tracking.',
    features: [
      'Digital FIR registration',
      'Crime analysis',
      'Evidence management',
      'Case tracking',
      'FIR prioritization',
      'Similar-case detection',
      'Geospatial analysis',
      'Analytics dashboards',
      'PDF reporting',
    ],
    tech: ['Python', 'ML', 'Analytics', 'FastAPI', 'React'],
    flow: ['CITIZEN', 'FIR', 'AI ANALYSIS', 'POLICE INTELLIGENCE'],
  },
]

const experienceData = [
  {
    number: '01',
    role: 'PYTHON PROJECT INTERN',
    company: 'Codec Technologies',
    description:
      'Worked on Python-based software development and practical programming tasks, applying programming and problem-solving concepts to project work.',
  },
  {
    number: '02',
    role: 'DEVOPS INTERN',
    company: 'CodeAlpha',
    description:
      'Gained practical exposure to DevOps practices, development workflows, version control and software deployment concepts.',
  },
]

const educationData = [
  {
    title: 'CANARA ENGINEERING COLLEGE',
    subtitle: 'Bachelor of Engineering in Computer Science & Engineering',
    meta: '3rd Year',
    score: 'CGPA: 9.0 / 10',
  },
  {
    title: 'PRE-UNIVERSITY',
    subtitle: 'Science',
    meta: '97%',
    score: 'Creative Pre-University College',
  },
]

const certificationData = [
  { title: 'REACT.JS CERTIFICATION', org: 'Gyan Ganga Institute of Technology' },
  { title: 'PYTHON TUTORIAL', org: 'IIT Bombay' },
]

const skillFilterOptions = [
  { id: 'all', label: 'ALL' },
  { id: 'languages', label: 'LANGUAGES' },
  { id: 'frontend', label: 'FRONTEND' },
  { id: 'backend', label: 'BACKEND' },
  { id: 'database', label: 'DATABASE' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'tools', label: 'TOOLS' },
]

const floatingParticles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  top: `${(index * 29) % 100}%`,
  size: 2 + (index % 3),
  delay: index * 0.6,
  duration: 8 + (index % 7),
}))

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [activeProject, setActiveProject] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const projectRailRef = useRef(null)
  const projectSectionRef = useRef(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 800)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handlePointerMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useEffect(() => {
    const projectRail = projectRailRef.current
    const section = projectSectionRef.current

    if (!projectRail || !section) return

    const ctx = gsap.context(() => {
      gsap.to(projectRail, {
        x: () => -(projectRail.scrollWidth - section.offsetWidth + 120),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=1800',
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const numValues = document.querySelectorAll('[data-count]')
    numValues.forEach((item) => {
      const target = Number(item.dataset.count)
      let start = 0
      const duration = 1400
      const startTime = performance.now()

      const animate = (time) => {
        const progress = Math.min((time - startTime) / duration, 1)
        const value = Math.round(start + (target - start) * progress)
        item.textContent = value
        if (progress < 1) requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    })
  }, [])

  const filteredSkills = useMemo(() => {
    if (activeFilter === 'all') return primarySkills
    return primarySkills.filter((skill) => skill.category === activeFilter)
  }, [activeFilter])

  return (
    <div className="portfolio-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="noise-layer" aria-hidden="true" />

      <motion.div
        className="cursor-dot"
        animate={{ x: cursor.x - 6, y: cursor.y - 6, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24, mass: 0.2 }}
      />
      <motion.div
        className="cursor-ring"
        animate={{ x: cursor.x - 18, y: cursor.y - 18, scale: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.3 }}
      />

      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">M</span>
          <span className="brand-name">MEDHA NAYAK</span>
        </div>
        <button className="menu-trigger" onClick={() => setMenuOpen((prev) => !prev)}>
          <span>MENU</span>
          <span className="menu-lines">
            <i />
            <i />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="menu-panel"
              initial={{ scaleY: 0.8, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0.8, opacity: 0 }}
              transition={{ duration: 0.42, ease: 'easeInOut' }}
            >
              <div className="menu-header">
                <span>MEDHA NAYAK</span>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  ×
                </button>
              </div>
              <nav className="menu-nav">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className="menu-link"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * index }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className="menu-line" />
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-content">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="badge-pill" />
              COMPUTER SCIENCE × AI × FULL-STACK
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="title-line">MEDHA</span>
              <span className="title-line accent">NAYAK</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="hero-subtitle-wrap"
            >
              <div className="hero-line" />
              <p className="hero-subtitle">
                Computer Science &amp; Engineering student building practical software,
                AI systems and intelligent interfaces.
              </p>
            </motion.div>

            <motion.div
              className="cta-row"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
            >
              <a href="#work" className="primary-btn">
                VIEW MY WORK <FaArrowRight />
              </a>
              <a href="mailto:medhanayak756@gmail.com" className="secondary-btn">
                LET&apos;S CONNECT <FaArrowRight />
              </a>
            </motion.div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            {floatingParticles.map((particle) => (
              <span
                key={particle.id}
                className="floating-particle"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                }}
              />
            ))}
            <div className="signal-ring ring-one" />
            <div className="signal-ring ring-two" />
            <div className="signal-ring ring-three" />
            <div className="signal-core" />
          </div>
        </section>

        <section id="about" className="about-section section-shell">
          <div className="section-label-wrap">
            <span className="section-tag">ABOUT / 01</span>
          </div>

          <div className="about-grid">
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="about-heading"
            >
              I BUILD
              <span className="block">SYSTEMS THAT</span>
              <span className="block">SOLVE REAL</span>
              <span className="block">PROBLEMS.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="about-copy"
            >
              <p>
                I’m a Computer Science &amp; Engineering student with a focus on building
                practical systems that combine software engineering, AI, and product
                thinking. From intelligent tools to full-stack features, I build with a
                sharp eye on usability, impact, and real-world value.
              </p>
              <div className="stats-grid">
                <div className="stat-box">
                  <span className="stat-value" data-count="9">
                    0
                  </span>
                  <span className="stat-label">CGPA</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value" data-count="97">
                    0
                  </span>
                  <span className="stat-label">PU SCIENCE</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value" data-count="2">
                    0
                  </span>
                  <span className="stat-label">INTERNSHIPS</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value" data-count="2">
                    0
                  </span>
                  <span className="stat-label">FEATURED PROJECTS</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="work" ref={projectSectionRef} className="projects-section section-shell">
          <div className="section-header-row">
            <span className="section-tag">WORK / 03</span>
          </div>

          <div className="project-stage">
            <div ref={projectRailRef} className="project-rail">
              {projectData.map((project, index) => (
                <motion.article
                  key={project.name}
                  className={`project-card ${activeProject === index ? 'active' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  onMouseEnter={() => setActiveProject(index)}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-topline">
                    <span className="project-number">{project.number}</span>
                    <span className="project-link">VIEW PROJECT <FaArrowRight /></span>
                  </div>

                  <div className="project-body">
                    <h3>{project.name}</h3>
                    <p className="project-title">{project.title}</p>
                    <p className="project-description">{project.description}</p>

                    <div className="project-flow">
                      {project.flow.map((step, stepIndex) => (
                        <div key={step} className="flow-step-wrap">
                          <span className="flow-step">{step}</span>
                          {stepIndex < project.flow.length - 1 && <span className="flow-arrow">↓</span>}
                        </div>
                      ))}
                    </div>

                    <div className="tech-tags">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="skills-section section-shell">
          <div className="section-header-row">
            <span className="section-tag">TECH STACK / 04</span>
          </div>

          <div className="skills-header">
            <h2>TECH <span className="accent">STACK</span></h2>
          </div>

          <div className="skill-filter">
            {skillFilterOptions.map((option) => (
              <button
                key={option.id}
                className={activeFilter === option.id ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setActiveFilter(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="tech-showcase">
            {filteredSkills.map((skill) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={skill.name}
                  className="tech-item"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="tech-icon-wrap">
                    <Icon className="tech-icon" />
                  </div>
                  <div className="tech-meta">
                    <span className="tech-name">{skill.name}</span>
                    <small>{skill.tag}</small>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="secondary-skills">
            {secondarySkills.map((group) => (
              <div key={group.group} className="secondary-group">
                <span className="secondary-label">{group.group}:</span>
                <div className="secondary-list">
                  {group.items.map((item) => (
                    <span key={item} className="secondary-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="experience-section section-shell">
          <div className="section-header-row">
            <span className="section-tag">EXPERIENCE / 05</span>
          </div>

          <h2 className="timeline-heading">EXPERIENCE</h2>

          <div className="timeline">
            {experienceData.map((item) => (
              <motion.div
                key={item.role}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <span className="timeline-number">{item.number}</span>
                <div className="timeline-content">
                  <h3>{item.role}</h3>
                  <span className="company-name">{item.company}</span>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="education-section section-shell">
          <div className="section-header-row">
            <span className="section-tag">EDUCATION / 06</span>
          </div>

          <div className="education-grid">
            {educationData.map((item) => (
              <motion.article
                key={item.title}
                className="education-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <span className="education-type">{item.title}</span>
                <h3>{item.subtitle}</h3>
                <p>{item.meta}</p>
                <strong>{item.score}</strong>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="certifications-section section-shell">
          <div className="section-header-row">
            <span className="section-tag">CERTIFICATIONS / 07</span>
          </div>

          <div className="cert-grid">
            {certificationData.map((item) => (
              <motion.div
                key={item.title}
                className="cert-card"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <span className="cert-label">CERTIFICATION</span>
                <h3>{item.title}</h3>
                <p>{item.org}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="achievement-section section-shell">
          <div className="achievement-box">
            <span className="achievement-label">ACHIEVEMENT</span>
            <h3>CODEMEET</h3>
            <p>Srinivas Institute, Mukka</p>
            <small>Participated in CodeMeet.</small>
          </div>
        </section>

        <section id="contact" className="contact-section section-shell">
          <div className="contact-card">
            <span className="section-tag">CONTACT / 08</span>
            <h2>
              HAVE AN IDEA?
              <span className="block accent">LET&apos;S BUILD IT.</span>
            </h2>
            <div className="contact-links">
              <a href="mailto:medhanayak756@gmail.com">medhanayak756@gmail.com</a>
              <a href="https://linkedin.com/in/medha-nayak-71a798365" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/medhaa07" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
            <a href="mailto:medhanayak756@gmail.com" className="contact-cta">
              SAY HELLO <FaArrowRight />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>MEDHA NAYAK</span>
        <small>Computer Science × AI × Full Stack</small>
        <div className="footer-links">
          <a href="https://github.com/medhaa07" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/medha-nayak-71a798365" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="mailto:medhanayak756@gmail.com">Email</a>
        </div>
        <span className="footer-copy">© 2026 MEDHA NAYAK</span>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="case-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="case-panel"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button className="case-close" onClick={() => setSelectedProject(null)}>
                CLOSE ×
              </button>
              <div className="case-header">
                <span className="case-number">{selectedProject.number}</span>
                <h3>{selectedProject.name}</h3>
              </div>
              <p className="case-description">{selectedProject.description}</p>
              <div className="case-columns">
                <div>
                  <h4>KEY FEATURES</h4>
                  <ul>
                    {selectedProject.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>TECH STACK</h4>
                  <div className="case-tags">
                    {selectedProject.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
