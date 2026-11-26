import { useMemo, useState } from "react"

const FILTERS = ["Featured", "Podiums", "Datathons", "Hackathons"]

export default function FieldDeck({ field }) {
  const [filter, setFilter] = useState("Featured")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filtered = useMemo(() => {
    if (filter === "Podiums") return field.filter((item) => item.podium)
    if (filter === "Datathons") return field.filter((item) => item.category === "Datathon")
    if (filter === "Hackathons") return field.filter((item) => item.category === "Hackathon")
    return field
  }, [field, filter])

  const safeIndex = Math.min(selectedIndex, Math.max(0, filtered.length - 1))
  const current = filtered[safeIndex] || field[0]

  const step = (dir) => {
    if (!filtered.length) return
    setSelectedIndex((safeIndex + dir + filtered.length) % filtered.length)
  }

  return (
    <div className="field-deck">
      {/* Filter & Telemetry Header */}
      <div className="field-deck-bar">
        <div className="field-filters" role="tablist" aria-label="Filter competitions">
          {FILTERS.map((tab) => {
            const count =
              tab === "Featured"
                ? `${field.length}/10+`
                : tab === "Podiums"
                  ? String(field.filter((i) => i.podium).length).padStart(2, "0")
                  : tab === "Datathons"
                    ? String(field.filter((i) => i.category === "Datathon").length).padStart(2, "0")
                    : String(field.filter((i) => i.category === "Hackathon").length).padStart(2, "0")
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={filter === tab}
                className={`constellation-pill ${filter === tab ? "is-active" : ""}`}
                onClick={() => {
                  setFilter(tab)
                  setSelectedIndex(0)
                }}
              >
                {tab === "Featured" && <span className="live-dot" />}
                {tab}
                <small>{count}</small>
              </button>
            )
          })}
        </div>

        <div className="field-nav-controls">
          <span>
            {String(safeIndex + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => step(-1)} aria-label="Previous event">
            ←
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next event">
            →
          </button>
        </div>
      </div>

      {/* Compact 2-part Innovative Stage: Spotlight + Selectable Radar Grid */}
      <div className="field-deck-stage">
        <article className="field-spotlight" key={current.title}>
          <div className="field-spotlight-orbit" aria-hidden="true" />
          <div className="field-spotlight-top">
            <span className="field-badge-cat">
              <i className="live-dot" /> {current.category} // {current.when}
            </span>
            <span className={`field-badge-mark ${current.podium ? "is-podium" : ""}`}>
              {current.mark}
            </span>
          </div>

          <h3>{current.title}</h3>
          <p>{current.detail}</p>

          <div className="field-spotlight-foot">
            <div className="field-progress">
              <span
                style={{
                  transform: `scaleX(${(safeIndex + 1) / Math.max(1, filtered.length)})`,
                }}
              />
            </div>
          </div>
        </article>

        <div className="field-matrix-tiles" role="listbox" aria-label="Competition selector">
          {filtered.map((row, idx) => {
            const active = idx === safeIndex
            return (
              <button
                key={row.title}
                type="button"
                role="option"
                aria-selected={active}
                className={`field-tile ${active ? "is-active" : ""} ${row.podium ? "is-podium" : ""}`}
                onClick={() => setSelectedIndex(idx)}
              >
                <div className="field-tile-top">
                  <small>{row.when}</small>
                  <span className="field-tile-mark">{row.mark}</span>
                </div>
                <b>{row.title}</b>
                <i>{row.category}</i>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
