export const person = {
  name: 'Ayoub Ouazene',
  first: 'Ayoub',
  last: 'Ouazene',
  role: 'AI Developer & Software Engineer',
  location: 'Algiers, Algeria',
  email: 'ayoub.ouazene@ensia.edu.dz',
  github: 'https://github.com/ayoub-ouazene',
  linkedin: 'https://www.linkedin.com/in/ayoub-ouazene-2369a531b/',
  kaggle: 'https://www.kaggle.com/ayoub1ouazene',
}

export const chapters = [
  { id: 'index', label: 'Index', num: '00' },
  { id: 'practice', label: 'Practice', num: '01' },
  { id: 'work', label: 'Selected work', num: '02' },
  { id: 'field', label: 'In the field', num: '03' },
  { id: 'stack', label: 'Toolkit', num: '04' },
  { id: 'desk', label: 'The desk', num: '05' },
]

export const practice = [
  {
    period: 'Oct 2026 — now',
    place: 'SRC · SecAI Research Camp',
    role: 'AI Research',
    note: 'Vision Transformers on children’s Arabic handwriting, looking for visual patterns tied to attention. Attention maps and stroke-level preprocessing, not a black-box score.',
  },
  {
    period: 'Sep 2026 — now',
    place: 'Bricoram',
    role: 'ML / AI Developer',
    note: 'An intelligent dispatch system. Machine learning and recommendation logic decide how service requests get routed and matched.',
  },
  {
    period: '2025 — now',
    place: 'Independent',
    role: 'AI & Software',
    note: 'Shipped OCR scanning, automated risk estimation, and multi-step agents that call tools and finish a workflow — on web and mobile.',
  },
]

export const films = [
  {
    num: '01',
    title: 'Kifi',
    kind: 'Lead · conversational AI',
    line: 'A persona engine that writes the way a person actually talks — Darija, Arabizi, and the mix of Arabic, French, Tamazight, and English.',
    body: 'Multi-tenant RAG, NER privacy filters, and a human-in-the-loop path that escalates into Telegram. Exposed as a developer REST API on FastAPI, PostgreSQL, and a vector store.',
    href: null,
    tags: ['FastAPI', 'RAG', 'NER', 'PostgreSQL']
  },
  {
    num: '02',
    title: 'Orchestra',
    kind: 'Multi-agent platform',
    line: 'Companies onboard their own operations. Requests land on the department agent that should answer them.',
    body: 'Agents share a RAG knowledge base, enforce policy, hand work across teams, and stop for a human when the decision is not theirs to make.',
    href: 'https://github.com/ayoub-ouazene/Enterprise-Multi-Agent-Platform',
    tags: ['Multi-agent', 'RAG', 'Policy', 'HITL'],
  },
  {
    num: '03',
    title: 'MiniTorch',
    kind: 'From scratch',
    line: 'A small deep-learning library written without borrowing PyTorch’s engine.',
    body: 'Tensors, a reverse-mode autograd graph, layers, and optimizers. Built to understand the machinery, then use it.',
    href: null,
    tags: ['Autograd', 'Tensors', 'Python'],
  },
  {
    num: '04',
    title: 'AutoLube',
    kind: 'LangGraph agent',
    line: 'Reads a vehicle, names the exact oil, gearbox fluid, and filter, then checks what is actually on the shelf.',
    body: 'LangChain and LangGraph with live web search, matched against a local inventory so the recommendation is buyable, not theoretical.',
    href: 'https://github.com/ayoub-ouazene/LubriStock',
    tags: ['LangGraph', 'Tools', 'Search'],
  },
  {
    num: '05',
    title: 'QuickHire',
    kind: 'Product · Algeria',
    line: 'Short missions, extras, seasonal contracts — a hiring desk for work that is not a permanent post.',
    body: 'Real-time messaging, search, a chat assistant, profile building, and certificates sent by email.',
    href: 'https://github.com/ayoub-ouazene/QuickHire',
    tags: ['React', 'Express', 'PostgreSQL', 'Prisma'],
  },
  {
    num: '06',
    title: 'DjisrUp',
    kind: 'Investment matching',
    line: 'Startups and investors in the same room, sorted by sector, risk, and actual interest.',
    body: 'Profiles are rewritten by the model so a founder shows up clearly. Matching is the product, not a filter sidebar.',
    href: 'https://github.com/ayoub-ouazene/DjisrUp',
    tags: ['Next.js', 'FastAPI', 'AI'],
  },
  {
    num: '07',
    title: 'AgroFund',
    kind: '2nd · Algeria 2.0',
    line: 'Private capital for farms that banks do not reach.',
    body: 'Farmers and landowners meet investors through matching plus a risk estimate baked into the ranking.',
    href: 'https://github.com/ayoub-ouazene/AgrouFund_Algeria2.0',
    tags: ['FastAPI', 'React', 'Risk'],
  },
  {
    num: '08',
    title: 'Bee-Set',
    kind: '72h · Djezzy',
    line: 'The nearest free parking bay, reserved before you arrive.',
    body: 'PostGIS search, Guiddini Pay, plate OCR, and a QR that holds the spot. Built as a complete loop in three days.',
    href: 'https://github.com/ayoub-ouazene/bee-set',
    tags: ['Next.js', 'PostGIS', 'OCR'],
  },
  {
    num: '09',
    title: 'Skill Swap',
    kind: 'Knowledge exchange',
    line: 'People trade what they know. The system suggests the next useful thing to learn.',
    body: 'RAG over courses, live chat, and OCR for certificates and notes.',
    href: 'https://github.com/ayoub-ouazene/Skill_swapping',
    tags: ['FastAPI', 'RAG', 'OCR'],
  },
  {
    num: '10',
    title: 'MediConnect',
    kind: 'Care network',
    line: 'Patients, doctors, nurses, and clinic desks on one schedule.',
    body: 'Appointments, clinic discovery, records, and messages between the people who actually share a case.',
    href: 'https://github.com/ayoub-ouazene/NIT-PROJECT',
    tags: ['React', 'Node', 'MongoDB'],
  },
]

export const field = [
  {
    when: '2026',
    title: 'CIC Cybersecurity Datathon',
    mark: '1st',
    detail: 'Three models in one sitting: ransomware burn-rate from a 60-second window, a 15-class SOC detector under brutal imbalance, and CVE severity read straight from the write-up.',
  },
  {
    when: '2026',
    title: 'AI Fest · GDG ENSIA',
    mark: 'Three tracks',
    detail: 'Plasmo bioactivity from SMILES. Two ICOSNET CRM models — rare pipeline stages and churn. BNP cafeteria demand, so the kitchen cooks what will actually be eaten.',
  },
  {
    when: '2026',
    title: 'ODYSSEA · Skill&Tell',
    mark: 'Forecast + opt.',
    detail: 'Rhine water levels first, then barge routes, departure times, and cargo loads under constraints you cannot ignore.',
  },
  {
    when: '2025',
    title: 'AI Real Camp · School of AI',
    mark: 'Segmentation',
    detail: 'Roads pulled out of aerial and satellite frames — a full semantic segmentation pipeline, not a bounding-box demo.',
  },
  {
    when: 'Nov 2025',
    title: 'Algeria 2.0',
    mark: '2nd',
    detail: 'National hackathon. AgroFund took second: farmers, investors, and a risk score that changed who got introduced.',
  },
  {
    when: 'Jul 2025',
    title: 'Djisr Nummuw Ideathon',
    mark: '3rd',
    detail: 'Ministry of Youth. DjisrUp placed third for a matching idea that could actually be built.',
  },
  {
    when: 'Sep 2025',
    title: 'Future Caravan · Djezzy',
    mark: '72 hours',
    detail: 'Smart-city brief. Bee-Set left the room with maps, payments, OCR, and a reservation that worked.',
  },
  {
    when: 'Mar 2026',
    title: 'Hogwarts Hackathon',
    mark: 'Top projects',
    detail: 'Three days online with Future Tech Club. EdTech, ranked with the projects people kept talking about.',
  },
  {
    when: 'May 2025',
    title: 'Innov Digital',
    mark: 'CSE × ProArchive',
    detail: 'A business-automation prototype, designed and shipped with the club and an industry partner.',
  },
  {
    when: '2024 — 26',
    title: 'Hackathon circuit',
    mark: 'Lead AI',
    detail: 'Across NCS HACK, a Ministry smart-cities brief, and other 24–48h rooms: models, vision, and the API that let the team demo.',
  },
]

export const kit = [
  {
    name: 'Modeling',
    items: ['Computer vision', 'NLP', 'Time series', 'Anomaly detection', 'Recommenders', 'Metaheuristics & CSP'],
  },
  {
    name: 'Networks',
    items: ['Transformers & ViT', 'CNN', 'RNN / LSTM', 'Detection', 'Segmentation'],
  },
  {
    name: 'Agents',
    items: ['RAG', 'LangChain', 'LangGraph', 'LlamaIndex', 'Hugging Face', 'PEFT'],
  },
  {
    name: 'On device',
    items: ['vLLM', 'llama.cpp', 'Ollama', 'GGUF', 'INT8 / FP16', 'Distillation', 'Pruning'],
  },
  {
    name: 'Libraries',
    items: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'XGBoost', 'LightGBM', 'CatBoost', 'OpenCV', 'CUDA'],
  },
  {
    name: 'Software',
    items: ['Python', 'C / C++', 'TypeScript', 'FastAPI', 'React', 'Next.js', 'Node', 'PostgreSQL', 'Docker', 'Linux'],
  },
]

export const schooling = {
  school: 'National School of Artificial Intelligence',
  short: 'ENSIA',
  degree: 'Engineering degree, Artificial Intelligence & Data Science',
  years: '2024 — 2029',
  city: 'Algiers',
}

export const paper = [
  'Machine Learning Specialization — DeepLearning.AI, Andrew Ng',
  'Deep Learning Specialization — DeepLearning.AI, Andrew Ng',
  'Kaggle: Machine Learning, Deep Learning, Computer Vision, Time Series',
]

export const rooms = [
  'AI workshops for high-school students with Upgraderz Club and the Youth House of Dar El Beida.',
  'Talks and hands-on sessions inside the AI Journey with ETC Club.',
]
