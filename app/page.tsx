export default function Home() {
  return (
    <main style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.name}>Smriti Reddy Uravakonda</h1>

        <p style={styles.subtitle}>
          MS in Computer Science @ Northeastern University
        </p>

        <p style={styles.description}>
          Software developer with interests in full-stack development, cloud
          computing, machine learning, and data-driven systems.
        </p>

        <div style={styles.links}>
          <a
            href="https://www.linkedin.com/in/smriti-reddy"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.primaryButton}
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/SmritiReddyy"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.primaryButton}
          >
            GitHub
          </a>

          <a
            href="/Smriti_Reddy_Resume.pdf"
            target="_blank"
            style={styles.primaryButton}
          >
            Resume
          </a>
        </div>
      </section>

      {/* Skills Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Skills</h2>

        <ul style={styles.list}>
          <li><strong>Languages:</strong> Python, Java, C++, JavaScript, TypeScript, SQL</li>
          <li><strong>Frameworks:</strong> React, Node.js, Express, Spring Boot, FastAPI</li>
          <li><strong>ML / Data:</strong> Scikit-Learn, TensorFlow, PyTorch, Pandas, NumPy</li>
          <li><strong>Cloud:</strong> AWS (EC2, S3, Lambda), GCP, Azure</li>
          <li><strong>Databases:</strong> MySQL, MSSQL, MongoDB</li>
        </ul>
      </section>


      {/* Projects Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Projects</h2>


        <div style={styles.project}>
          <h3 style={styles.projectTitle}>
            Cloud-Based Distributed Computing Framework
          </h3>
          <p style={styles.projectDesc}>
            Built a fault-tolerant distributed system supporting concurrent file
            storage, retrieval, and replication across multiple nodes. Designed
            microservice-based architecture with leader election, replication, and
            failure detection to improve system reliability and throughput.
          </p>

          <div style={styles.projectLinks}>
            <a
              href="https://github.com/SmritiReddyy/distributed-cluster-monitoring-system"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.projectLink}
            >
              View on GitHub →
            </a>
          </div>
        </div>


        <div style={styles.project}>
          <h3 style={styles.projectTitle}>
            Image Manipulation Application (Java)
          </h3>
          <p style={styles.projectDesc}>
            Developed a modular image-processing application using Java (MVC
            architecture) supporting CLI, GUI, and batch execution modes. Implemented
            advanced filters and transformations such as blur, sharpen, resize,
            compression, and dithering with support for multiple image formats.
          </p>

          <div style={styles.projectLinks}>
            <a
              href="https://github.com/SmritiReddyy/ImageProcessingApplication"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.projectLink}
            >
              View on GitHub →
            </a>
          </div>
        </div>


        <div style={styles.project}>
          <h3 style={styles.projectTitle}>
            Land Use Land Cover (LULC) Classification of Satellite Images
          </h3>
          <p style={styles.projectDesc}>
            Built an end-to-end satellite image classification pipeline using Python,
            automating preprocessing, training, and evaluation with SVM and Random
            Forest models. Achieved 90% accuracy and integrated QGIS for geospatial
            visualization to support infrastructure planning workflows.
          </p>
        </div>

      </section>
    </main>
  );
}

const styles = {
  container: {
    backgroundColor: "#0f0f0f",
    color: "#ffffff",
    minHeight: "100vh",
    fontFamily: "Inter, Arial, sans-serif",
  },

  hero: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center" as const,
    padding: "40px",
  },

  name: {
    fontSize: "2.6rem",
    fontWeight: 600,
  },

  subtitle: {
    marginTop: "12px",
    fontSize: "1.2rem",
    color: "#bbbbbb",
  },

  description: {
    marginTop: "20px",
    maxWidth: "650px",
    fontSize: "1rem",
    color: "#cccccc",
  },

  links: {
    display: "flex",
    gap: "16px",
    marginTop: "32px",
    flexWrap: "wrap" as const,
  },

  primaryButton: {
    padding: "12px 22px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#0f0f0f",
    textDecoration: "none",
    fontWeight: 600,
    transition: "transform 0.2s ease",
  },

  section: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "60px 40px",
  },

  sectionTitle: {
    fontSize: "1.8rem",
    marginBottom: "20px",
    borderBottom: "1px solid #333",
    paddingBottom: "10px",
  },

  list: {
    listStyle: "none",
    padding: 0,
    lineHeight: "1.8",
    color: "#dddddd",
  },

  project: {
    marginBottom: "24px",
  },

  projectTitle: {
    fontSize: "1.2rem",
    marginBottom: "6px",
  },

  projectLinks: {
    marginTop: "8px",
  },
  
  projectLink: {
    color: "#ffffff",
    textDecoration: "underline",
    fontSize: "0.95rem",
  },

  projectDesc: {
    color: "#cccccc",
    maxWidth: "750px",
  },
};


