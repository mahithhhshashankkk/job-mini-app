const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockJobs = [
  {
    _id: "1",
    title: "Frontend React Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    description:
      "We are looking for a passionate Frontend Developer to join our growing team! Develop user-facing features using React.js and TypeScript, build reusable components and libraries for future use, translate designs and wireframes into high-quality code.",
    requirements:
      "Bachelor's degree in Computer Science or related field, 3+ years of professional React development experience, Strong understanding of JavaScript ES6+, TypeScript, Experience with modern CSS frameworks (Tailwind, Styled Components)",
    type: "full-time",
    salary: "$80,000 - $120,000",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "Senior Backend Developer",
    company: "DataFlow Inc",
    location: "Austin, TX",
    description:
      "Join our backend team to build scalable server-side applications and APIs! Design and develop robust REST APIs using Node.js and Express, work with databases (MongoDB, PostgreSQL) to optimize queries.",
    requirements:
      "Bachelor's degree in Computer Science or equivalent experience, 5+ years of professional backend development, Expert level Node.js, Express.js, and modern JavaScript",
    type: "full-time",
    salary: "$100,000 - $150,000",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    title: "UI/UX Designer",
    company: "Creative Studio Pro",
    location: "New York, NY",
    description:
      "We're seeking a talented UI/UX Designer to create exceptional user experiences! Create wireframes, prototypes, and high-fidelity designs, conduct user research and usability testing.",
    requirements:
      "Bachelor's degree in Design, HCI, or related field, 2+ years of professional UI/UX design experience, Portfolio showcasing web and mobile design projects",
    type: "part-time",
    salary: "$60,000 - $85,000",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "4",
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Remote",
    description:
      "Looking for a DevOps Engineer to help us scale our infrastructure! Manage and optimize cloud infrastructure (AWS, Azure), implement and maintain CI/CD pipelines.",
    requirements:
      "Bachelor's degree in Computer Science or related field, 3+ years of DevOps or cloud infrastructure experience, Strong experience with AWS services",
    type: "remote",
    salary: "$90,000 - $130,000",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "5",
    title: "Full Stack Developer",
    company: "Innovation Labs",
    location: "Seattle, WA",
    description:
      "Join our team as a Full Stack Developer and work on cutting-edge projects! Develop end-to-end web applications using modern technologies.",
    requirements:
      "Bachelor's degree in Computer Science or equivalent, 4+ years of professional full stack development, Strong proficiency in JavaScript, TypeScript, and modern frameworks",
    type: "full-time",
    salary: "$85,000 - $125,000",
    createdAt: new Date().toISOString(),
  },
];

let mockApplications = [];

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "Server running", database: "Mock data" });
});

app.get("/api/jobs", (req, res) => {
  const { type } = req.query;
  let filteredJobs = mockJobs;

  if (type) {
    filteredJobs = mockJobs.filter((job) => job.type === type);
  }

  res.json(filteredJobs);
});

app.get("/api/jobs/:id", (req, res) => {
  const job = mockJobs.find((j) => j._id === req.params.id);
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }
  res.json(job);
});

app.post("/api/applications", (req, res) => {
  const application = {
    _id: Date.now().toString(),
    ...req.body,
    appliedAt: new Date().toISOString(),
  };

  mockApplications.push(application);

  res.status(201).json({
    message: "Application submitted successfully",
    application,
  });
});

app.get("/api/applications", (req, res) => {
  // Populate job data for applications
  const applicationsWithJobs = mockApplications.map((app) => {
    const job = mockJobs.find((j) => j._id === app.job_id);
    return {
      ...app,
      job_id: job
        ? {
            _id: job._id,
            title: job.title,
            company: job.company,
          }
        : null,
    };
  });

  res.json(applicationsWithJobs);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
  console.log(`💼 Jobs API: http://localhost:${PORT}/api/jobs`);
  console.log(`📝 Applications API: http://localhost:${PORT}/api/applications`);
  console.log(`\n📋 Mock data loaded with ${mockJobs.length} jobs`);
});
