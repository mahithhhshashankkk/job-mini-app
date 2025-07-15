import axios from "axios";
import { Job, Application, ApplicationWithJob } from "../types";

// Mock data for when backend is not available
const mockJobs: Job[] = [
  {
    _id: "1",
    title: "Frontend React Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    description:
      "We are looking for a passionate Frontend Developer to join our growing team!\n\nResponsibilities:\n• Develop user-facing features using React.js and TypeScript\n• Build reusable components and libraries for future use\n• Translate designs and wireframes into high-quality code\n• Optimize components for maximum performance across devices\n• Collaborate with design and backend teams",
    requirements:
      "• Bachelor's degree in Computer Science or related field\n• 3+ years of professional React development experience\n• Strong understanding of JavaScript ES6+, TypeScript\n• Experience with modern CSS frameworks (Tailwind, Styled Components)\n• Knowledge of testing frameworks (Jest, React Testing Library)\n• Excellent problem-solving and communication skills",
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
      "Join our backend team to build scalable server-side applications and APIs!\n\nResponsibilities:\n• Design and develop robust REST APIs using Node.js and Express\n• Work with databases (MongoDB, PostgreSQL) to optimize queries\n• Implement authentication and authorization systems\n• Build microservices architecture and containerization\n• Collaborate with frontend teams on API design",
    requirements:
      "• Bachelor's degree in Computer Science or equivalent experience\n• 5+ years of professional backend development\n• Expert level Node.js, Express.js, and modern JavaScript\n• Strong experience with SQL and NoSQL databases\n• Knowledge of system design and architecture patterns\n• Experience with containerization (Docker, Kubernetes)",
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
      "We're seeking a talented UI/UX Designer to create exceptional user experiences!\n\nResponsibilities:\n• Create wireframes, prototypes, and high-fidelity designs\n• Conduct user research and usability testing\n• Design responsive web and mobile interfaces\n• Collaborate with developers to ensure design implementation\n• Maintain and evolve design systems and style guides",
    requirements:
      "• Bachelor's degree in Design, HCI, or related field\n• 2+ years of professional UI/UX design experience\n• Portfolio showcasing web and mobile design projects\n• Proficiency in design tools (Figma, Sketch, Adobe XD)\n• Strong understanding of user-centered design principles\n• Experience with design systems and component libraries",
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
      "Looking for a DevOps Engineer to help us scale our infrastructure!\n\nResponsibilities:\n• Manage and optimize cloud infrastructure (AWS, Azure)\n• Implement and maintain CI/CD pipelines\n• Monitor system performance and troubleshoot issues\n• Automate deployment processes and infrastructure as code\n• Ensure security compliance and backup strategies",
    requirements:
      "• Bachelor's degree in Computer Science or related field\n• 3+ years of DevOps or cloud infrastructure experience\n• Strong experience with AWS services (EC2, S3, RDS, Lambda)\n• Proficiency in containerization (Docker, Kubernetes)\n• Experience with CI/CD tools (Jenkins, GitLab CI, GitHub Actions)\n• Knowledge of Infrastructure as Code tools",
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
      "Join our team as a Full Stack Developer and work on cutting-edge projects!\n\nResponsibilities:\n• Develop end-to-end web applications using modern technologies\n• Build responsive frontend interfaces with React/Vue.js\n• Create and maintain backend APIs and databases\n• Implement real-time features using WebSockets\n• Optimize application performance and scalability",
    requirements:
      "• Bachelor's degree in Computer Science or equivalent\n• 4+ years of professional full stack development\n• Strong proficiency in JavaScript, TypeScript, and modern frameworks\n• Experience with both frontend (React/Vue) and backend (Node.js)\n• Knowledge of database design and optimization\n• Understanding of RESTful APIs and GraphQL",
    type: "full-time",
    salary: "$85,000 - $125,000",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "6",
    title: "Mobile App Developer",
    company: "MobileFirst Tech",
    location: "Los Angeles, CA",
    description:
      "We're looking for a React Native developer to build amazing mobile experiences!\n\nResponsibilities:\n• Develop cross-platform mobile applications using React Native\n• Integrate with native iOS and Android features\n• Optimize app performance and user experience\n• Work with designers to implement pixel-perfect UIs\n• Debug and resolve platform-specific issues",
    requirements:
      "• Bachelor's degree in Computer Science or related field\n• 2+ years of professional React Native development\n• Strong proficiency in JavaScript, React, and mobile development\n• Experience with iOS and Android platform guidelines\n• Knowledge of mobile app performance optimization\n• Familiarity with app store submission processes",
    type: "contract",
    salary: "$70,000 - $100,000",
    createdAt: new Date().toISOString(),
  },
];

let mockApplications: ApplicationWithJob[] = [];

// API configuration for different environments
const API_BASE_URL = (() => {
  // Development
  if (window.location.hostname === "localhost") {
    return "http://localhost:5000/api";
  }

  // Production - you'll need to update this with your backend URL once deployed
  // For now, using a placeholder that you'll replace
  const BACKEND_URL =
    import.meta.env.VITE_API_URL || "https://your-backend-url.railway.app/api";
  return BACKEND_URL;
})();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5 second timeout for faster fallback
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout - please check your connection");
    }
    if (error.response?.status >= 500) {
      throw new Error("Server error - please try again later");
    }
    if (error.response?.status === 404) {
      throw new Error("Resource not found");
    }
    if (!error.response) {
      throw new Error("Network error - please check your connection");
    }
    throw error;
  },
);

export const jobsApi = {
  getJobs: async (type?: string): Promise<Job[]> => {
    try {
      const response = await api.get("/jobs", { params: { type } });
      return response.data;
    } catch (error) {
      console.warn("Backend not available, using mock data for demonstration");
      // Filter mock data by type if specified
      if (type) {
        return mockJobs.filter((job) => job.type === type);
      }
      return mockJobs;
    }
  },

  getJob: async (id: string): Promise<Job> => {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, using mock data for demonstration");
      const job = mockJobs.find((j) => j._id === id);
      if (!job) {
        throw new Error("Job not found");
      }
      return job;
    }
  },
};

export const applicationsApi = {
  submitApplication: async (application: Application): Promise<any> => {
    try {
      const response = await api.post("/applications", application);
      return response.data;
    } catch (error) {
      console.warn(
        "Backend not available, simulating application submission for demonstration",
      );

      // Find the job for the application
      const job = mockJobs.find((j) => j._id === application.job_id);

      // Create mock application with job details
      const mockApplication: ApplicationWithJob = {
        _id: Date.now().toString(),
        ...application,
        appliedAt: new Date().toISOString(),
        job_id: job
          ? {
              _id: job._id,
              title: job.title,
              company: job.company,
            }
          : {
              _id: application.job_id,
              title: "Unknown Job",
              company: "Unknown Company",
            },
      };

      // Add to mock applications array
      mockApplications.push(mockApplication);

      return {
        message: "Application submitted successfully (Demo Mode)",
        application: mockApplication,
      };
    }
  },

  getApplications: async (): Promise<ApplicationWithJob[]> => {
    try {
      const response = await api.get("/applications");
      return response.data;
    } catch (error) {
      console.warn(
        "Backend not available, using mock applications data for demonstration",
      );
      return mockApplications;
    }
  },
};
