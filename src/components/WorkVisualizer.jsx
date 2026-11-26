import { useEffect, useRef } from "react"

export default function WorkVisualizer({ project, index, reduce }) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (reduce) return
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !wrap || !ctx) return

    let width = 0
    let height = 0
    let rafId = 0
    let mx = 0.5
    let my = 0.5
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const nodes = Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * Math.PI * 2
      const radius = 0.24 + ((i * 7 + index * 3) % 5) * 0.045
      return {
        angle,
        radius,
        speed: (i % 2 === 0 ? 1 : -1) * (0.004 + (i % 4) * 0.0015),
        size: 1.4 + (i % 3) * 0.6,
      }
    })

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      mx = (e.clientX - rect.left) / rect.width
      my = (e.clientY - rect.top) / rect.height
    }

    let t = index * 1.3
    const draw = () => {
      t += 0.016
      ctx.clearRect(0, 0, width, height)
      const cx = width * (0.5 + (mx - 0.5) * 0.08)
      const cy = height * (0.5 + (my - 0.5) * 0.08)
      const scale = Math.min(width, height)

      // Signal waveform across project frame
      ctx.beginPath()
      for (let x = 0; x <= width; x += 6) {
        const freq = 0.018 + (index % 4) * 0.005
        const y =
          cy +
          Math.sin(x * freq + t * 1.4) * (height * 0.08) +
          Math.cos(x * 0.009 - t) * (height * 0.05)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = "rgba(112, 246, 210, 0.24)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Orbiting telemetry constellation
      const pts = nodes.map((n) => {
        n.angle += n.speed
        return {
          x: cx + Math.cos(n.angle) * (scale * n.radius),
          y: cy + Math.sin(n.angle * 1.15) * (scale * n.radius * 0.72),
          size: n.size,
        }
      })

      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        const b = pts[(i + 1) % pts.length]
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = "rgba(112, 246, 210, 0.16)"
        ctx.lineWidth = 0.8
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2)
        ctx.fillStyle = i % 5 === 0 ? "rgba(185, 255, 143, 0.9)" : "rgba(112, 246, 210, 0.78)"
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    wrap.addEventListener("pointermove", onMove, { passive: true })
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", resize)
      wrap.removeEventListener("pointermove", onMove)
    }
  }, [index, reduce])

  return (
    <div className="project-visual" ref={wrapRef} aria-hidden="true">
      <canvas className="project-visual-canvas" ref={canvasRef} />
      <div className="visual-orbit visual-orbit-a" />
      <div className="visual-orbit visual-orbit-b" />
      <span className="visual-telemetry">
        <i className="live-dot" /> SIGNAL // {project.num}
      </span>
      <span className="visual-code">{project.tags.slice(0, 3).join(" / ")}</span>
      <strong>{project.num}</strong>
    </div>
  )
}
