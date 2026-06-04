// Replace/add/remove projects only in this file.
// Keep `imageUrl` paths under /public so Render static site can serve them.

export const projects = [
  {
    // Semantic AI project moved to top so it appears first
    title: 'Semantic AI — Vector Retrieval & Agent Console',
    signal: 'Semantic Search + AI Runtime',
    description:
      'Semantic AI project that powers contextual retrieval, vector search synchronization, and an agent-ready runtime surface for engineering Q&A.',
    stack: ['Semantic Retrieval', 'Vector Search', 'Embeddings', 'Agent Runtime', 'Python'],
    logs: ['Embeddings indexed', 'Similarity search active', 'Agent console responsive'],
    githubUrl: 'https://github.com/BALAJI-CODE-collab',
    imageUrl: '/projects/semantic-ai.png',
  },

  {
    title: 'Automated Grading and Sorting of Aggregated Produce using Computer Vision',
    signal: 'Vision Inference Product',
    description:
      'A computer vision automation system for produce grading, defect detection, image quality assessment and shelf-life prediction.',
    stack: ['YOLOv11', 'CBAM Attention', 'OpenCV', 'Python', 'Automation'],
    logs: ['Inference confidence 98.2%', 'Defect classes calibrated', 'Shelf-life model linked'],
    githubUrl: 'https://github.com/BALAJI-CODE-collab',
    imageUrl: '/projects/produce-grading.png', // TODO: add image under public/projects/
  },

  {
    title: "Alzheimer's Disease Early Prediction",
    signal: 'Predictive Healthcare Runtime',
    description:
      'A cognitive gameplay analytics workflow that studies behavioral signals and runs ML prediction systems for early risk analysis.',
    stack: ['Machine Learning', 'Behavioral Analysis', 'Scikit-learn', 'Healthcare AI'],
    logs: ['Gameplay telemetry parsed', 'Prediction confidence 94.7%', 'Feature drift monitored'],
    githubUrl: 'https://github.com/BALAJI-CODE-collab',
    imageUrl: '/projects/alzheimers-prediction.png', // TODO
  },

  {
    title: 'Eco-Route: Carbon Footprint Navigator',
    signal: 'Optimization Dashboard',
    description:
      'A route intelligence platform using Maps API, CEROS optimization, Streamlit dashboards and Folium visualizations.',
    stack: ['Google Maps API', 'CEROS', 'Streamlit', 'Folium', 'Python'],
    logs: ['Carbon saved 18%', 'Traffic stream active', 'Route optimization complete'],
    githubUrl: 'https://github.com/BALAJI-CODE-collab',
    imageUrl: '/projects/eco-route.png', // TODO
  },

  {
    title: 'GitHub Systems: TREDENCE, SEAII, TR-106-Origin, ML',
    signal: 'Engineering Repository Cluster',
    description:
      'A portfolio of repositories exploring intelligent systems, software engineering, automation and applied ML workflows.',
    stack: ['GitHub', 'Full Stack', 'AI Systems', 'MLOps Experiments'],
    logs: ['Repos indexed', 'Contributions synced', 'Build graph online'],
    githubUrl: 'https://github.com/BALAJI-CODE-collab',
    imageUrl: '/projects/repo-cluster.png', // TODO
  },
];

