import { education } from '../data'

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <div className="reveal">
          <p className="section-tag">Academic Background</p>
          <h2 className="section-title">Education & <em>Formation</em></h2>
        </div>
        <div className="edu-grid reveal">
          {education.map((e, i) => (
            <div className="edu-card" key={i}>
              <div className="edu-icon">{e.icon}</div>
              <div>
                <div className="edu-period">{e.period}</div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-school">{e.school}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
