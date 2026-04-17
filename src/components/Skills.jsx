import { skills } from '../data'

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <div className="reveal">
          <p className="section-tag">What I Know</p>
          <h2 className="section-title">Skills & <em>Technologies</em></h2>
        </div>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div className="skill-card reveal" key={i}>
              <div className="skill-cat">{s.cat}</div>
              <div className="skill-cat-title">{s.title}</div>
              <div className="skill-tags">
                {s.tags.map((t) => (
                  <span className="skill-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
