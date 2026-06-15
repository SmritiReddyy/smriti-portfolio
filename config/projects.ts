import type { ProjectOverride } from '../lib/types';

export const GITHUB_USERNAME = 'SmritiReddyy';

/**
 * Controls which GitHub repos appear on the portfolio and how they're displayed.
 *
 * HOW TO ADD A PROJECT:
 *  1. Go to the repo on GitHub → Settings → Topics → add "portfolio"
 *  2. Add an entry here with the exact repo name as the key.
 *     Only repos present in BOTH GitHub topics AND this config will be shown.
 *
 * HOW TO REMOVE A PROJECT:
 *  - Either remove the GitHub topic "portfolio" from the repo, OR
 *  - Delete/comment out its entry below.
 *
 * FIELDS:
 *  category  — "systems-cloud" | "ml-data-science"  (required)
 *  title     — display title (defaults to formatted repo name)
 *  desc      — card description (defaults to GitHub repo description)
 *  badge     — single badge for systems projects
 *  badges    — array of badges for ML projects
 *  badgeStyle — custom CSS gradient object for the badge
 *  lang      — language string shown top-right of the card
 *  tags      — tech-stack chips shown on the card
 */
export const PROJECT_OVERRIDES: Record<string, ProjectOverride> = {
  // ── Systems & Cloud ────────────────────────────────────────────────────────

  'court-access-ai': {
    category: 'systems-cloud',
    title: 'CourtAccess AI — Multilingual Legal Document Pipeline',
    desc: 'Modular document processing pipeline for digital PDFs, scanned documents, and handwritten pages across 3 distinct paths with a 12-stage orchestration layer. Presented at Google Expo for Massachusetts Trial Court. Reduced critical mistranslation rate by ~30% using Groq LLaMA 3.3 70B verification; processes a 10-page legal form end-to-end in under 40 seconds.',
    badge: 'Featured',
    badgeStyle: { background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' },
    lang: 'Python · React',
    tags: ['FastAPI', 'NLLB-200', 'PaddleOCR', 'GCP · Firebase', 'LLM'],
  },

  'distributed-cluster-monitoring-system': {
    category: 'systems-cloud',
    title: 'Fault-Tolerant Distributed Key-Value Store',
    desc: 'Fault-tolerant replicated key-value store in C++ supporting concurrent reads/writes across a 5-node cluster. Implemented RAFT consensus from scratch — leader election, log replication, state machine replication — achieving 8,000+ ops/sec under 30% node failure. Reduced failover recovery to under 200ms.',
    badge: 'Distributed Systems',
    lang: 'C++',
    tags: ['RAFT Consensus', 'Fault Tolerance', 'Replication'],
  },

  'secure-payment-microservices': {
    category: 'systems-cloud',
    title: 'Secure Payment Microservice',
    desc: 'Dual-service microservices architecture — Spring Boot REST API for transaction management and Django fraud-scoring service — containerized with Docker, orchestrated via docker-compose. OAuth2/JWT auth, MySQL for transactions, MongoDB for session/audit logs, deployed on AWS EC2.',
    badge: 'Microservices',
    lang: 'Java · Python',
    tags: ['Spring Boot', 'Docker', 'AWS EC2', 'OAuth2/JWT'],
  },

  'Distributed-ClientServer-Performance': {
    category: 'systems-cloud',
    title: 'Distributed Client-Server Performance Analysis',
    desc: 'Implemented a distributed client-server architecture to analyze performance metrics under varying loads. Conducted comprehensive benchmarking of throughput, latency, and resource utilization.',
    badge: 'Distributed Systems',
    lang: 'C++',
    tags: ['Benchmarking', 'Load Testing', 'Optimization'],
  },

  'ImageProcessingApplication': {
    category: 'systems-cloud',
    title: 'Image Manipulation Application',
    desc: 'Developed a modular image-processing application using Java MVC architecture supporting CLI, GUI, and batch execution modes with advanced filters like blur, sharpen, resize, and dithering.',
    badge: 'Software Engineering',
    lang: 'Java',
    tags: ['MVC', 'Design Patterns', 'GUI'],
  },

  // ── ML / Data Science ──────────────────────────────────────────────────────

  'Alzheimer-s-Disease-Detection-with-ML': {
    category: 'ml-data-science',
    title: "Alzheimer's Disease Detection with ML",
    desc: "Built binary classification models using clinical datasets to predict early-stage Alzheimer's disease. Compared five supervised learning algorithms with comprehensive evaluation metrics and statistical analysis.",
    badges: ['ML', 'Data Science'],
    lang: 'Python',
    tags: ['Classification', 'Healthcare Analytics', 'Model Comparison'],
  },

  'Cardio-Risk-Predictor': {
    category: 'ml-data-science',
    title: 'Cardio Risk Predictor',
    desc: 'Predicting heart disease risk using ensemble learning methods. Implemented multiple classification algorithms with comprehensive model evaluation and feature importance analysis for healthcare analytics.',
    badges: ['ML', 'Data Science'],
    lang: 'Python',
    tags: ['Ensemble Methods', 'Feature Engineering', 'Predictive Analytics'],
  },

  'Stellar-Classifier': {
    category: 'ml-data-science',
    title: 'Stellar Classifier',
    desc: 'Predicting star types using supervised machine learning models. Built classification models to categorize stars based on astronomical features with multi-class classification and exploratory data analysis.',
    badges: ['ML', 'Data Science'],
    lang: 'Python',
    tags: ['Multi-class Classification', 'Scientific Data', 'Data Analysis'],
  },

  'ConvolutionalAutoEncoders': {
    category: 'ml-data-science',
    title: 'Convolutional AutoEncoders',
    desc: 'Implemented convolutional autoencoders for unsupervised feature learning and dimensionality reduction. Explored deep learning architectures for image reconstruction and denoising.',
    badges: ['ML'],
    lang: 'Python',
    tags: ['Deep Learning', 'Unsupervised', 'Computer Vision'],
  },
};
