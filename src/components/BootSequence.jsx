import { useEffect, useRef, useState } from "react"

const MONOGRAM = ["A", "Y", "B"]

export default function BootSequence({ onReveal, onComplete, reduce }) {
  const veilRef = useRef(null)
  const [phase, setPhase] = useState("init") // "init" | "reveal" | "exiting"
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  const revealedRef = useRef(false)
  const finishedRef = useRef(false)
  const exitStartedAtRef = useRef(null)

  const triggerReveal = () => {
    if (revealedRef.current) return
    revealedRef.current = true
    onReveal?.()
  }

  const finishBoot = () => {
    triggerReveal()
    if (finishedRef.current) return
    finishedRef.current = true
    setDone(true)
    onComplete?.()
  }

  const beginExit = () => {
    if (exitStartedAtRef.current !== null || finishedRef.current) return
    exitStartedAtRef.current = performance.now()
    setPhase("exiting")
    triggerReveal()
  }

  useEffect(() => {
    if (reduce) {
      finishBoot()
      return
    }

    let rafId = 0
    const startTime = performance.now()
    const REVEAL_AT = 0.14 // Wait cleanly so slit-mask transition fires reliably
    const HOLD_DURATION = 5.6 // Slower, unhurried pacing before curtain lifts
    const EXIT_DURATION = 1.75 // Slow, smooth architectural curtain lift into the Hero

    // Subtle pointer-reactive aurora parallax
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const onPointerMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2
      targetY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })

    const onKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault()
        setProgress(100)
        beginExit()
      }
    }
    window.addEventListener("keydown", onKeyDown)

    const tick = (now) => {
      const t = (now - startTime) / 1000

      // Smooth aurora & parallax damping
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06
      if (veilRef.current) {
        veilRef.current.style.setProperty("--mx", `${(currentX * 26).toFixed(2)}px`)
        veilRef.current.style.setProperty("--my", `${(currentY * 18).toFixed(2)}px`)
      }

      if (exitStartedAtRef.current === null) {
        if (t >= REVEAL_AT) {
          setPhase((prev) => (prev === "init" ? "reveal" : prev))
        }
        const ratio = Math.min(1, Math.max(0, (t - REVEAL_AT) / (HOLD_DURATION - REVEAL_AT)))
        // Smooth ease-out progress count
        const eased = 1 - Math.pow(1 - ratio, 2.2)
        setProgress(Math.round(eased * 100))

        if (t >= HOLD_DURATION) {
          beginExit()
        }
      } else {
        const exitElapsed = (now - exitStartedAtRef.current) / 1000
        if (exitElapsed >= EXIT_DURATION) {
          finishBoot()
          return
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [reduce])

  if (done) return null

  return (
    <div
      ref={veilRef}
      className={`intro-veil is-${phase}`}
      aria-hidden={phase === "exiting"}
    >
      {/* Soft breathing aurora & orbital alignment rings */}
      <div className="intro-aurora" aria-hidden="true" />
      <div className="intro-ring intro-ring-outer" aria-hidden="true" />
      <div className="intro-ring intro-ring-inner" aria-hidden="true" />

      {/* Top editorial bar */}
      <div className="intro-top">
        <span className="intro-brand">
          <i className="live-dot" /> AYOUB OUAZENE
        </span>
        <div className="intro-top-right">
          <span className="intro-coords">36°45′ N · 3°03′ E — ALGIERS</span>
          <button
            type="button"
            className="intro-skip"
            onClick={() => {
              setProgress(100)
              beginExit()
            }}
          >
            ENTER ↗
          </button>
        </div>
      </div>

      {/* Centerpiece masked kinetic typography */}
      <div className="intro-center">
        <div className="intro-frame">
          <span className="intro-corner tl" aria-hidden="true" />
          <span className="intro-corner tr" aria-hidden="true" />
          <span className="intro-corner bl" aria-hidden="true" />
          <span className="intro-corner br" aria-hidden="true" />

          <div className="intro-monogram" aria-label="A Y B">
            {MONOGRAM.map((char, idx) => (
              <span className="intro-mask" key={char}>
                <span
                  className="intro-char"
                  style={{ transitionDelay: `${idx * 210}ms` }}
                >
                  {char}
                </span>
              </span>
            ))}
          </div>

          <div className="intro-rule">
            <span style={{ transform: `scaleX(${progress / 100})` }} />
          </div>

          <div className="intro-submask">
            <p className="intro-subtitle">
              AI DEVELOPER <b>·</b> FULL-STACK SOFTWARE ENGINEER
            </p>
          </div>
        </div>
      </div>

      {/* Bottom hairline telemetry & progress */}
      <div className="intro-bottom">
        <span className="intro-status">
          {phase === "exiting" ? "ENTERING SIGNAL / 26" : "CALIBRATING INTERFACE"}
        </span>
        <span className="intro-counter">{String(progress).padStart(3, "0")}</span>
      </div>
    </div>
  )
}
