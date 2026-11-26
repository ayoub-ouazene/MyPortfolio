import { useEffect, useRef } from "react"

export default function AmbientSignal({ reduce }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (reduce) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let rafId = 0
    let pointerX = -9999
    let pointerY = -9999
    let lastScrollY = window.scrollY
    let scrollBoost = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const nodes = []

    const init = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodes.length = 0
      const isSmall = width <= 600
      const count = isSmall ? 26 : 48
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.1 + 0.65,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const onPointer = (e) => {
      pointerX = e.clientX
      pointerY = e.clientY
    }

    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY)
      lastScrollY = window.scrollY
      scrollBoost = Math.min(2.6, scrollBoost + delta * 0.015)
    }

    let tick = 0
    let isDrawing = false

    const startDraw = () => {
      if (!isDrawing) {
        isDrawing = true
        rafId = requestAnimationFrame(draw)
      }
    }

    const onScrollCheck = () => {
      onScroll()
      if (window.scrollY >= height * 0.35) {
        startDraw()
      }
    }

    const draw = () => {
      const fadeIn = Math.min(1, Math.max(0, (window.scrollY - height * 0.45) / (height * 0.4)))
      if (fadeIn <= 0.01) {
        ctx.clearRect(0, 0, width, height)
        isDrawing = false
        return
      }

      tick += 0.01 + scrollBoost * 0.008
      scrollBoost *= 0.92
      const scrollRatio = window.scrollY / Math.max(1, document.documentElement.scrollHeight - height)

      ctx.clearRect(0, 0, width, height)
      ctx.save()
      ctx.globalAlpha = fadeIn

        // Shifting radial nebula following scroll depth
        const nebulaY = height * (0.3 + Math.sin(scrollRatio * Math.PI) * 0.4)
        const nebulaX = width * (0.72 - scrollRatio * 0.44)
        const g = ctx.createRadialGradient(nebulaX, nebulaY, 0, nebulaX, nebulaY, Math.max(width, height) * 0.55)
        g.addColorStop(0, "rgba(23, 117, 91, 0.16)")
        g.addColorStop(0.55, "rgba(10, 50, 40, 0.08)")
        g.addColorStop(1, "rgba(8, 17, 15, 0)")
        ctx.fillStyle = g
        ctx.fillRect(0, 0, width, height)

        // Subtle sweeping vertical/horizontal carrier wave
        ctx.beginPath()
        for (let y = 0; y <= height; y += 22) {
          const x =
            width * 0.86 +
            Math.sin(y * 0.008 + tick * 1.1) * 26 +
            Math.cos(y * 0.004 - scrollRatio * 6) * 18
          if (y === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = "rgba(112, 246, 210, 0.09)"
        ctx.lineWidth = 1
        ctx.stroke()

        // Drifting signal constellation nodes
        const maxDist = width <= 600 ? 75 : 110
        for (let i = 0; i < nodes.length; i++) {
          const p = nodes[i]
          p.x += p.vx * (1 + scrollBoost * 0.6)
          p.y += p.vy * (1 + scrollBoost * 0.6) - scrollBoost * 0.18
          if (p.x < 0) p.x = width
          if (p.x > width) p.x = 0
          if (p.y < 0) p.y = height
          if (p.y > height) p.y = 0

          const dx = pointerX - p.x
          const dy = pointerY - p.y
          const d = Math.hypot(dx, dy)
          if (d < 170 && d > 0) {
            p.x -= (dx / d) * (170 - d) * 0.003
            p.y -= (dy / d) * (170 - d) * 0.003
          }

          const nearPointer = d < 210
          const pulse = 0.6 + (Math.sin(tick * 2 + p.phase) + 1) * 0.25
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2)
          ctx.fillStyle = nearPointer ? "rgba(185, 255, 143, 0.78)" : "rgba(112, 246, 210, 0.45)"
          ctx.fill()

          for (let j = i + 1; j < nodes.length; j++) {
            const q = nodes[j]
            const dist = Math.hypot(p.x - q.x, p.y - q.y)
            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * (nearPointer ? 0.28 : 0.11)
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(q.x, q.y)
              ctx.strokeStyle = `rgba(112, 246, 210, ${alpha})`
              ctx.lineWidth = 0.7
              ctx.stroke()
            }
          }
        }
        ctx.restore()

      rafId = requestAnimationFrame(draw)
    }

    init()
    window.addEventListener("resize", init)
    window.addEventListener("pointermove", onPointer, { passive: true })
    window.addEventListener("scroll", onScrollCheck, { passive: true })
    if (window.scrollY >= height * 0.35) startDraw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", init)
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("scroll", onScrollCheck)
    }
  }, [reduce])

  return <canvas className="ambient-signal-canvas" ref={canvasRef} aria-hidden="true" />
}
