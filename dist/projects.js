// Add an MP4/WebM path to video to enable hover playback and the case-study player.
// Keep video empty to show the poster. Poster labels distinguish concepts from screenshots.
export const projects = [
  {
    id: 'ripple', number: '01', title: 'Ripple', category: 'Multi-agent AI · Full-stack',
    tagline: 'A rehearsal audience for your next big idea.',
    status: 'In development', color: '#b9a1ea',
    stack: ['React', 'Python', 'FastAPI', 'LangGraph', 'PostgreSQL', 'Docker'],
    poster: 'assets/ripple-landing.png', posterLabel: 'App screenshot', video: '',
    github: 'https://github.com/Sarayu30/Ripple/tree/version_2', live: 'https://ripple-rust-phi.vercel.app',
    overview: 'An AI audience simulation platform that explores how different synthetic viewers might respond to short-form content. Independent persona agents turn individual reactions into an interactive audience map and evidence-grounded content recommendations.',
    contribution: 'Built a full-stack simulation experience with independent persona agents, skill-based tool selection, resumable workflows, and a reporting pipeline. The project brings together agent orchestration, visual exploration, and content comparison.',
    features: ['Independent AI persona evaluations with evidence references', 'Interactive 2D and 3D audience maps', 'Six-stage LangGraph analysis with resumable checkpoints', 'Saved simulations, follow-up questions, and version comparison'],
    engineering: 'Keeping agent outputs inspectable and workflows resumable while presenting disagreement between audience personas in a useful visual interface.',
    note: 'Audience reactions are AI simulations, not real engagement analytics or predictions of human behavior. The preview uses labeled documentation fixtures.'
  },
  {
    id: 'flexiflow', number: '02', title: 'FlexiFlow', category: 'Adaptive ML · Mobile & web',
    tagline: 'Personalized support that learns with you.',
    status: 'Built', color: '#a7dac8',
    stack: ['Flutter', 'Firebase', 'FastAPI', 'Python', 'LinUCB'],
    poster: 'assets/flexiflow.png', posterLabel: 'Project illustration · preview placeholder', video: '',
    github: 'https://github.com/Sarayu30/flexiflow-new', live: 'https://flexiflow-9be51.web.app/',
    overview: 'A mobile and web support application for arthritis management, combining adaptive exercise recommendations, medication reminders, pain tracking, and community features.',
    contribution: 'Engineered a contextual-bandit recommendation engine using LinUCB to adapt exercise plans to pain levels, engagement, and feedback. Connected the recommendation service to a cross-platform Flutter experience.',
    features: ['Contextual exercise recommendations with LinUCB', 'Guideline-based cold-start recommendations', 'Medication reminders and daily pain tracking', 'Community discussions, streaks, and achievement badges'],
    engineering: 'Balancing a guideline-based cold start with recommendations that adapt over time, while keeping a consistent experience across mobile and web.',
    note: 'A software project exploring personalized support; not a substitute for professional medical advice.'
  },
  {
    id: 'firewall', number: '03', title: 'WAFinity', category: 'Cybersecurity · Machine learning',
    tagline: 'Known signatures. Unfamiliar patterns. One defense.',
    status: 'Built', color: '#7cd5c6',
    stack: ['Python', 'Flask', 'JavaScript', 'Machine Learning'],
    poster: 'assets/firewall.png', posterLabel: 'App screenshot', video: '',
    github: 'https://github.com/Sarayu30/Advanced-Web-Application-Firewall', live: '',
    overview: 'An advanced web application firewall project combining signature-based request filtering with machine-learning anomaly detection and a web interface for security insights.',
    contribution: 'Developed a hybrid approach to inspecting HTTP traffic, pairing known-attack checks with anomaly detection and an interface for exploring security results.',
    features: ['Signature-based SQL injection and XSS detection', 'Machine-learning analysis of unusual request patterns', 'Request inspection through a Flask application', 'Interactive security insights in a web interface'],
    engineering: 'Making two complementary detection approaches work together, and exposing the results through a clear request-analysis workflow.',
    note: 'A security engineering project. Repository screenshots illustrate the interface; no production detection-rate claim is made here.'
  },
  {
    id: 'companion', number: '04', title: 'Code Companion AI', category: 'Developer tool · Local AI',
    tagline: 'A second pair of eyes for your code.',
    status: 'Built', color: '#a9b9f3',
    stack: ['Python', 'Streamlit', 'LangChain', 'Ollama', 'DeepSeek'],
    poster: '', posterLabel: 'Concept preview · recording coming later', video: '',
    github: 'https://github.com/Sarayu30/Code-Companion-AI', live: '',
    overview: 'A Streamlit coding assistant that connects locally running DeepSeek models through Ollama and LangChain, with a focus on debugging, documentation, and solution design.',
    contribution: 'Connected model selection, a coding-focused system prompt, and conversational state into a lightweight developer-facing application.',
    features: ['Selectable local DeepSeek models through Ollama', 'Python coding and debugging assistance', 'Code documentation and solution-design support', 'Conversation history held in Streamlit session state'],
    engineering: 'Maintaining conversational context while offering a straightforward model-selection and chat experience for local inference.',
    note: 'Runs locally with Ollama; no hosted demo is currently linked.'
  }
];
