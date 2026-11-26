import { useCallback, useEffect, useRef, useState } from "react"
import {
  person, freelance, chapters, films, field, kit, schooling,
} from "./data/content"
import BootSequence from "./components/BootSequence"
import ScrollRail from "./components/ScrollRail"
import AmbientSignal from "./components/AmbientSignal"
import WorkVisualizer from "./components/WorkVisualizer"
import ToolkitLab from "./components/ToolkitLab"
import FieldDeck from "./components/FieldDeck"

const ticker = [
  "Full-stack engineering", "FastAPI & Next.js", "Computer vision", "Multi-agent RAG",
  "Distributed APIs", "Edge inference", "Docker & CI/CD", "Algiers",
]

function splitWords(text) {
  const parts = text.split(" ")
  return parts.map((word, i) => (
    <span className="word" key={word + i}>
      <span>{word}{i < parts.length - 1 ? "\u00A0" : ""}</span>
    </span>
  ))
}

export default function App() {
  const root = useRef(null)
  const lenisRef = useRef(null)
  const [bootRevealed, setBootRevealed] = useState(false)
  const [activeChapter, setActiveChapter] = useState(0)
  const [selectedProject, setSelectedProject] = useState(0)
  const [portraitLoaded, setPortraitLoaded] = useState(false)
  const reduce = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const handleBootReveal = useCallback(() => {
    setBootRevealed(true)
  }, [])

  const scrollToChapter = useCallback((id) => {
    const target = document.getElementById(id)
    if (!target) return
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: 0 })
    } else {
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
    }
  }, [reduce])

  // Hero entrance right as the intro curtain glides open
  useEffect(() => {
    if (!bootRevealed || reduce) return
    let ctx
    let killed = false

    ;(async () => {
      const gsapMod = await import("gsap")
      const gsap = gsapMod.gsap || gsapMod.default
      if (killed) return

      ctx = gsap.context(() => {
        gsap.from(".hero-center", {
          scale: 0.94,
          y: 26,
          opacity: 0,
          duration: 1.35,
          ease: "power3.out",
        })
        gsap.from(".hero h1 .word > span", {
          yPercent: 105,
          duration: 1.2,
          stagger: 0.09,
          delay: 0.12,
          ease: "power4.out",
        })
        gsap.from(".hero-meta, .hero-foot > *", {
          y: 20,
          opacity: 0,
          duration: 1.0,
          stagger: 0.1,
          delay: 0.28,
          ease: "power3.out",
        })
      }, root)
    })()

    return () => {
      killed = true
      if (ctx) ctx.revert()
    }
  }, [bootRevealed, reduce])

  // Track active section for ScrollRail and Topbar
  useEffect(() => {
    const updateActive = () => {
      const marker = window.scrollY + window.innerHeight * 0.38
      let currentIdx = 0
      chapters.forEach((chapter, idx) => {
        const el = document.getElementById(chapter.id)
        if (el && el.offsetTop <= marker) {
          currentIdx = idx
        }
      })
      setActiveChapter(currentIdx)
    }

    updateActive()
    window.addEventListener("scroll", updateActive, { passive: true })
    window.addEventListener("resize", updateActive)
    return () => {
      window.removeEventListener("scroll", updateActive)
      window.removeEventListener("resize", updateActive)
    }
  }, [])

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    let ctx
    let lenis
    let tickerCallback
    let removeTickerCallback
    let killed = false
    let rafId = 0
    let resizeCanvas
    let movePointer
    const cleanups = []

    ;(async () => {
      const gsapMod = await import("gsap")
      const stMod = await import("gsap/ScrollTrigger")
      const gsap = gsapMod.gsap || gsapMod.default
      const ScrollTrigger = stMod.ScrollTrigger
      if (killed) return
      gsap.registerPlugin(ScrollTrigger)

      if (!reduce) {
        const lenisMod = await import("lenis")
        const Lenis = lenisMod.default
        if (killed) return
        lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
        lenisRef.current = lenis
        lenis.on("scroll", ScrollTrigger.update)
        tickerCallback = (time) => lenis.raf(time * 1000)
        gsap.ticker.add(tickerCallback)
        removeTickerCallback = () => gsap.ticker.remove(tickerCallback)
        gsap.ticker.lagSmoothing(0)
      }

      ctx = gsap.context(() => {
        const canvas = document.querySelector(".hero-signal-canvas")
        const ctx2d = canvas?.getContext("2d")
        let pointerX = -1000
        let pointerY = -1000
        if (canvas && ctx2d && !reduce) {
          const particles = []
          let width = 0
          let height = 0
          const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
          const isSmall = window.matchMedia("(max-width: 600px)").matches
          resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect()
            width = rect.width
            height = rect.height
            canvas.width = Math.round(width * dpr)
            canvas.height = Math.round(height * dpr)
            ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0)
            particles.length = 0
            const count = Math.min(isSmall ? 70 : 110, Math.max(isSmall ? 45 : 65, Math.round(width / (isSmall ? 7 : 11))))
            for (let i = 0; i < count; i++) {
              particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * (isSmall ? 0.42 : 0.3),
                vy: (Math.random() - 0.5) * (isSmall ? 0.42 : 0.3),
                r: Math.random() * 1.3 + 0.8,
                phase: Math.random() * Math.PI * 2,
              })
            }
          }
          movePointer = (event) => {
            const rect = canvas.getBoundingClientRect()
            pointerX = event.clientX - rect.left
            pointerY = event.clientY - rect.top
          }
          let tick = 0
          const draw = () => {
            tick += 0.012
            ctx2d.clearRect(0, 0, width, height)
            const nebula = ctx2d.createRadialGradient(width * 0.52, height * 0.52, 0, width * 0.52, height * 0.52, Math.max(width, height) * 0.67)
            nebula.addColorStop(0, "rgba(23, 117, 91, .28)")
            nebula.addColorStop(.52, "rgba(10, 50, 40, .14)")
            nebula.addColorStop(1, "rgba(8, 17, 15, 0)")
            ctx2d.fillStyle = nebula
            ctx2d.fillRect(0, 0, width, height)

            const wavePoints = []
            for (let x = -30; x <= width + 30; x += 12) {
              const y = height * .53 + Math.sin(x * .012 + tick) * height * .055 + Math.sin(x * .004 - tick * 1.5) * height * .09
              wavePoints.push({ x, y })
            }
            ctx2d.beginPath()
            wavePoints.forEach((point, i) => i === 0 ? ctx2d.moveTo(point.x, point.y) : ctx2d.lineTo(point.x, point.y))
            ctx2d.strokeStyle = "rgba(112, 246, 210, .23)"
            ctx2d.lineWidth = 1
            ctx2d.stroke()
            wavePoints.forEach((point, i) => {
              if (i % 3 !== 0) return
              ctx2d.beginPath()
              ctx2d.moveTo(point.x, point.y - 8)
              ctx2d.lineTo(point.x, point.y + 8)
              ctx2d.strokeStyle = "rgba(112, 246, 210, .12)"
              ctx2d.stroke()
            })

            for (let i = 0; i < particles.length; i++) {
              const p = particles[i]
              p.x += p.vx; p.y += p.vy
              if (p.x < 0 || p.x > width) p.vx *= -1
              if (p.y < 0 || p.y > height) p.vy *= -1
              const dx = pointerX - p.x; const dy = pointerY - p.y
              const d = Math.hypot(dx, dy)
              if (d < 190 && d > 0) {
                p.x -= (dx / d) * (190 - d) * 0.004
                p.y -= (dy / d) * (190 - d) * 0.004
              }
              const pulse = .65 + (Math.sin(tick * 2 + p.phase) + 1) * .3
              ctx2d.beginPath()
              ctx2d.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2)
              ctx2d.fillStyle = "rgba(112, 246, 210, .9)"
              ctx2d.shadowBlur = 12
              ctx2d.shadowColor = "rgba(112, 246, 210, .65)"
              ctx2d.fill()
              ctx2d.shadowBlur = 0
              for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j]
                const distance = Math.hypot(p.x - q.x, p.y - q.y)
                if (distance < (isSmall ? 68 : 92)) {
                  const intensity = (1 - distance / (isSmall ? 68 : 92)) * (d < 210 ? .5 : .26)
                  ctx2d.beginPath()
                  ctx2d.moveTo(p.x, p.y)
                  ctx2d.lineTo(q.x, q.y)
                  ctx2d.strokeStyle = `rgba(112, 246, 210, ${intensity})`
                  ctx2d.lineWidth = .8
                  ctx2d.stroke()
                }
              }
            }
            rafId = requestAnimationFrame(draw)
          }
          resizeCanvas()
          window.addEventListener("resize", resizeCanvas)
          window.addEventListener("pointermove", movePointer, { passive: true })
          rafId = requestAnimationFrame(draw)
        }

        if (!reduce) {
          gsap.to(".marquee-track", { xPercent: -50, ease: "none", duration: 28, repeat: -1 })

          gsap.utils.toArray(".chapter h2, .work-heading h2").forEach((el) => {
            gsap.from(el, {
              y: 28, opacity: 0, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            })
          })

          const header = document.querySelector(".topbar")
          ScrollTrigger.create({
            trigger: ".marquee",
            start: "top top",
            end: "bottom top",
            onToggle: (self) => header?.classList.toggle("topbar-on-ink", self.isActive),
          })

          let last = 0
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              const y = self.scroll()
              const down = y > last && y > 80
              gsap.to(header, { yPercent: down ? -120 : 0, duration: 0.35, overwrite: true })
              last = y
            },
          })
        }

        if (fine && !reduce) {
          const dot = document.querySelector(".cursor")
          const ring = document.querySelector(".cursor-ring")
          const xTo = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3.out" })
          const yTo = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3.out" })
          const rx = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" })
          const ry = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" })
          const move = (e) => {
            xTo(e.clientX); yTo(e.clientY); rx(e.clientX); ry(e.clientY)
          }
          const over = (e) => {
            if (e.target.closest("a, button, .scroll-rail-track")) {
              document.body.classList.add("hovering")
            } else {
              document.body.classList.remove("hovering")
            }
          }
          window.addEventListener("mousemove", move)
          document.addEventListener("mouseover", over)
          cleanups.push(() => {
            window.removeEventListener("mousemove", move)
            document.removeEventListener("mouseover", over)
            document.body.classList.remove("hovering")
          })
        }
      }, root)

      ScrollTrigger.refresh()
    })()

    return () => {
      killed = true
      lenisRef.current = null
      cleanups.forEach((cleanup) => cleanup())
      if (rafId) cancelAnimationFrame(rafId)
      if (resizeCanvas) window.removeEventListener("resize", resizeCanvas)
      if (movePointer) window.removeEventListener("pointermove", movePointer)
      if (removeTickerCallback) removeTickerCallback()
      if (ctx) ctx.revert()
      if (lenis) lenis.destroy()
    }
  }, [reduce])

  const loop = ticker.concat(ticker)
  const activeFilm = films[selectedProject] || films[0]

  return (
    <div ref={root}>
      <BootSequence reduce={reduce} onReveal={handleBootReveal} />
      <AmbientSignal reduce={reduce} />
      <ScrollRail
        chapters={chapters}
        activeChapter={activeChapter}
        onNavigate={scrollToChapter}
      />

      {!reduce && <div className="cursor" aria-hidden="true" />}
      {!reduce && <div className="cursor-ring" aria-hidden="true" />}

      <header className="topbar">
        <nav>
          {chapters.slice(1).map((c, idx) => (
            <a
              key={c.id}
              href={"#" + c.id}
              className={activeChapter === idx + 1 ? "is-active" : ""}
              onClick={(e) => {
                e.preventDefault()
                scrollToChapter(c.id)
              }}
            >
              {c.label}
            </a>
          ))}
        </nav>
      </header>

      <main className={bootRevealed || reduce ? "is-revealed" : "is-pre-reveal"}>
        <section className="hero" id="index">
          <canvas className="hero-signal-canvas" aria-hidden="true" />
          <div className="hero-meta">
            <span><i className="live-dot" /> SYSTEM / ONLINE</span>
            <span>{person.location} · {person.role}</span>
            <span>AI / SOFTWARE / SYSTEMS</span>
          </div>
          <div className="hero-center">
            <div className="hero-coordinate">36°45′ N&nbsp; 3°03′ E <span>—&nbsp; 2026</span></div>
            <div className={`hero-portrait ${portraitLoaded ? "is-loaded" : ""}`} aria-label="Portrait of Ayoub Ouazene">
              <img
                src="/me.jpg"
                alt="Ayoub Ouazene"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onLoad={() => setPortraitLoaded(true)}
                onError={(event) => {
                  setPortraitLoaded(false)
                  event.currentTarget.style.display = "none"
                }}
              />
              <span className="portrait-placeholder"><i>AO</i><small>PORTRAIT<br />IMAGE</small></span>
              <span className="portrait-scan" />
            </div>
            <h1 aria-label={person.name}>
              <span className="name-first">{splitWords(person.first)}</span>
              <span className="name-last">{splitWords(person.last)}<i>.</i></span>
            </h1>
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-stamp">BUILD<br />THINGS<br /><em>THAT THINK</em></div>
          </div>
          <div className="hero-foot">
            <p>Engineering full-stack software and AI systems that <em>work in production.</em></p>
            <div className="now-card"><span className="live-dot" /><small>FOCUS</small><span>Full-stack & AI agents</span></div>
            <a
              className="scroll-hint"
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                scrollToChapter("work")
              }}
            >
              SCROLL TO EXPLORE <span>↓</span>
            </a>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {loop.map((item, i) => (
              <span key={i}><b>✦</b>{item}</span>
            ))}
          </div>
        </div>

        {/* Personal Introduction / What I Build */}
        <section className="sheet freelance-band" aria-label="About Ayoub Ouazene">
          <div className="freelance-inner">
            <div className="freelance-meta">
              <span className="chapter-kicker"><i className="live-dot" /> {freelance.kicker}</span>
              <h3>{freelance.title}</h3>
            </div>
            <div className="freelance-copy">
              <p>{freelance.summary}</p>
              <div className="freelance-pillars">
                {freelance.pillars.map((pillar) => (
                  <span key={pillar}>{pillar}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 01 — Selected Work / Projects */}
        <section className="work-section sheet section-atmo" id="work">
          <div className="section-orbit practice-orbit" aria-hidden="true" />
          <div className="work-heading">
            <div className="chapter-kicker">01 — Selected transmissions</div>
            <div><span className="work-status"><i className="live-dot" /> {String(films.length).padStart(2, "0")} BUILDS / ARCHIVED</span><h2>Things I set<br /><em>in motion.</em></h2></div>
          </div>
          <div className="work-layout">
            <div className="project-picker" role="tablist" aria-label="Selected projects">
              {films.map((item, index) => (
                <button
                  className={selectedProject === index ? "active" : ""}
                  key={item.num}
                  type="button"
                  role="tab"
                  aria-selected={selectedProject === index}
                  onClick={() => setSelectedProject(index)}
                >
                  <span>{item.num}</span><b>{item.title}</b><i>↗</i>
                </button>
              ))}
            </div>
            <article className="project-detail" role="tabpanel" key={selectedProject}>
              <div className="project-detail-top"><span>TRANSMISSION / {activeFilm.num}</span><span>{activeFilm.kind}</span></div>
              <WorkVisualizer project={activeFilm} index={selectedProject} reduce={reduce} />
              <div className="project-copy">
                <h3>{activeFilm.title}</h3>
                <p className="line">{activeFilm.line}</p>
                <p className="body">{activeFilm.body}</p>
                <div className="tags">{activeFilm.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="project-links">
                  {activeFilm.href && (
                    <a className="repo" href={activeFilm.href} target="_blank" rel="noreferrer">
                      Open repository <span>↗</span>
                    </a>
                  )}
                  {activeFilm.live && (
                    <a className="repo repo-secondary" href={activeFilm.live} target="_blank" rel="noreferrer">
                      Live demo <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
              <div className="project-progress"><span style={{ transform: `scaleX(${(selectedProject + 1) / films.length})` }} /></div>
            </article>
          </div>
        </section>

        {/* 02 — Toolkit (AI & Software Engineering) */}
        <section className="sheet section-atmo" id="stack">
          <div className="chapter">
            <div className="chapter-kicker">02 — Toolkit</div>
            <div>
              <h2>{splitWords("What I actually reach for.")}</h2>
            </div>
          </div>
          <ToolkitLab kit={kit} reduce={reduce} onJumpToWork={() => scrollToChapter("work")} />
        </section>

        {/* 03 — In the Field (Compact Interactive Hackathons & Datathons Stage) */}
        <section className="sheet section-atmo" id="field">
          <div className="section-orbit field-orbit" aria-hidden="true" />
          <div className="chapter">
            <div className="chapter-kicker">03 — In the field</div>
            <div>
              <h2>{splitWords("Rooms with a clock.")}</h2>
              <p className="lede">Participated in 10+ hackathons and datathons in general—here are 9 of the most notable ones, owning the models, the backend, and the product that leaves the room.</p>
            </div>
          </div>
          <FieldDeck field={field} />
        </section>

        {/* 04 — The Desk (Education & Contact, generous spacing) */}
        <section className="sheet section-atmo desk-section" id="desk">
          <div className="chapter desk-chapter">
            <div className="chapter-kicker">04 — The desk</div>
            <h2>{splitWords("School & contact.")}</h2>
          </div>
          <div className="desk">
            <div className="desk-school-card">
              <div className="chapter-kicker">{schooling.years} · {schooling.city}</div>
              <p className="school-name">{schooling.short}</p>
              <p className="school-detail">{schooling.school}. {schooling.degree}.</p>
              <a className="repo cv-link" href="/cv.pdf" download>Download CV ↓</a>
            </div>
            <div className="contact-block">
              <div className="desk-orbit" aria-hidden="true" />
              <div className="desk-endpoint"><span className="live-dot" /> SIGNAL // ENDPOINT</div>
              <h2>Write me <em>a letter.</em></h2>
              <a className="mail" href={"mailto:" + person.email}>{person.email}</a>
              <div className="socials">
                <a href={person.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={person.kaggle} target="_blank" rel="noreferrer">Kaggle</a>
              </div>
            </div>
          </div>
          <footer className="fineprint">
            <span>Ayoub Ouazene — Algiers</span>
            <span>AI · full-stack · systems</span>
          </footer>
        </section>
      </main>
    </div>
  )
}
