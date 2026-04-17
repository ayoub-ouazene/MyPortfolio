import { hackathons } from '../data'

export default function Hackathons() {
  return (
    <section id="hackathons">
      <div className="container">
        <div className="reveal">
          <p className="section-tag">Battle-Tested</p>
          <h2 className="section-title">Hackathons & <em>Competitions</em></h2>
        </div>

        <div className="timeline reveal">
          {hackathons.map((h, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-date">{h.date}</div>
              <div className="tl-body">
                <div className="tl-event-title">{h.title}</div>
                <div className="tl-org">{h.org}</div>
                <p className="tl-desc">{h.desc}</p>
                <div className="tl-badges">
                  {h.badges.map((b, j) => (
                    <span className={`tl-badge badge-${b.type}`} key={j}>{b.label}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
