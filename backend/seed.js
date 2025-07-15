const mongoose = require("mongoose");
const Job = require("./models/job");
require("dotenv").config();

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
• Collaborate with design and backend teams

Requirements:
• 3+ years of experience with React.js and modern JavaScript
• Strong proficiency in TypeScript, HTML5, and CSS3
• Experience with state management (Redux, Context API)
• Familiarity with RESTful APIs and GraphQL
• Knowledge of modern build tools (Webpack, Vite)
• Experience with version control (Git)`,
    requirements: `• Bachelor's degree in Computer Science or related field
• 3+ years of professional React development experience
• Strong understanding of JavaScript ES6+, TypeScript
• Experience with modern CSS frameworks (Tailwind, Styled Components)
• Knowledge of testing frameworks (Jest, React Testing Library)
• Excellent problem-solving and communication skills
• Portfolio demonstrating React projects`,
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
• Collaborate with frontend teams on API design
• Ensure code quality through testing and code reviews

Requirements:
• 5+ years of backend development experience
• Expert knowledge of Node.js, Express.js, and JavaScript
• Strong database design and optimization skills
• Experience with cloud platforms (AWS, Azure, GCP)
• Knowledge of DevOps practices and CI/CD pipelines`,
    requirements: `• Bachelor's degree in Computer Science or equivalent experience
• 5+ years of professional backend development
• Expert level Node.js, Express.js, and modern JavaScript
• Strong experience with SQL and NoSQL databases
• Knowledge of system design and architecture patterns
• Experience with containerization (Docker, Kubernetes)
• Understanding of security best practices
• Excellent analytical and problem-solving skills`,
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
• Maintain and evolve design systems and style guides
• Present design concepts to stakeholders

Requirements:
• 2+ years of UI/UX design experience
• Proficiency in Figma, Sketch, or Adobe Creative Suite
• Strong understanding of design principles and usability
• Experience with responsive and mobile-first design
• Knowledge of HTML/CSS basics is a plus`,
    requirements: `• Bachelor's degree in Design, HCI, or related field
• 2+ years of professional UI/UX design experience
• Portfolio showcasing web and mobile design projects
• Proficiency in design tools (Figma, Sketch, Adobe XD)
• Strong understanding of user-centered design principles
• Experience with design systems and component libraries
• Excellent visual design and typography skills
• Strong communication and presentation abilities`,
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
• Ensure security compliance and backup strategies
• Collaborate with development teams on deployment strategies

Requirements:
• 3+ years of DevOps/Infrastructure experience
• Strong experience with cloud platforms (AWS preferred)
• Proficiency in containerization and orchestration
• Knowledge of Infrastructure as Code (Terraform, CloudFormation)
• Experience with monitoring tools (Prometheus, Grafana, ELK)`,
    requirements: `• Bachelor's degree in Computer Science or related field
• 3+ years of DevOps or cloud infrastructure experience
• Strong experience with AWS services (EC2, S3, RDS, Lambda)
�� Proficiency in containerization (Docker, Kubernetes)
• Experience with CI/CD tools (Jenkins, GitLab CI, GitHub Actions)
• Knowledge of Infrastructure as Code tools
• Scripting skills (Bash, Python, or similar)
• Strong problem-solving and troubleshooting skills`,
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
• Optimize application performance and scalability
• Participate in code reviews and technical discussions

Requirements:
• 4+ years of full stack development experience
• Strong proficiency in JavaScript/TypeScript
• Experience with React/Vue.js and Node.js
• Knowledge of databases (SQL and NoSQL)
• Familiarity with modern development practices`,
    requirements: `• Bachelor's degree in Computer Science or equivalent
• 4+ years of professional full stack development
• Strong proficiency in JavaScript, TypeScript, and modern frameworks
• Experience with both frontend (React/Vue) and backend (Node.js)
• Knowledge of database design and optimization
• Understanding of RESTful APIs and GraphQL
• Experience with version control and agile methodologies
• Strong analytical and problem-solving skills`,
    type: "full-time",
    salary: "$85,000 - $125,000",
  },
  {
    title: "Mobile App Developer (React Native)",
    company: "MobileFirst Tech",
    location: "Los Angeles, CA",
    description: `We're looking for a React Native developer to build amazing mobile experiences!

Responsibilities:
• Develop cross-platform mobile applications using React Native
• Integrate with native iOS and Android features
• Optimize app performance and user experience
• Work with designers to implement pixel-perfect UIs
• Debug and resolve platform-specific issues
• Publish apps to App Store and Google Play

Requirements:
• 2+ years of React Native development experience
• Strong knowledge of JavaScript and React concepts
• Experience with mobile app deployment and store guidelines
• Understanding of mobile UI/UX patterns
• Knowledge of native mobile development is a plus`,
    requirements: `• Bachelor's degree in Computer Science or related field
• 2+ years of professional React Native development
• Strong proficiency in JavaScript, React, and mobile development
• Experience with iOS and Android platform guidelines
• Knowledge of mobile app performance optimization
• Familiarity with app store submission processes
• Understanding of mobile testing and debugging tools
• Excellent attention to detail and user experience`,
    type: "contract",
    salary: "$70,000 - $100,000",
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/jobboard",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );

    console.log("Connected to MongoDB...");

    // Clear existing jobs
    await Job.deleteMany({});
    console.log("Cleared existing jobs...");

    // Insert seed jobs
    const insertedJobs = await Job.insertMany(seedJobs);
    console.log(`Successfully seeded ${insertedJobs.length} jobs!`);

    console.log("Jobs seeded:");
    insertedJobs.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} at ${job.company} (${job.type})`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
