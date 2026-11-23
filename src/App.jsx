import { useEffect, useRef, useState } from "react"
import {
  person, chapters, practice, films, field, kit, schooling, paper, rooms,
} from "./data/content"

const ticker = [
  "Computer vision", "Model compression", "Edge inference", "RAG",
  "Vision transformers", "Multi-agent systems", "Time series", "Algiers",
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
  const [frame, setFrame] = useState(1)
  const [expandedField, setExpandedField] = useState(0)
  const [selectedProject, setSelectedProject] = useState(0)
  const reduce = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    let ctx
    let lenis
    let tickerCallback
    let removeTickerCallback
    let resizeHandler
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
          const boot = gsap.timeline()
          boot.to(".boot i", { opacity: 0, duration: 0.3, delay: 0.55 })
          boot.to(".boot span:first-child", { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 0.7)
          boot.to(".boot span:last-child", { yPercent: 100, duration: 0.9, ease: "power4.inOut" }, 0.7)
          boot.set(".boot", { autoAlpha: 0 }, 1.6)
          boot.from(".hero h1 .word > span", {
            yPercent: 110, duration: 1.05, stagger: 0.06, ease: "power4.out",
          }, 1.15)
          boot.from(".hero-meta, .hero-foot > *", {
            y: 24, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
          }, 1.35)

          gsap.to(".marquee-track", { xPercent: -50, ease: "none", duration: 28, repeat: -1 })
          
          gsap.utils.toArray(".field-toggle").forEach((button) => {
            const mark = button.querySelector(".field-toggle-mark")
            const syncMark = () => gsap.to(mark, {
              rotation: button.getAttribute("aria-expanded") === "true" ? 45 : 0,
              duration: 0.25,
              ease: "power2.out",
            })
            button.addEventListener("click", syncMark)
            cleanups.push(() => button.removeEventListener("click", syncMark))
          })

          gsap.utils.toArray(".chapter h2, .pin-head h2").forEach((el) => {
            gsap.from(el, {
              y: 28, opacity: 0, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            })
          })
          gsap.utils.toArray(".practice article, .stack-grid article").forEach((el) => {
            gsap.from(el, {
              y: 36, opacity: 0, duration: 0.7, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%" },
            })
          })

          gsap.utils.toArray(".field-detail").forEach((detail) => {
            const trigger = document.querySelector(`[aria-controls="${detail.id}"]`)
            const syncDetail = () => {
              detail.hidden = trigger.getAttribute("aria-expanded") !== "true"
            }
            trigger.addEventListener("click", syncDetail)
            cleanups.push(() => trigger.removeEventListener("click", syncDetail))
          })

          const film = document.querySelector(".film")
          const stage = document.querySelector(".pin-stage")
          const projectButtons = gsap.utils.toArray(".project-picker button")
          projectButtons.forEach((button, index) => {
            const pick = () => {
              setSelectedProject(index)
              gsap.fromTo(".project-detail", { y: 14, opacity: 0.3 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" })
            }
            button.addEventListener("click", pick)
            cleanups.push(() => button.removeEventListener("click", pick))
          })
          document.querySelectorAll(".project-picker button").forEach((button) => {
            const enter = () => button.classList.add("is-hovered")
            const leave = () => button.classList.remove("is-hovered")
            button.addEventListener("mouseenter", enter)
            button.addEventListener("mouseleave", leave)
            cleanups.push(() => {
              button.removeEventListener("mouseenter", enter)
              button.removeEventListener("mouseleave", leave)
            })
          })
          let horizontalTween
          const setupHorizontalFilm = () => {
            if (!film || !stage || window.innerWidth <= 980 || horizontalTween) return
            const distance = () => Math.max(0, film.scrollWidth - stage.clientWidth)
            horizontalTween = gsap.to(film, {
              x: () => -distance(),
              ease: "none",
              onUpdate: () => {
                const x = Number(gsap.getProperty(film, "x")) || 0
                const total = distance()
                const progress = total ? Math.min(1, Math.max(0, -x / total)) : 0
                const n = Math.min(films.length, Math.max(1, Math.ceil(progress * films.length)))
                setFrame((current) => current === n ? current : n)
              },
              scrollTrigger: {
                trigger: ".pin-wrap",
                start: "top top",
                end: () => "+=" + distance(),
                pin: stage,
                scrub: 0.6,
                invalidateOnRefresh: true,
                onRefresh: (self) => {
                  const n = Math.min(films.length, Math.max(1, Math.ceil(self.progress * films.length)))
                  setFrame(n)
                },
              },
            })
            horizontalTween.scrollTrigger?.refresh()
          }
          setupHorizontalFilm()
          resizeHandler = () => {
            if (window.innerWidth <= 980 && horizontalTween) {
              horizontalTween.scrollTrigger?.kill()
              horizontalTween.kill()
              horizontalTween = null
              gsap.set(film, { clearProps: "transform" })
              gsap.set(stage, { clearProps: "height,padding" })
            } else {
              setupHorizontalFilm()
            }
            ScrollTrigger.refresh()
          }
          window.addEventListener("resize", resizeHandler)

          const header = document.querySelector(".topbar")
          ScrollTrigger.create({
            trigger: ".marquee",
            start: "top top",
            end: "bottom top",
            onToggle: (self) => header.classList.toggle("topbar-on-ink", self.isActive),
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
          window.addEventListener("mousemove", move)
          cleanups.push(() => window.removeEventListener("mousemove", move))
          document.querySelectorAll("a, button").forEach((el) => {
            const enter = () => document.body.classList.add("hovering")
            const leave = () => document.body.classList.remove("hovering")
            el.addEventListener("mouseenter", enter)
            el.addEventListener("mouseleave", leave)
            cleanups.push(() => {
              el.removeEventListener("mouseenter", enter)
              el.removeEventListener("mouseleave", leave)
            })
          })
        }
      }, root)

      ScrollTrigger.refresh()
    })()

    return () => {
      killed = true
      cleanups.forEach((cleanup) => cleanup())
      if (resizeHandler) window.removeEventListener("resize", resizeHandler)
      if (rafId) cancelAnimationFrame(rafId)
      if (resizeCanvas) window.removeEventListener("resize", resizeCanvas)
      if (movePointer) window.removeEventListener("pointermove", movePointer)
      if (removeTickerCallback) removeTickerCallback()
      if (ctx) ctx.revert()
      if (lenis) lenis.destroy()
    }
  }, [reduce])

  const loop = ticker.concat(ticker)

  return (
    <div ref={root}>
      {!reduce && (
        <div className="boot" aria-hidden="true">
          <span />
          <span />
          <i>A.O. — Algiers — folio 2026</i>
        </div>
      )}
      {!reduce && <div className="cursor" aria-hidden="true" />}
      {!reduce && <div className="cursor-ring" aria-hidden="true" />}

      <header className="topbar">
        <nav>
          {chapters.slice(1).map((c) => (
            <a key={c.id} href={"#" + c.id}>{c.label}</a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero" id="index">
          <canvas className="hero-signal-canvas" aria-hidden="true" />
          <div className="hero-meta">
            <span><i className="live-dot" /> SYSTEM / ONLINE</span>
            <span>{person.location} · {person.role}</span>
            <span>AI / SYSTEMS / EDGE</span>
          </div>
          <div className="hero-center">
            <div className="hero-coordinate">36°45′ N&nbsp; 3°03′ E <span>—&nbsp; 2026</span></div>
            <div className="hero-portrait" aria-label="Portrait of Ayoub Ouazene">
              <img src="/me.jpg" alt="Ayoub Ouazene" onError={(event) => { event.currentTarget.style.display = "none" }} />
              <span className="portrait-placeholder"><i>AO</i><small>PORTRAIT<br />IMAGE</small></span>
              <span className="portrait-scan" />
            </div>
            <h1 aria-label={person.name}>
              <span className="name-first">{person.first}</span>
              <span className="name-last">{person.last}<i>.</i></span>
            </h1>
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-stamp">BUILD<br />THINGS<br /><em>THAT THINK</em></div>
          </div>
          <div className="hero-foot">
            <p>Researching how machines see. Building systems that <em>do something with it.</em></p>
            <div className="now-card"><span className="live-dot" /><small>IN PROGRESS</small><span>Arabic handwriting × ViT</span></div>
            <a className="scroll-hint" href="#practice">SCROLL TO EXPLORE <span>↓</span></a>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {loop.map((item, i) => (
              <span key={i}><b>✦</b>{item}</span>
            ))}
          </div>
        </div>

        <section className="sheet" id="practice">
          <div className="chapter">
            <div className="chapter-kicker">01 — Practice</div>
            <div>
              <h2>{splitWords("Where the work sits.")}</h2>
              <p className="lede">Research on handwriting and attention, a live dispatch system, and freelance builds where the model has to survive contact with a product.</p>
            </div>
          </div>
          <div className="practice">
            {practice.map((job) => (
              <article key={job.place}>
                <div className="when">{job.period}</div>
                <div>
                  <h3>{job.place}</h3>
                  <div className="role">{job.role}</div>
                </div>
                <p>{job.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="work-section sheet" id="work">
          <div className="work-heading">
            <div className="chapter-kicker">02 — Selected transmissions</div>
            <div><span className="work-status"><i className="live-dot" /> {String(films.length).padStart(2, "0")} BUILDS / ARCHIVED</span><h2>Things I set<br /><em>in motion.</em></h2></div>
          </div>
          <div className="work-layout">
            <div className="project-picker" role="tablist" aria-label="Selected projects">
              {films.map((item, index) => (
                <button className={selectedProject === index ? "active" : ""} key={item.num} type="button" role="tab" aria-selected={selectedProject === index} onClick={() => setSelectedProject(index)}>
                  <span>{item.num}</span><b>{item.title}</b><i>↗</i>
                </button>
              ))}
            </div>
            <article className="project-detail" role="tabpanel" key={selectedProject}>
              <div className="project-detail-top"><span>TRANSMISSION / {films[selectedProject].num}</span><span>{films[selectedProject].kind}</span></div>
              <div className="project-visual" aria-hidden="true">
                <div className="visual-orbit visual-orbit-a" /><div className="visual-orbit visual-orbit-b" />
                <span className="visual-code">{films[selectedProject].tags.slice(0, 3).join(" / ")}</span>
                <strong>{films[selectedProject].num}</strong>
              </div>
              <div className="project-copy">
                <h3>{films[selectedProject].title}</h3>
                <p className="line">{films[selectedProject].line}</p>
                <p className="body">{films[selectedProject].body}</p>
                <div className="tags">{films[selectedProject].tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                {films[selectedProject].href && <a className="repo" href={films[selectedProject].href} target="_blank" rel="noreferrer">Open repository <span>↗</span></a>}
              </div>
              <div className="project-progress"><span style={{ transform: `scaleX(${(selectedProject + 1) / films.length})` }} /></div>
            </article>
          </div>
        </section>

        <section className="sheet" id="field">
          <div className="chapter">
            <div className="chapter-kicker">03 — In the field</div>
            <div>
              <h2>{splitWords("Rooms with a clock.")}</h2>
              <p className="lede">Datathons and hackathons, usually as the person who owns the model and the endpoint it has to leave through.</p>
            </div>
          </div>
          <div className="field">
            {field.map((row, index) => (
              <article className="field-row" key={row.title}>
                <div className="when">{row.when}</div>
                <button
                  className="field-toggle"
                  type="button"
                  aria-expanded={expandedField === index}
                  aria-controls={`field-detail-${index}`}
                  onClick={() => setExpandedField((current) => current === index ? -1 : index)}
                >
                  <span>{row.title}</span>
                  <span className="field-toggle-mark" aria-hidden="true">{expandedField === index ? "−" : "+"}</span>
                </button>
                <div className="mark">{row.mark}</div>
                <p className="field-detail" id={`field-detail-${index}`} hidden={expandedField !== index}>{row.detail}</p>
                <noscript>{row.detail}</noscript>
              </article>
            ))}
          </div>
        </section>

        <section className="sheet" id="stack">
          <div className="chapter">
            <div className="chapter-kicker">04 — Toolkit</div>
            <h2>{splitWords("What I actually reach for.")}</h2>
          </div>
          <div className="stack-grid">
            {kit.map((group) => (
              <article key={group.name}>
                <h3>{group.name}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="sheet" id="desk">
          <div className="chapter">
            <div className="chapter-kicker">05 — The desk</div>
            <h2>{splitWords("School, paper, people.")}</h2>
          </div>
          <div className="desk">
            <div>
              <div className="chapter-kicker">{schooling.years} · {schooling.city}</div>
              <p className="school-name">{schooling.short}</p>
              <p>{schooling.school}. {schooling.degree}.</p>
              <a className="repo cv-link" href="/cv.pdf" download>Download CV ↓</a>
              <ul className="paper-list">{paper.map((line) => <li key={line}>{line}</li>)}</ul>
              <ul className="paper-list">{rooms.map((line) => <li key={line}>{line}</li>)}</ul>
            </div>
            <div className="contact-block">
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
            <span>AI · software · edge</span>
          </footer>
        </section>
      </main>
    </div>
  )
}
