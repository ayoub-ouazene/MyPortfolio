// ─── PROJECTS ────────────────────────────────────────────────
export const projects = [
  {
    id: '01',
    emoji: '💼',
    title: 'QuickHire',
    tags: ['React', 'Tailwind', 'Express.js', 'PostgreSQL', 'Redis', 'Prisma'],
    desc: 'A full-stack platform connecting job-seekers with companies offering short-term & interim positions — the Algerian equivalent of mission-based work (CDDs, extras, seasonal contracts). Features real-time messaging, intelligent job search, AI-powered chatbot assistant, professional profile builder, and automated certificate delivery via email.',
    repo: 'https://github.com/ayoub-ouazene/QuickHire',
    live: null,
  },
  {
    id: '02',
    emoji: '🚀',
    title: 'DjisrUp',
    tags: ['Next.js', 'FastAPI', 'Express.js', 'PostgreSQL', 'Tailwind', 'AI'],
    desc: 'An intelligent investment platform bridging Algerian startups with the right investors. DjisrUp uses AI-powered smart matching based on sector, risk profile, and investment interest to surface high-fit opportunities. Startup profiles are auto-enhanced by AI for maximum professional presentation and investor appeal.',
    repo: 'https://github.com/ayoub-ouazene/DjisrUp',
    live: null,
  },
  {
    id: '03',
    emoji: '🔄',
    title: 'Skill Swapping',
    tags: ['FastAPI', 'RAG', 'Vector DB', 'PostgreSQL', 'OCR', 'LangChain'],
    desc: 'A peer-to-peer knowledge exchange platform where learners trade skills and expertise with one another. Powered by a RAG (Retrieval-Augmented Generation) system for intelligent course and resource recommendations, real-time chat, and an OCR-based document scanning pipeline for certificates and learning materials.',
    repo: 'https://github.com/ayoub-ouazene/Skill_swapping',
    live: null,
  },
  {
    id: '04',
    emoji: '🌾',
    title: 'AgroFund Algeria',
    tags: ['FastAPI', 'React', 'Tailwind', 'PostgreSQL', 'Prisma', 'AI'],
    desc: 'An agri-finance platform connecting Algerian farmers and landowners with investors. Uses AI-driven smart matching with embedded risk estimation algorithms to surface viable investment opportunities in agriculture. Designed to unlock private capital for Algeria\'s underbanked agricultural sector.',
    repo: 'https://github.com/ayoub-ouazene/AgrouFund_Algeria2.0',
    live: null,
  },
  {
    id: '05',
    emoji: '🅿️',
    title: 'Bee-Set',
    tags: ['Next.js', 'Express.js', 'PostGIS', 'PostgreSQL', 'QR Code', 'OCR'],
    desc: 'A smart urban parking platform that finds the nearest available parking spot in real time. Features include online payment via Guiddini Pay, license plate recognition via OCR, QR-code-based reservation, and map-based spatial search powered by graph and pathfinding algorithms on PostGIS.',
    repo: 'https://github.com/ayoub-ouazene/bee-set',
    live: null,
  },
  {
    id: '06',
    emoji: '🏥',
    title: 'MediConnect',
    tags: ['React', 'Node.js', 'MongoDB', 'Mongoose', 'REST API'],
    desc: 'A full-stack healthcare web platform connecting patients, doctors, nurses, and clinic administrators across Algeria. Streamlines appointment scheduling, clinic discovery, health record management, and secure inter-stakeholder communication — bringing digital innovation to local healthcare delivery.',
    repo: 'https://github.com/ayoub-ouazene/NIT-PROJECT',
    live: null,
  },
  {
    id: '07',
    emoji: '📚',
    title: 'Library Management System',
    tags: ['C++', 'Qt Framework', 'SQLite'],
    desc: 'A modern desktop application for library management built with C++ and the Qt framework. Manages books, members, and borrow/return workflows through a clean graphical interface with embedded SQLite storage. Features search, due-date tracking, and member management — all without a server dependency.',
    repo: 'https://github.com/ayoub-ouazene/Library-Management-System',
    live: null,
  },
];

// ─── SKILLS ──────────────────────────────────────────────────
export const skills = [
  {
    cat: 'Languages',
    title: 'Programming Languages',
    tags: ['Python', 'Java', 'C / C++', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    cat: 'Frontend',
    title: 'UI & Web Development',
    tags: ['React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Figma'],
  },
  {
    cat: 'Backend',
    title: 'Server & APIs',
    tags: ['FastAPI', 'Express.js', 'Node.js', 'Django', 'Flask', 'REST APIs', 'GraphQL'],
  },
  {
    cat: 'AI & Machine Learning',
    title: 'Artificial Intelligence & ML',
    tags: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face', 'LangChain',  'Ollama', 'Prompt Engineering'],
  },
  {
    cat: 'RAG & Vector Search',
    title: 'Retrieval-Augmented Generation',
    tags: ['LangChain', 'Chroma DB', 'Pinecone', 'FAISS', 'Embeddings', 'OCR', 'Document Parsing'],
  },
  {
    cat: 'Databases',
    title: 'Data Storage & ORM',
    tags: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'PostGIS', 'Prisma', 'Mongoose'],
  },
  {
    cat: 'Tools & DevOps',
    title: 'Infrastructure & Tooling',
    tags: ['Git / GitHub', 'Docker', 'Linux', 'Postman', 'VS Code', 'Vercel', 'Railway'],
  },
  {
    cat: 'CS Fundamentals',
    title: 'Computer Science Core',
    tags: ['Data Structures', 'Algorithms', 'OOP', 'Design Patterns', 'Graph Algorithms', 'System Design'],
  },
];

// ─── HACKATHONS ───────────────────────────────────────────────
export const hackathons = [
  {
    date: 'May 2025',
    title: 'Innov Digital',
    org: 'CSE Club & ProArchive Solutions',
    desc: 'An innovation-focused competition organized by CSE Club in partnership with ProArchive Solutions, challenging teams to design and prototype impactful digital products. Competed with a full-stack solution addressing a real-world business automation challenge.',
    badges: [{ label: 'Innovation Challenge', type: 'teal' }, { label: 'May 2025', type: 'teal' }],
  },
  {
    date: 'Mar 2026',
    title: 'Hogwarts Hackathon',
    org: 'Future Tech Club — Online',
    desc: 'A 3-day online hackathon organized by Future Tech Club, focused on building real-world solutions in the education technology space. Competed against teams from across Algeria to design an innovative EdTech platform — ranked among the top projects for its technical depth and UX.',
    badges: [{ label: '🏅 Top Projects', type: 'gold' }, { label: '48h Hackathon', type: 'teal' }, { label: 'EdTech Track', type: 'teal' }],
  },
  {
    date: 'Nov 2025',
    title: 'Algeria 2.0 Hackathon',
    org: 'National Hackathon — Algeria',
    desc: 'A prestigious national-level hackathon bringing together Algeria\'s top student developers and innovators. Competed in our problem track and secured 2nd place with AgroFund, a platform designed to connect farmers with investors through AI-powered matching and risk estimation.',
    badges: [{ label: '🥈 2nd Place', type: 'gold' }, { label: 'National Level', type: 'teal' }],
  },
  {
    date: 'Sep 2025',
    title: 'Future Caravan Hackathon',
    org: 'Djezzy Academy',
    desc: 'A 3-day hackathon organized by Djezzy Academy under the Future Caravan initiative, focused on smart city solutions. Built Bee-Set, a smart urban parking platform with real-time slot detection, QR-code reservation, and OCR-based license plate recognition — a complete end-to-end system delivered in 72 hours.',
    badges: [{ label: 'Smart Cities', type: 'teal' }, { label: '72h Hackathon', type: 'teal' }],
  },
  {
    date: 'Jul 2025',
    title: 'Djisr Nummuw Ideathon',
    org: 'Ministry of Youth — Algeria',
    desc: 'A national ideathon organized by the Algerian Ministry of Youth, bringing together young innovators to pitch solutions for economic growth and entrepreneurship. Presented DjisrUp, our AI-driven startup-investor matching platform, and secured 3rd place for its vision and technical feasibility.',
    badges: [{ label: '🥉 3rd Place', type: 'gold' }, { label: 'National Ideathon', type: 'teal' }],
  },
  {
    date: 'Jan 2026',
    title: 'AI Hackathon — Smart Cities',
    org: 'Ministry of Youth — Algeria',
    desc: 'A government-backed AI hackathon organized by the Algerian Ministry of Youth, themed around smart city challenges. Designed and prototyped an AI-powered urban solution targeting traffic, resource management, and digital public services — competing with teams from universities across the country.',
    badges: [{ label: 'AI Track', type: 'teal' }, { label: 'Smart Cities', type: 'teal' }],
  },
   {
    date: 'Jul 2025',
    title: 'NCS HACK',
    org: 'NIT CLUB — Algeria',
    desc: 'A 3-day hackathon organized by NCS HACK , web platform connecting patients, doctors, nurses, and clinic administrators across Algeria. Streamlines appointment scheduling, clinic discovery, health record management, and secure inter-stakeholder communication — bringing digital innovation to local healthcare delivery..',
    badges: [{ label: 'Dev Track', type: 'teal' }, { label: 'Smart Cities', type: 'teal' }],
  }
];

// ─── EDUCATION ───────────────────────────────────────────────
export const education = [
  {
    icon: '🎓',
    period: '2022 — Present',
    degree: "Bachelor's in Computer Science",
    school: 'École Nationale Supérieure d\'Informatique (ENSIA) — Algiers',
  },
];
