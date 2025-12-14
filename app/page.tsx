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

        {/* Featured Projects */}
        <div style={styles.projectCategory}>
          <h3 style={styles.categoryTitle}>Distributed Systems, Cloud & Software Engineering</h3>

          <div style={styles.project}>
            <h4 style={styles.projectTitle}>
              Cloud-Based Distributed Computing Framework
            </h4>
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
            <h4 style={styles.projectTitle}>
              Distributed Client-Server Performance Analysis
            </h4>
            <p style={styles.projectDesc}>
              Implemented a distributed client-server architecture in C++ to analyze 
              performance metrics under varying loads and network conditions. Conducted 
              comprehensive benchmarking of throughput, latency, and resource utilization 
              across different server configurations.
            </p>
            <div style={styles.projectLinks}>
              <a
                href="https://github.com/SmritiReddyy/Distributed-ClientServer-Performance"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View on GitHub →
              </a>
            </div>
          </div>

          <div style={styles.project}>
            <h4 style={styles.projectTitle}>
              Image Manipulation Application (Java)
            </h4>
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
        </div>

        {/* Machine Learning Projects */}
        <div style={styles.projectCategory}>
          <h3 style={styles.categoryTitle}>Machine Learning & Data Science</h3>



          <div style={styles.project}>
            <h4 style={styles.projectTitle}>
              Alzheimer's Disease Detection with ML
            </h4>
            <p style={styles.projectDesc}>
              Built binary classification models using clinical datasets to predict 
              early-stage Alzheimer's disease. Implemented and compared five supervised 
              learning algorithms (Logistic Regression, SVM, Random Forest, Gradient 
              Boosting, Neural Networks) with comprehensive evaluation metrics.
            </p>
            <div style={styles.projectLinks}>
              <a
                href="https://github.com/SmritiReddyy/Alzheimer-s-Disease-Detection-with-ML"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View on GitHub →
              </a>
            </div>
          </div>

          <div style={styles.project}>
            <h4 style={styles.projectTitle}>
              Cardio Risk Predictor
            </h4>
            <p style={styles.projectDesc}>
              Predicting heart disease risk using ensemble learning methods. Implemented 
              multiple classification algorithms and ensemble techniques to achieve robust 
              predictions for cardiovascular disease detection, with comprehensive model 
              evaluation and feature importance analysis.
            </p>
            <div style={styles.projectLinks}>
              <a
                href="https://github.com/SmritiReddyy/Cardio-Risk-Predictor"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View on GitHub →
              </a>
            </div>
          </div>

          <div style={styles.project}>
            <h4 style={styles.projectTitle}>
              Stellar Classifier
            </h4>
            <p style={styles.projectDesc}>
              Predicting star types using supervised machine learning models. Built 
              classification models to categorize stars based on astronomical features, 
              demonstrating expertise in feature engineering and multi-class classification 
              with scientific datasets.
            </p>
            <div style={styles.projectLinks}>
              <a
                href="https://github.com/SmritiReddyy/Stellar-Classifier"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View on GitHub →
              </a>
            </div>
          </div>

          <div style={styles.project}>
            <h4 style={styles.projectTitle}>
              Convolutional AutoEncoders
            </h4>
            <p style={styles.projectDesc}>
              Implemented convolutional autoencoders for unsupervised feature learning and 
              dimensionality reduction. Explored deep learning architectures for image 
              reconstruction, denoising, and latent space representation learning using 
              TensorFlow/PyTorch.
            </p>
            <div style={styles.projectLinks}>
              <a
                href="https://github.com/SmritiReddyy/ConvolutionalAutoEncoders"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </div>



        {/* Research Publications */}
        <div style={styles.projectCategory}>
          <h3 style={styles.categoryTitle}>Research Publications</h3>

          <div style={styles.project}>
            <h4 style={styles.projectTitle}>
              Environmental Impact Analysis using Satellite Image Processing
            </h4>
            <p style={styles.projectDesc}>
              Presented at <em>IEEE 4th ASIANCON 2024</em>. Developed automated 
              workflows for environmental monitoring using satellite imagery, 
              demonstrating applications in deforestation tracking and urban 
              development analysis.
            </p>
          </div>

          <div style={styles.project}>
            <h4 style={styles.projectTitle}>
              Optimising Computation Offloading for Mobile Edge Devices
            </h4>
            <p style={styles.projectDesc}>
              Presented at <em>ICAECT 2024</em>. Researched and proposed optimization 
              strategies for computation offloading in mobile edge computing 
              environments, addressing latency and resource constraints.
            </p>
          </div>
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

  projectCategory: {
    marginBottom: "48px",
  },

  categoryTitle: {
    fontSize: "1.4rem",
    color: "#ffffff",
    marginBottom: "20px",
    paddingLeft: "12px",
    borderLeft: "3px solid #ffffff",
  },

  project: {
    marginBottom: "28px",
    paddingLeft: "12px",
  },

  projectTitle: {
    fontSize: "1.15rem",
    marginBottom: "8px",
    fontWeight: 500,
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
    lineHeight: "1.6",
  },
};