export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="reveal about-grid">
          <div className="about-text">
            <p className="section-tag">About Me</p>
            <h2 className="section-title">Building software from <em>zero to production</em></h2>

            <p>
              Hello! I'm <strong>Ayoub Ouazene</strong>, a Computer Science student at ENSIA (École Nationale 
              Supérieure d'Informatique) in Algiers. I build <strong>end-to-end software and web-based solutions</strong> — 
              owning every stage from design & prototyping, through frontend and backend engineering, all the way to 
              AI integration and deployment.
            </p>

            <p>
              My AI experience goes beyond plug-and-play: I design and implement <strong>RAG (Retrieval-Augmented 
              Generation) pipelines</strong>, work with vector databases for semantic search, integrate LLMs via 
              LangChain and the OpenAI API, and build AI features that are genuinely embedded in product logic — 
              not just bolted on. From smart matching algorithms to AI-powered document parsing and OCR, I treat 
              artificial intelligence as a core engineering layer.
            </p>

            <p>
              On the product side, I have shipped platforms covering healthtech, fintech, agritech, smart cities, 
              and EdTech — all built with real users in mind. I thrive in hackathon environments, having competed 
              in <strong>6+ national competitions</strong> and placed in several of them.
            </p>

            <div className="about-ai-tag">
              🤖 AI Integration Specialist · RAG · LLMs · Vector Search
            </div>
          </div>

          <div className="about-facts">
            <div className="fact-item">
              <div className="fact-icon">📍</div>
              <div>
                <div className="fact-label">Location</div>
                <div className="fact-val">Algeria 🇩🇿 — Open to remote worldwide</div>
              </div>
            </div>
            <div className="fact-item">
              <div className="fact-icon">🎓</div>
              <div>
                <div className="fact-label">Education</div>
                <div className="fact-val">CS Engineering — ENSIA, Algiers</div>
              </div>
            </div>
            <div className="fact-item">
              <div className="fact-icon">🤖</div>
              <div>
                <div className="fact-label">AI Focus</div>
                <div className="fact-val">RAG Systems · LLM Integration · Smart Matching</div>
              </div>
            </div>
            <div className="fact-item">
              <div className="fact-icon">💻</div>
              <div>
                <div className="fact-label">Stack</div>
                <div className="fact-val">Full-Stack · FastAPI · Next.js · PostgreSQL</div>
              </div>
            </div>
            <div className="fact-item">
              <div className="fact-icon">⚡</div>
              <div>
                <div className="fact-label">Currently</div>
                <div className="fact-val">Building impactful products & open to internships</div>
              </div>
            </div>
            {/* Add your CV link below */}
            <a href="/cv.pdf" className="btn btn-outline" style={{marginTop:'.5rem', width:'fit-content'}}>
              Download CV ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
