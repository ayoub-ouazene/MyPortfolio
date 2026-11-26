import { useEffect, useMemo, useRef, useState } from "react"

// Architecture links connecting AI & software engineering tools across domains & builds
const SKILL_META = {
  // Languages
  Python: {
    role: "Core language across FastAPI services, optimization solvers, data pipelines & PyTorch models.",
    links: ["FastAPI", "PyTorch", "LangGraph", "PostgreSQL"],
    usedIn: ["Kifi", "Discover Algiers", "LubriStock", "AgroFund"],
  },
  TypeScript: {
    role: "End-to-end type safety across React/Next.js frontends and Node/Express APIs.",
    links: ["Next.js", "React", "Express.js", "Prisma"],
    usedIn: ["QuickHire", "Bee-Set", "Orchestra"],
  },
  JavaScript: {
    role: "Interactive web interfaces, async event loops & full-stack Express/React apps.",
    links: ["React", "Node.js", "Express.js", "Next.js"],
    usedIn: ["QuickHire", "MediConnect", "Bee-Set"],
  },
  "C / C++": {
    role: "Systems programming, desktop software (Qt) & native edge inference runtimes.",
    links: ["llama.cpp", "Linux", "SQLite"],
    usedIn: ["Library Management", "Edge Runtimes"],
  },
  Java: {
    role: "Object-oriented software architecture, data structures & backend fundamentals.",
    links: ["SQL", "Git", "CI/CD"],
    usedIn: ["Software Engineering"],
  },
  SQL: {
    role: "Relational modeling, spatial queries (PostGIS), indexing & analytical aggregations.",
    links: ["PostgreSQL", "PostGIS", "SQLite", "Prisma"],
    usedIn: ["QuickHire", "Bee-Set", "Discover Algiers"],
  },

  // Web & APIs
  FastAPI: {
    role: "High-throughput async Python APIs serving ML models, RAG pipelines & solvers.",
    links: ["Python", "PostgreSQL", "Docker", "RAG"],
    usedIn: ["Kifi", "Discover Algiers", "DjisrUp", "AgroFund"],
  },
  "Express.js": {
    role: "REST & real-time Node.js backends for job markets, auth, and payment integrations.",
    links: ["Node.js", "Redis", "PostgreSQL", "Prisma"],
    usedIn: ["QuickHire", "Bee-Set", "DjisrUp"],
  },
  "Node.js": {
    role: "Event-driven server runtime powering real-time messaging and backend microservices.",
    links: ["Express.js", "TypeScript", "MongoDB", "Redis"],
    usedIn: ["QuickHire", "Bee-Set", "MediConnect"],
  },
  "Next.js": {
    role: "SSR/full-stack React applications shipped fast for production and 72h hackathons.",
    links: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    usedIn: ["Bee-Set", "DjisrUp"],
  },
  React: {
    role: "Component-driven interfaces, interactive maps (Leaflet) & motion-rich experiences.",
    links: ["TypeScript", "Next.js", "Tailwind CSS", "FastAPI"],
    usedIn: ["Discover Algiers", "QuickHire", "AgroFund", "MediConnect"],
  },
  Django: {
    role: "Batteries-included Python web framework for structured CRUD backends & admin flows.",
    links: ["Python", "PostgreSQL", "Docker"],
    usedIn: ["Web Backends"],
  },
  Flask: {
    role: "Lightweight Python microservices and rapid ML prototype endpoints.",
    links: ["Python", "FastAPI", "Postman"],
    usedIn: ["Hackathon Demos"],
  },
  "Tailwind CSS": {
    role: "Rapid utility-first UI styling and responsive design systems.",
    links: ["React", "Next.js", "TypeScript"],
    usedIn: ["QuickHire", "Discover Algiers", "DjisrUp", "AgroFund"],
  },
  "REST & GraphQL": {
    role: "Clean API contracts, OpenAPI schemas, pagination & client-server data fetching.",
    links: ["FastAPI", "Express.js", "Postman", "TypeScript"],
    usedIn: ["Kifi", "QuickHire", "MediConnect"],
  },

  // Databases & Cache
  PostgreSQL: {
    role: "Primary relational store with pgvector embeddings and PostGIS spatial queries.",
    links: ["FastAPI", "Prisma", "PostGIS", "Docker"],
    usedIn: ["Kifi", "Discover Algiers", "QuickHire", "Bee-Set"],
  },
  Redis: {
    role: "In-memory caching, session storage, rate limiting & pub/sub for real-time chat.",
    links: ["Express.js", "Node.js", "PostgreSQL", "Docker"],
    usedIn: ["QuickHire"],
  },
  MongoDB: {
    role: "Flexible document storage for healthcare records and rapid JSON schemas.",
    links: ["Node.js", "Express.js", "REST & GraphQL"],
    usedIn: ["MediConnect"],
  },
  PostGIS: {
    role: "Geospatial indexing and nearest-spot distance routing inside PostgreSQL.",
    links: ["PostgreSQL", "SQL", "Next.js"],
    usedIn: ["Bee-Set"],
  },
  SQLite: {
    role: "Zero-config embedded SQL storage for local desktop and lightweight apps.",
    links: ["C / C++", "Python", "SQL"],
    usedIn: ["Library Management", "Prototyping"],
  },
  Prisma: {
    role: "Type-safe ORM migrations and query builder for TypeScript/Node backends.",
    links: ["TypeScript", "PostgreSQL", "Express.js"],
    usedIn: ["QuickHire", "AgroFund"],
  },
  "Vector DBs": {
    role: "Semantic indexing with FAISS, Chroma, and pgvector for multi-tenant RAG retrieval.",
    links: ["RAG", "LangChain", "PostgreSQL", "FastAPI"],
    usedIn: ["Kifi", "Orchestra", "Skill Swap"],
  },

  // DevOps & Tooling
  Docker: {
    role: "Containerized multi-service stacks pairing APIs, databases, Redis & inference nodes.",
    links: ["Linux", "CI/CD", "PostgreSQL", "FastAPI"],
    usedIn: ["Kifi", "Orchestra", "Discover Algiers"],
  },
  Git: {
    role: "Branching workflows, conflict resolution & clean commit history across teams.",
    links: ["GitHub", "CI/CD", "Jira"],
    usedIn: ["All projects"],
  },
  GitHub: {
    role: "Pull requests, code reviews, issue tracking & automated Actions pipelines.",
    links: ["Git", "CI/CD", "Docker", "Vercel"],
    usedIn: ["All repositories"],
  },
  "CI/CD": {
    role: "Automated testing, linting, container builds & zero-downtime deployments.",
    links: ["GitHub", "Docker", "Vercel", "Linux"],
    usedIn: ["Production Deployments"],
  },
  Linux: {
    role: "Server administration, shell scripting, systemd & GPU/container environments.",
    links: ["Docker", "CI/CD", "CUDA", "vLLM"],
    usedIn: ["Deployments & Edge"],
  },
  Jira: {
    role: "Sprint planning, backlog triage & cross-team engineering delivery tracking.",
    links: ["Git", "GitHub", "CI/CD"],
    usedIn: ["Team Engineering"],
  },
  Postman: {
    role: "API endpoint testing, auth header debugging & automated collection checks.",
    links: ["REST & GraphQL", "Swagger", "FastAPI", "Express.js"],
    usedIn: ["QuickHire", "Kifi", "Discover Algiers"],
  },
  Swagger: {
    role: "Interactive OpenAPI documentation and live schema testing for backend endpoints.",
    links: ["FastAPI", "REST & GraphQL", "Postman"],
    usedIn: ["Kifi", "Discover Algiers", "AgroFund"],
  },
  Render: {
    role: "Cloud deployment for FastAPI, Node backends, background services & PostgreSQL.",
    links: ["Docker", "FastAPI", "PostgreSQL", "CI/CD"],
    usedIn: ["Discover Algiers"],
  },
  Vercel: {
    role: "Instant preview deployments and edge hosting for React and Next.js frontends.",
    links: ["Next.js", "React", "GitHub", "CI/CD"],
    usedIn: ["Portfolio", "Web Frontends"],
  },

  // AI & Agents
  RAG: {
    role: "Multi-tenant retrieval pipelines grounded on company docs and learning corpora.",
    links: ["LangChain", "Vector DBs", "FastAPI", "PostgreSQL"],
    usedIn: ["Kifi", "Orchestra", "Skill Swap"],
  },
  LangChain: {
    role: "Composable tool-calling chains, retrieval orchestration & prompt routing.",
    links: ["RAG", "LangGraph", "Python", "FastAPI"],
    usedIn: ["LubriStock", "Skill Swap", "Kifi"],
  },
  LangGraph: {
    role: "Stateful multi-agent graphs with human-in-the-loop checkpoints & web tools.",
    links: ["LangChain", "RAG", "Python", "FastAPI"],
    usedIn: ["LubriStock", "Orchestra"],
  },
  LlamaIndex: {
    role: "Structured document indexing and query engines over mixed corpora.",
    links: ["RAG", "Vector DBs", "Python"],
    usedIn: ["Kifi", "Orchestra"],
  },
  "Hugging Face": {
    role: "Open-weights model hub, tokenizers, and fine-tuning pipelines.",
    links: ["PEFT", "PyTorch", "vLLM"],
    usedIn: ["Kifi", "AI Research"],
  },
  PEFT: {
    role: "Parameter-efficient LoRA / QLoRA adaptation on constrained GPUs.",
    links: ["Hugging Face", "PyTorch", "INT8 / FP16", "CUDA"],
    usedIn: ["Model Fine-Tuning"],
  },
  "Computer vision": {
    role: "OCR scanning, satellite road segmentation & attention-based visual models.",
    links: ["OpenCV", "PyTorch", "CUDA"],
    usedIn: ["Bee-Set", "Skill Swap", "AI Real Camp"],
  },
  NLP: {
    role: "Multilingual Darija/Arabizi understanding, NER privacy filters & semantic matching.",
    links: ["RAG", "Hugging Face", "LangChain"],
    usedIn: ["Kifi", "CIC Datathon", "Orchestra"],
  },
  "Time series": {
    role: "Forecasting water levels, ransomware burn-rates & daily operational demand.",
    links: ["XGBoost", "LightGBM", "Python"],
    usedIn: ["ODYSSEA", "CIC Datathon", "AI Fest"],
  },

  // Models & Edge
  PyTorch: {
    role: "Primary deep-learning training, segmentation & attention research framework.",
    links: ["CUDA", "OpenCV", "PEFT", "Computer vision"],
    usedIn: ["AI Real Camp", "Vision Models"],
  },
  TensorFlow: {
    role: "Neural network prototyping and cross-platform model export.",
    links: ["Python", "scikit-learn", "Computer vision"],
    usedIn: ["Kaggle", "Competitions"],
  },
  "scikit-learn": {
    role: "Feature engineering, baselines, clustering & cross-validation metrics.",
    links: ["XGBoost", "Python", "Time series"],
    usedIn: ["CIC Datathon", "AI Fest"],
  },
  XGBoost: {
    role: "Gradient-boosted trees for imbalanced tabular competitions & risk scoring.",
    links: ["LightGBM", "CatBoost", "Time series"],
    usedIn: ["CIC Datathon", "AI Fest", "AgroFund"],
  },
  LightGBM: {
    role: "Fast histogram-based boosting on large imbalanced datasets.",
    links: ["XGBoost", "CatBoost", "scikit-learn"],
    usedIn: ["CIC Datathon", "AI Fest"],
  },
  CatBoost: {
    role: "Categorical-native boosting for CRM pipeline stages and churn tables.",
    links: ["XGBoost", "LightGBM", "scikit-learn"],
    usedIn: ["AI Fest · ICOSNET"],
  },
  OpenCV: {
    role: "Plate cropping, document preprocessing & frame-level image pipelines.",
    links: ["Computer vision", "PyTorch", "Python"],
    usedIn: ["Bee-Set", "Skill Swap", "AI Real Camp"],
  },
  CUDA: {
    role: "GPU-accelerated tensor training and high-throughput inference serving.",
    links: ["PyTorch", "vLLM", "Linux"],
    usedIn: ["Training & Serving"],
  },
  vLLM: {
    role: "High-throughput PagedAttention serving for production open LLMs.",
    links: ["INT8 / FP16", "CUDA", "Docker", "Linux"],
    usedIn: ["Kifi", "Orchestra"],
  },
  "llama.cpp": {
    role: "CPU/GPU local inference runtime for quantized GGUF models.",
    links: ["C / C++", "INT8 / FP16", "Ollama"],
    usedIn: ["Edge Inference"],
  },
  Ollama: {
    role: "Local LLM orchestration for offline agents and privacy-first builds.",
    links: ["llama.cpp", "LangGraph", "Linux"],
    usedIn: ["LubriStock", "Local Agents"],
  },
  "INT8 / FP16": {
    role: "Quantization and half-precision inference cutting memory and latency.",
    links: ["vLLM", "llama.cpp", "CUDA"],
    usedIn: ["Edge Inference"],
  },
}

export default function ToolkitLab({ kit, onJumpToWork, reduce }) {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const nodeRefs = useRef({})
  const [activeDomain, setActiveDomain] = useState("All")
  const [selectedSkill, setSelectedSkill] = useState("FastAPI")
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const allSkills = useMemo(
    () =>
      kit.flatMap((group, gIdx) =>
        group.items.map((item, iIdx) => ({
          name: item,
          domain: group.name,
          ring: gIdx % 3,
          index: iIdx,
        }))
      ),
    [kit]
  )

  const activeFocusSkill = hoveredSkill || selectedSkill
  const focusMeta = SKILL_META[activeFocusSkill] || {
    role: "Core production module in Ayoub’s AI & software stack.",
    links: [],
    usedIn: ["Portfolio builds"],
  }
  const relatedSet = useMemo(() => new Set(focusMeta.links || []), [focusMeta])

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !stage || !ctx) return

    let rafId = 0
    let tick = 0
    let visible = false

    const drawLinks = () => {
      tick += 0.03
      const rect = stage.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
        canvas.width = Math.round(rect.width * dpr)
        canvas.height = Math.round(rect.height * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, rect.width, rect.height)

      const sourceEl = nodeRefs.current[activeFocusSkill]
      if (sourceEl) {
        const sRect = sourceEl.getBoundingClientRect()
        const sx = sRect.left - rect.left + sRect.width / 2
        const sy = sRect.top - rect.top + sRect.height / 2

        const halo = ctx.createRadialGradient(sx, sy, 2, sx, sy, 90)
        halo.addColorStop(0, "rgba(112, 246, 210, 0.16)")
        halo.addColorStop(1, "rgba(112, 246, 210, 0)")
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(sx, sy, 90, 0, Math.PI * 2)
        ctx.fill()

        ;(focusMeta.links || []).forEach((targetName, idx) => {
          const targetEl = nodeRefs.current[targetName]
          if (!targetEl) return
          const tRect = targetEl.getBoundingClientRect()
          const tx = tRect.left - rect.left + tRect.width / 2
          const ty = tRect.top - rect.top + tRect.height / 2

          const mx = (sx + tx) / 2
          const my = (sy + ty) / 2 - (idx % 2 === 0 ? 28 : -28)

          ctx.beginPath()
          ctx.moveTo(sx, sy)
          ctx.quadraticCurveTo(mx, my, tx, ty)
          ctx.strokeStyle = "rgba(112, 246, 210, 0.42)"
          ctx.lineWidth = 1.25
          ctx.stroke()

          if (!reduce) {
            const p = (tick * 0.55 + idx * 0.25) % 1
            const inv = 1 - p
            const px = inv * inv * sx + 2 * inv * p * mx + p * p * tx
            const py = inv * inv * sy + 2 * inv * p * my + p * p * ty
            ctx.beginPath()
            ctx.arc(px, py, 2.5, 0, Math.PI * 2)
            ctx.fillStyle = "#b9ff8f"
            ctx.fill()
          }
        })
      }

      if (!reduce && visible) {
        rafId = requestAnimationFrame(drawLinks)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true
          drawLinks()
        } else {
          visible = false
          cancelAnimationFrame(rafId)
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(stage)

    const onResize = () => drawLinks()
    window.addEventListener("resize", onResize)

    return () => {
      visible = false
      observer.disconnect()
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", onResize)
    }
  }, [activeFocusSkill, activeDomain, focusMeta, reduce])

  return (
    <div className="constellation-lab">
      <div className="constellation-bar">
        <div className="constellation-filters" role="tablist" aria-label="Filter skill orbit by domain">
          <button
            type="button"
            role="tab"
            aria-selected={activeDomain === "All"}
            className={`constellation-pill ${activeDomain === "All" ? "is-active" : ""}`}
            onClick={() => setActiveDomain("All")}
          >
            <span className="live-dot" />
            All signal lanes
            <small>{allSkills.length}</small>
          </button>
          {kit.map((group) => (
            <button
              key={group.name}
              type="button"
              role="tab"
              aria-selected={activeDomain === group.name}
              className={`constellation-pill ${activeDomain === group.name ? "is-active" : ""}`}
              onClick={() => {
                setActiveDomain(group.name)
                if (!group.items.includes(selectedSkill)) {
                  setSelectedSkill(group.items[0])
                }
              }}
            >
              {group.name}
              <small>{group.items.length}</small>
            </button>
          ))}
        </div>

        <span className="constellation-hint">HOVER OR SELECT ANY NODE TO TRACE LINKS</span>
      </div>

      <div className="constellation-stage" ref={stageRef}>
        <canvas className="constellation-canvas" ref={canvasRef} aria-hidden="true" />
        <div className="constellation-orbit constellation-orbit-a" aria-hidden="true" />
        <div className="constellation-orbit constellation-orbit-b" aria-hidden="true" />

        <div className="constellation-lanes">
          {kit.map((group, laneIdx) => {
            const laneActive = activeDomain === "All" || activeDomain === group.name
            return (
              <div
                key={group.name}
                className={`signal-lane signal-lane-${laneIdx % 3} ${laneActive ? "is-focused" : "is-dimmed"}`}
              >
                <div className="signal-lane-label">
                  <span>0{laneIdx + 1}</span>
                  <b>{group.name}</b>
                </div>
                <div className="signal-lane-stream">
                  {group.items.map((item) => {
                    const isSelected = activeFocusSkill === item
                    const isLinked = relatedSet.has(item)
                    return (
                      <button
                        key={item}
                        ref={(el) => {
                          nodeRefs.current[item] = el
                        }}
                        type="button"
                        className={`orbit-node ${isSelected ? "is-selected" : ""} ${isLinked ? "is-linked" : ""}`}
                        onClick={() => setSelectedSkill(item)}
                        onMouseEnter={() => setHoveredSkill(item)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <span className="orbit-node-pulse" />
                        <span>{item}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="constellation-dock" aria-live="polite">
        <div className="dock-primary">
          <div className="dock-kicker">
            <span className="live-dot" />
            <span>
              {allSkills.find((s) => s.name === activeFocusSkill)?.domain || "SYSTEM"} // ACTIVE NODE
            </span>
          </div>
          <h3>{activeFocusSkill}</h3>
          <p>{focusMeta.role}</p>
        </div>

        <div className="dock-links">
          <small>NEURAL LINKS</small>
          <div className="dock-chips">
            {(focusMeta.links || []).map((link) => (
              <button
                key={link}
                type="button"
                className="dock-link-btn"
                onClick={() => {
                  setActiveDomain("All")
                  setSelectedSkill(link)
                }}
              >
                ↳ {link}
              </button>
            ))}
          </div>
        </div>

        <div className="dock-builds">
          <small>DEPLOYED IN</small>
          <div className="dock-tags">
            {(focusMeta.usedIn || []).map((place) => (
              <span key={place}>{place}</span>
            ))}
          </div>
          {onJumpToWork && (
            <button type="button" className="dock-work-link" onClick={onJumpToWork}>
              Inspect builds ↑
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
