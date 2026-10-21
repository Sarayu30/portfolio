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
    id: 'troubleshooter', number: '03', title: 'Troubleshooter', category: 'Distributed systems · Semantic matching',
    tagline: 'The right problem. The right expert. Less waiting.',
    status: 'Built', color: '#7cd5c6',
    stack: ['Python', 'FastAPI', 'MongoDB', 'Sentence-BERT', 'WebSockets'],
    poster: 'assets/troubleshooter.svg', posterLabel: 'Architecture illustration · video placeholder', video: '',
    github: 'https://github.com/Sarayu30/troubleshooter', live: '',
    overview: 'An adaptive, load-balanced crowdsourced troubleshooting system. Issues are matched to experts using skills, semantic similarity, availability, trust, and workload, with regional matching and cross-region fallback.',
    contribution: 'Built the expert-matching and issue-management workflow around FastAPI and MongoDB. Combined Jaccard skill overlap with Sentence-BERT semantic similarity, trust scores, and inverse load to rank experts, with WebSocket communication for users and experts.',
    features: ['Multi-factor expert scoring with semantic and skill matching', 'North, South, East, and West regional allocation', 'Cross-region fallback and delayed assignment retries', 'User, expert, and admin interfaces with real-time chat'],
    engineering: 'Balancing expertise against availability and current workload, while handling issues that cannot be assigned within their original region.',
    note: 'The preview illustrates the matching architecture. It is not a recording of a deployed service; the repository contains the implementation.'
  },
  {
    id: 'screening', number: '04', title: 'Smart Screening', category: 'Computer vision · Object detection',
    tagline: 'Finding what is hidden in plain sight.',
    status: 'Research project', color: '#a9b9f3',
    stack: ['Python', 'YOLO', 'Ultralytics', 'Computer Vision', 'CBAM'],
    poster: 'assets/smart-screening.svg', posterLabel: 'Benchmark graphic · repository-reported results', video: '',
    github: 'https://github.com/Sarayu30/clcxray_object_detection_computervision', live: '',
    report: 'https://github.com/Sarayu30/clcxray_object_detection_computervision/blob/main/Project_Report.pdf',
    overview: 'A collaborative computer-vision research project for detecting restricted items in baggage X-ray images from the CLCXray dataset. It compares YOLO model variants and explores architectural changes for cluttered and overlapping objects.',
    contribution: 'Co-authored the project report and contributed to a comparative study of YOLO variants, including YOLOv9m experiments with residual blocks and CBAM attention. Evaluated detection performance using precision, recall, F1, and mean average precision.',
    features: ['YOLO model comparisons spanning v5, v8, v9, v10, v11, and v12', 'YOLOv9m residual-block and CBAM attention experiments', 'Bounding-box detection on the CLCXray security-screening dataset', 'Reproducible notebooks and a detailed methodology and results report'],
    engineering: 'Understanding model trade-offs under occlusion and class imbalance. The reported YOLOv9m baseline reached 0.711 mAP@50; the modified versions did not outperform it on that metric.',
    note: 'A research benchmark for baggage-security imagery. Results are reported in the repository and should not be interpreted as deployed screening-system performance.'
  }
];
