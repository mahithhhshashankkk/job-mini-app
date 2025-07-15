const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import models
const Job = require("./models/job");
const Application = require("./models/application");

// Import routes
const jobRoutes = require("./routes/jobs");
const applicationRoutes = require("./routes/application");

// Middleware
app.use(cors());
app.use(express.json());

// Seed data
const seedJobs = [
  {
    title: "Frontend React Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    description: `We are looking for a passionate Frontend Developer to join our growing team! 

Responsibilities:
• Develop user-facing features using React.js and TypeScript
• Build reusable components and libraries for future use
• Translate designs and wireframes into high-quality code
• Optimize components for maximum performance across devices
• Collaborate with design and backend teams`,
    requirements: `• Bachelor's degree in Computer Science or related field
• 3+ years of professional React development experience
• Strong understanding of JavaScript ES6+, TypeScript
• Experience with modern CSS frameworks (Tailwind, Styled Components)
• Knowledge of testing frameworks (Jest, React Testing Library)
• Excellent problem-solving and communication skills`,
    type: "full-time",
    salary: "$80,000 - $120,000",
  },
  {
    title: "Senior Backend Developer",
    company: "DataFlow Inc",
    location: "Austin, TX",
    description: `Join our backend team to build scalable server-side applications and APIs!

Responsibilities:
• Design and develop robust REST APIs using Node.js and Express
• Work with databases (MongoDB, PostgreSQL) to optimize queries
• Implement authentication and authorization systems
• Build microservices architecture and containerization
• Collaborate with frontend teams on API design`,
    requirements: `• Bachelor's degree in Computer Science or equivalent experience
• 5+ years of professional backend development
�� Expert level Node.js, Express.js, and modern JavaScript
• Strong experience with SQL and NoSQL databases
• Knowledge of system design and architecture patterns
• Experience with containerization (Docker, Kubernetes)`,
    type: "full-time",
    salary: "$100,000 - $150,000",
  },
  {
    title: "UI/UX Designer",
    company: "Creative Studio Pro",
    location: "New York, NY",
    description: `We're seeking a talented UI/UX Designer to create exceptional user experiences!

Responsibilities:
• Create wireframes, prototypes, and high-fidelity designs
• Conduct user research and usability testing
• Design responsive web and mobile interfaces
• Collaborate with developers to ensure design implementation
• Maintain and evolve design systems and style guides`,
    requirements: `• Bachelor's degree in Design, HCI, or related field
• 2+ years of professional UI/UX design experience
• Portfolio showcasing web and mobile design projects
• Proficiency in design tools (Figma, Sketch, Adobe XD)
• Strong understanding of user-centered design principles
• Experience with design systems and component libraries`,
    type: "part-time",
    salary: "$60,000 - $85,000",
  },
  {
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Remote",
    description: `Looking for a DevOps Engineer to help us scale our infrastructure!

Responsibilities:
• Manage and optimize cloud infrastructure (AWS, Azure)
• Implement and maintain CI/CD pipelines
• Monitor system performance and troubleshoot issues
• Automate deployment processes and infrastructure as code
• Ensure security compliance and backup strategies`,
    requirements: `• Bachelor's degree in Computer Science or related field
• 3+ years of DevOps or cloud infrastructure experience
• Strong experience with AWS services (EC2, S3, RDS, Lambda)
• Proficiency in containerization (Docker, Kubernetes)
• Experience with CI/CD tools (Jenkins, GitLab CI, GitHub Actions)
• Knowledge of Infrastructure as Code tools`,
    type: "remote",
    salary: "$90,000 - $130,000",
  },
  {
    title: "Full Stack Developer",
    company: "Innovation Labs",
    location: "Seattle, WA",
    description: `Join our team as a Full Stack Developer and work on cutting-edge projects!

Responsibilities:
• Develop end-to-end web applications using modern technologies
• Build responsive frontend interfaces with React/Vue.js
• Create and maintain backend APIs and databases
• Implement real-time features using WebSockets
• Optimize application performance and scalability`,
    requirements: `• Bachelor's degree in Computer Science or equivalent
• 4+ years of professional full stack development
• Strong proficiency in JavaScript, TypeScript, and modern frameworks
• Experience with both frontend (React/Vue) and backend (Node.js)
• Knowledge of database design and optimization
• Understanding of RESTful APIs and GraphQL`,
    type: "full-time",
    salary: "$85,000 - $125,000",
  },
];

async function startServer() {
  try {
    // Start in-memory MongoDB
    const mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();

    console.log("Starting in-memory MongoDB...");

    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to in-memory MongoDB");

    // Clear and seed data
    await Job.deleteMany({});
    await Job.insertMany(seedJobs);
    console.log(`Seeded ${seedJobs.length} jobs successfully!`);

    // Use routes
    app.use("/api/jobs", jobRoutes);
    app.use("/api/applications", applicationRoutes);

    // Health check
    app.get("/api/health", (req, res) => {
      res.json({ status: "Server running", database: "In-memory MongoDB" });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
      console.log(`💼 Jobs API: http://localhost:${PORT}/api/jobs`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
