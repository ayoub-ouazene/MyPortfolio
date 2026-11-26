import { useEffect, useRef, useState } from "react"

export default function ScrollRail({ chapters, activeChapter, onNavigate }) {
  const trackRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [chapterOffsets, setChapterOffsets] = useState([])
  const [dragging, setDragging] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(-1)

  useEffect(() => {
    const computeOffsets = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const list = chapters.map((c) => {
        const el = document.getElementById(c.id)
        if (!el) return 0
        const rect = el.getBoundingClientRect()
        const top = rect.top + window.scrollY
        return Math.min(1, Math.max(0, top / maxScroll))
      })
      setChapterOffsets(list)
    }

    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll))
      setProgress(ratio)
    }

    computeOffsets()
    onScroll()

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", computeOffsets)
    const timer = setTimeout(computeOffsets, 600)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", computeOffsets)
    }
  }, [chapters])

  const scrubToClientY = (clientY) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height))
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    window.scrollTo({ top: ratio * maxScroll, behavior: "auto" })
  }

  useEffect(() => {
    if (!dragging) return
    const onMove = (e) => scrubToClientY(e.clientY)
    const onUp = () => setDragging(false)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [dragging])

  const activeObj = chapters[activeChapter] || chapters[0]

  return (
    <aside
      className={`scroll-rail ${dragging ? "is-dragging" : ""}`}
      aria-label="Page scroll indicator and section navigation"
    >
      <div className="scroll-rail-readout">
        <span className="scroll-rail-num">{activeObj?.num || "00"}</span>
        <span className="scroll-rail-pct">{String(Math.round(progress * 100)).padStart(2, "0")}%</span>
      </div>

      <div
        className="scroll-rail-track"
        ref={trackRef}
        onPointerDown={(e) => {
          setDragging(true)
          scrubToClientY(e.clientY)
        }}
        role="slider"
        aria-label="Scroll position"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        tabIndex={0}
      >
        <div
          className="scroll-rail-fill"
          style={{ transform: `scaleY(${Math.max(0.015, progress)})` }}
        />

        <div
          className="scroll-rail-head"
          style={{ top: `${progress * 100}%` }}
        >
          <span className="scroll-rail-head-core" />
          <span className="scroll-rail-head-tick" />
        </div>

        {chapters.map((chapter, idx) => {
          const pos = chapterOffsets[idx] ?? idx / Math.max(1, chapters.length - 1)
          const isPassed = progress >= pos - 0.02
          const isCurrent = activeChapter === idx
          return (
            <button
              key={chapter.id}
              type="button"
              className={`scroll-rail-node ${isPassed ? "is-passed" : ""} ${isCurrent ? "is-current" : ""}`}
              style={{ top: `${pos * 100}%` }}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(-1)}
              onClick={() => onNavigate?.(chapter.id)}
              aria-label={`Jump to ${chapter.label}`}
            >
              <span className="scroll-rail-dot" />
              <span className={`scroll-rail-tip ${hoveredIdx === idx || isCurrent ? "is-visible" : ""}`}>
                <b>{chapter.num}</b> {chapter.label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="scroll-rail-foot" aria-hidden="true">
        <span className="live-dot" />
      </div>
    </aside>
  )
}
