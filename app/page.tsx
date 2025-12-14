import { useState } from 'react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'systems', label: 'Systems & Cloud' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'ds', label: 'Data Science' },
    { id: 'research', label: 'Research' }
  ];

  return (
    <main style={styles.container}>
      {/* Animated Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.statusBadge}>
            <span style={styles.statusDot}></span>
            Available for opportunities
          </div>
          
          <h1 style={styles.name}>
            Smriti Reddy Uravakonda
          </h1>

          <p style={styles.subtitle}>
            MS Computer Science @ Northeastern University
          </p>

          <p style={styles.description}>
            Building scalable distributed systems and intelligent ML solutions.
            Passionate about cloud computing, full-stack development, and data-driven innovation.
          </p>

          <div style={styles.links}>
            <a
              href="https://www.linkedin.com/in/smriti-reddy"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.primaryButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={styles.buttonIcon}>💼</span>
              LinkedIn
            </a>

            <a
              href="https://github.com/SmritiReddyy"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.secondaryButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={styles.buttonIcon}>💻</span>
              GitHub
            </a>

            <a
              href="/Smriti_Reddy_Resume.pdf"
              target="_blank"
              style={styles.secondaryButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={styles.buttonIcon}>📄</span>
              Resume
            </a>
          </div>
        </div>

        {/* Floating gradient orbs */}
        <div style={styles.orb1}></div>
        <div style={styles.orb2}></div>
      </section>

      {/* Skills Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={styles.titleAccent}>—</span> Technical Skills
        </h2>

        <div style={styles.skillsList}>
          <div style={styles.skillRow}>
            <span style={styles.skillLabel}>Languages</span>
            <span style={styles.skillValue}>Python • Java • C++ • JavaScript • TypeScript • SQL</span>
          </div>
          <div style={styles.skillRow}>
            <span style={styles.skillLabel}>Frameworks</span>
            <span style={styles.skillValue}>React • Node.js • Express • Spring Boot • FastAPI</span>
          </div>
          <div style={styles.skillRow}>
            <span style={styles.skillLabel}>ML / Data</span>
            <span style={styles.skillValue}>Scikit-Learn • TensorFlow • PyTorch • Pandas • NumPy</span>
          </div>
          <div style={styles.skillRow}>
            <span style={styles.skillLabel}>Cloud</span>
            <span style={styles.skillValue}>AWS (EC2, S3, Lambda) • GCP • Azure</span>
          </div>
          <div style={styles.skillRow}>
            <span style={styles.skillLabel}>Databases</span>
            <span style={styles.skillValue}>MySQL • MSSQL • MongoDB</span>
          </div>
        </div>
      </section>

      {/* Projects Section with Filter */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={styles.titleAccent}>—</span> Featured Projects
        </h2>

        {/* Category Filter */}
        <div style={styles.categoryFilter}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                ...styles.filterButton,
                ...(activeCategory === cat.id ? styles.filterButtonActive : {})
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Systems & Cloud Projects */}
        {(activeCategory === 'all' || activeCategory === 'systems') && (
          <div style={styles.projectsGrid}>
            <div style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <span style={styles.projectBadge}>Distributed Systems</span>
                <span style={styles.projectLang}>C++</span>
              </div>
              <h3 style={styles.projectCardTitle}>
                Cloud-Based Distributed Computing Framework
              </h3>
              <p style={styles.projectCardDesc}>
                Built a fault-tolerant distributed system supporting concurrent file
                storage, retrieval, and replication across multiple nodes. Designed
                microservice-based architecture with leader election and failure detection.
              </p>
              <div style={styles.projectTags}>
                <span style={styles.tag}>Fault Tolerance</span>
                <span style={styles.tag}>Microservices</span>
                <span style={styles.tag}>Replication</span>
              </div>
              <a
                href="https://github.com/SmritiReddyy/distributed-cluster-monitoring-system"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View Project →
              </a>
            </div>

            <div style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <span style={styles.projectBadge}>Performance Analysis</span>
                <span style={styles.projectLang}>C++</span>
              </div>
              <h3 style={styles.projectCardTitle}>
                Distributed Client-Server Performance Analysis
              </h3>
              <p style={styles.projectCardDesc}>
                Implemented a distributed client-server architecture to analyze 
                performance metrics under varying loads. Conducted comprehensive benchmarking 
                of throughput, latency, and resource utilization.
              </p>
              <div style={styles.projectTags}>
                <span style={styles.tag}>Benchmarking</span>
                <span style={styles.tag}>Load Testing</span>
                <span style={styles.tag}>Optimization</span>
              </div>
              <a
                href="https://github.com/SmritiReddyy/Distributed-ClientServer-Performance"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View Project →
              </a>
            </div>

            <div style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <span style={styles.projectBadge}>Software Engineering</span>
                <span style={styles.projectLang}>Java</span>
              </div>
              <h3 style={styles.projectCardTitle}>
                Image Manipulation Application
              </h3>
              <p style={styles.projectCardDesc}>
                Developed a modular image-processing application using Java MVC
                architecture supporting CLI, GUI, and batch execution modes with advanced 
                filters like blur, sharpen, resize, and dithering.
              </p>
              <div style={styles.projectTags}>
                <span style={styles.tag}>MVC</span>
                <span style={styles.tag}>Design Patterns</span>
                <span style={styles.tag}>GUI</span>
              </div>
              <a
                href="https://github.com/SmritiReddyy/ImageProcessingApplication"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View Project →
              </a>
            </div>
          </div>
        )}

        {/* ML Projects */}
        {(activeCategory === 'all' || activeCategory === 'ml') && (
          <div style={styles.projectsGrid}>
            <div style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <div style={styles.badgeGroup}>
                  <span style={{...styles.projectBadge, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>ML</span>
                  <span style={{...styles.projectBadge, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>Data Science</span>
                </div>
                <span style={styles.projectLang}>Python</span>
              </div>
              <h3 style={styles.projectCardTitle}>
                Alzheimer's Disease Detection with ML
              </h3>
              <p style={styles.projectCardDesc}>
                Built binary classification models using clinical datasets to predict 
                early-stage Alzheimer's disease. Compared five supervised learning algorithms 
                with comprehensive evaluation metrics and statistical analysis.
              </p>
              <div style={styles.projectTags}>
                <span style={styles.tag}>Classification</span>
                <span style={styles.tag}>Healthcare Analytics</span>
                <span style={styles.tag}>Model Comparison</span>
              </div>
              <a
                href="https://github.com/SmritiReddyy/Alzheimer-s-Disease-Detection-with-ML"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View Project →
              </a>
            </div>

            <div style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <div style={styles.badgeGroup}>
                  <span style={{...styles.projectBadge, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>ML</span>
                  <span style={{...styles.projectBadge, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>Data Science</span>
                </div>
                <span style={styles.projectLang}>Python</span>
              </div>
              <h3 style={styles.projectCardTitle}>
                Cardio Risk Predictor
              </h3>
              <p style={styles.projectCardDesc}>
                Predicting heart disease risk using ensemble learning methods. Implemented 
                multiple classification algorithms with comprehensive model evaluation and 
                feature importance analysis for healthcare analytics.
              </p>
              <div style={styles.projectTags}>
                <span style={styles.tag}>Ensemble Methods</span>
                <span style={styles.tag}>Feature Engineering</span>
                <span style={styles.tag}>Predictive Analytics</span>
              </div>
              <a
                href="https://github.com/SmritiReddyy/Cardio-Risk-Predictor"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View Project →
              </a>
            </div>

            <div style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <div style={styles.badgeGroup}>
                  <span style={{...styles.projectBadge, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>ML</span>
                  <span style={{...styles.projectBadge, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>Data Science</span>
                </div>
                <span style={styles.projectLang}>Python</span>
              </div>
              <h3 style={styles.projectCardTitle}>
                Stellar Classifier
              </h3>
              <p style={styles.projectCardDesc}>
                Predicting star types using supervised machine learning models. Built 
                classification models to categorize stars based on astronomical features 
                with multi-class classification and exploratory data analysis.
              </p>
              <div style={styles.projectTags}>
                <span style={styles.tag}>Multi-class Classification</span>
                <span style={styles.tag}>Scientific Data</span>
                <span style={styles.tag}>Data Analysis</span>
              </div>
              <a
                href="https://github.com/SmritiReddyy/Stellar-Classifier"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View Project →
              </a>
            </div>

            <div style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <div style={styles.badgeGroup}>
                  <span style={{...styles.projectBadge, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>ML</span>
                </div>
                <span style={styles.projectLang}>Python</span>
              </div>
              <h3 style={styles.projectCardTitle}>
                Convolutional AutoEncoders
              </h3>
              <p style={styles.projectCardDesc}>
                Implemented convolutional autoencoders for unsupervised feature learning and 
                dimensionality reduction. Explored deep learning architectures for image 
                reconstruction and denoising.
              </p>
              <div style={styles.projectTags}>
                <span style={styles.tag}>Deep Learning</span>
                <span style={styles.tag}>Unsupervised</span>
                <span style={styles.tag}>Computer Vision</span>
              </div>
              <a
                href="https://github.com/SmritiReddyy/ConvolutionalAutoEncoders"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View Project →
              </a>
            </div>
          </div>
        )}

        {/* Data Science Projects */}
        {(activeCategory === 'all' || activeCategory === 'ds') && (
          <div style={styles.projectsGrid}>
            <div style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <div style={styles.badgeGroup}>
                  <span style={{...styles.projectBadge, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>ML</span>
                  <span style={{...styles.projectBadge, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>Data Science</span>
                </div>
                <span style={styles.projectLang}>Python</span>
              </div>
              <h3 style={styles.projectCardTitle}>
                Alzheimer's Disease Detection with ML
              </h3>
              <p style={styles.projectCardDesc}>
                Built binary classification models using clinical datasets to predict 
                early-stage Alzheimer's disease. Compared five supervised learning algorithms 
                with comprehensive evaluation metrics and statistical analysis.
              </p>
              <div style={styles.projectTags}>
                <span style={styles.tag}>Classification</span>
                <span style={styles.tag}>Healthcare Analytics</span>
                <span style={styles.tag}>Model Comparison</span>
              </div>
              <a
                href="https://github.com/SmritiReddyy/Alzheimer-s-Disease-Detection-with-ML"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View Project →
              </a>
            </div>

            <div style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <div style={styles.badgeGroup}>
                  <span style={{...styles.projectBadge, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>ML</span>
                  <span style={{...styles.projectBadge, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>Data Science</span>
                </div>
                <span style={styles.projectLang}>Python</span>
              </div>
              <h3 style={styles.projectCardTitle}>
                Cardio Risk Predictor
              </h3>
              <p style={styles.projectCardDesc}>
                Predicting heart disease risk using ensemble learning methods. Implemented 
                multiple classification algorithms with comprehensive model evaluation and 
                feature importance analysis for healthcare analytics.
              </p>
              <div style={styles.projectTags}>
                <span style={styles.tag}>Ensemble Methods</span>
                <span style={styles.tag}>Feature Engineering</span>
                <span style={styles.tag}>Predictive Analytics</span>
              </div>
              <a
                href="https://github.com/SmritiReddyy/Cardio-Risk-Predictor"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View Project →
              </a>
            </div>

            <div style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <div style={styles.badgeGroup}>
                  <span style={{...styles.projectBadge, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>ML</span>
                  <span style={{...styles.projectBadge, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>Data Science</span>
                </div>
                <span style={styles.projectLang}>Python</span>
              </div>
              <h3 style={styles.projectCardTitle}>
                Stellar Classifier
              </h3>
              <p style={styles.projectCardDesc}>
                Predicting star types using supervised machine learning models. Built 
                classification models to categorize stars based on astronomical features 
                with multi-class classification and exploratory data analysis.
              </p>
              <div style={styles.projectTags}>
                <span style={styles.tag}>Multi-class Classification</span>
                <span style={styles.tag}>Scientific Data</span>
                <span style={styles.tag}>Data Analysis</span>
              </div>
              <a
                href="https://github.com/SmritiReddyy/Stellar-Classifier"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View Project →
              </a>
            </div>
          </div>
        )}

        {/* Research Publications */}
        {(activeCategory === 'all' || activeCategory === 'research') && (
          <div style={styles.researchSection}>
            <h3 style={styles.researchTitle}>Research Publications</h3>
            
            <div style={styles.researchCard}>
              <div style={styles.researchIcon}>📄</div>
              <div style={styles.researchContent}>
                <h4 style={styles.researchCardTitle}>
                  Environmental Impact Analysis using Satellite Image Processing
                </h4>
                <p style={styles.researchVenue}>IEEE 4th ASIANCON 2024</p>
                <p style={styles.researchDesc}>
                  Developed automated workflows for environmental monitoring using satellite 
                  imagery, demonstrating applications in deforestation tracking and urban 
                  development analysis.
                </p>
              </div>
            </div>

            <div style={styles.researchCard}>
              <div style={styles.researchIcon}>📄</div>
              <div style={styles.researchContent}>
                <h4 style={styles.researchCardTitle}>
                  Optimising Computation Offloading for Mobile Edge Devices
                </h4>
                <p style={styles.researchVenue}>ICAECT 2024</p>
                <p style={styles.researchDesc}>
                  Researched and proposed optimization strategies for computation offloading 
                  in mobile edge computing environments, addressing latency and resource 
                  constraints.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Built with React & Next.js • Open to opportunities in Software Engineering, 
          Machine Learning, and Data Science
        </p>
      </footer>
    </main>
  );
}

const styles = {
  container: {
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  hero: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center" as const,
    padding: "40px 20px",
    position: "relative" as const,
    overflow: "hidden",
  },

  heroContent: {
    position: "relative" as const,
    zIndex: 2,
    maxWidth: "800px",
  },

  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "20px",
    backgroundColor: "rgba(52, 211, 153, 0.1)",
    border: "1px solid rgba(52, 211, 153, 0.3)",
    color: "#34d399",
    fontSize: "0.875rem",
    marginBottom: "24px",
    fontWeight: 500,
  },

  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#34d399",
    animation: "pulse 2s ease-in-out infinite",
  },

  name: {
    fontSize: "3.5rem",
    fontWeight: 700,
    background: "linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "16px",
    lineHeight: 1.2,
  },

  subtitle: {
    fontSize: "1.25rem",
    color: "#9ca3af",
    marginBottom: "24px",
    fontWeight: 400,
  },

  description: {
    fontSize: "1.1rem",
    color: "#d1d5db",
    lineHeight: 1.7,
    marginBottom: "40px",
    maxWidth: "650px",
    margin: "0 auto 40px",
  },

  links: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap" as const,
  },

  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 28px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1rem",
    transition: "all 0.3s ease",
    border: "none",
    cursor: "pointer",
  },

  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 28px",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1rem",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  buttonIcon: {
    fontSize: "1.2rem",
  },

  orb1: {
    position: "absolute" as const,
    top: "10%",
    right: "15%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
    filter: "blur(60px)",
    zIndex: 1,
  },

  orb2: {
    position: "absolute" as const,
    bottom: "20%",
    left: "10%",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
    filter: "blur(60px)",
    zIndex: 1,
  },

  section: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "80px 40px",
  },

  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: 700,
    marginBottom: "48px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  titleAccent: {
    color: "#6366f1",
    fontSize: "2rem",
  },

  skillsList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
    maxWidth: "900px",
    margin: "0 auto",
  },

  skillRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "32px",
    padding: "20px 0",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
  },

  skillLabel: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#6366f1",
    minWidth: "140px",
    flexShrink: 0,
  },

  skillValue: {
    fontSize: "1rem",
    color: "#d1d5db",
    lineHeight: 1.7,
    flex: 1,
  },

  categoryFilter: {
    display: "flex",
    gap: "12px",
    marginBottom: "48px",
    flexWrap: "wrap" as const,
  },

  filterButton: {
    padding: "10px 24px",
    borderRadius: "24px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#9ca3af",
    fontSize: "0.95rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  filterButtonActive: {
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    border: "1px solid rgba(99, 102, 241, 0.4)",
    color: "#6366f1",
  },

  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "32px",
    marginBottom: "48px",
  },

  projectCard: {
    padding: "32px",
    borderRadius: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    transition: "all 0.3s ease",
    cursor: "default",
    display: "flex",
    flexDirection: "column" as const,
  },

  projectHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
    gap: "12px",
  },

  badgeGroup: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
  },

  projectBadge: {
    padding: "6px 12px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },

  projectLang: {
    padding: "6px 12px",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    fontSize: "0.75rem",
    color: "#9ca3af",
    fontWeight: 500,
  },

  projectCardTitle: {
    fontSize: "1.35rem",
    fontWeight: 600,
    marginBottom: "16px",
    color: "#ffffff",
    lineHeight: 1.3,
  },

  projectCardDesc: {
    fontSize: "0.95rem",
    color: "#9ca3af",
    lineHeight: 1.7,
    marginBottom: "20px",
    flex: 1,
  },

  projectTags: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
    marginBottom: "20px",
  },

  tag: {
    padding: "4px 12px",
    borderRadius: "6px",
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    color: "#a5b4fc",
    fontSize: "0.8rem",
    fontWeight: 500,
  },

  projectLink: {
    color: "#6366f1",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.95rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.3s ease",
  },

  researchSection: {
    marginTop: "48px",
  },

  researchTitle: {
    fontSize: "1.75rem",
    fontWeight: 600,
    marginBottom: "32px",
    color: "#ffffff",
  },

  researchCard: {
    display: "flex",
    gap: "24px",
    padding: "32px",
    borderRadius: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    marginBottom: "24px",
    transition: "all 0.3s ease",
  },

  researchIcon: {
    fontSize: "2rem",
    flexShrink: 0,
  },

  researchContent: {
    flex: 1,
  },

  researchCardTitle: {
    fontSize: "1.2rem",
    fontWeight: 600,
    marginBottom: "8px",
    color: "#ffffff",
  },

  researchVenue: {
    fontSize: "0.9rem",
    color: "#6366f1",
    fontWeight: 600,
    marginBottom: "12px",
  },

  researchDesc: {
    fontSize: "0.95rem",
    color: "#9ca3af",
    lineHeight: 1.7,
  },

  footer: {
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "40px 20px",
    textAlign: "center" as const,
  },

  footerText: {
    color: "#6b7280",
    fontSize: "0.9rem",
    lineHeight: 1.6,
  },
};