# 🚀 CareerBoost Job Board

A modern, full-stack job board application demonstrating end-to-end development skills with React, TypeScript, Node.js, Express, and MongoDB.

![CareerBoost Demo](https://img.shields.io/badge/Demo-Live-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178c6?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47a248?style=for-the-badge&logo=mongodb)

## ✨ Features

### 🎯 Core Functionality

- **Browse Job Listings** - View all available jobs with advanced filtering
- **Job Details** - Comprehensive job descriptions, requirements, and company information
- **Application System** - Submit applications with robust form validation
- **Admin Dashboard** - Manage and review submitted applications
- **Responsive Design** - Seamless experience across all devices

### 🔧 Technical Features

- **Real-time Filtering** - Filter jobs by type (full-time, part-time, remote, contract)
- **Form Validation** - Client-side validation with user-friendly error messages
- **Modern UI/UX** - Professional design with smooth animations and micro-interactions
- **RESTful API** - Well-structured backend with proper HTTP methods
- **Type Safety** - Full TypeScript implementation
- **Background Animations** - Floating laptop and money icons with gradient backgrounds
- **Professional Typography** - Google Fonts integration (Sora, Inter, Poppins)
- **Enhanced Hover Effects** - Interactive elements with scale, shadow, and color transitions

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server
- **Google Fonts** - Professional typography (Sora, Inter, Poppins)

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (optional - can run with mock data)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/careerboost-job-board.git
cd careerboost-job-board
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env

# Start backend server with mock data (recommended for quick start)
npm run dev

# OR start with MongoDB (requires MongoDB installation)
npm run dev-mongo
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🗄️ Database Setup

### Option 1: Mock Data (Recommended for Quick Start)

The application comes with built-in mock data that works out of the box. No database setup required!

```bash
cd backend
npm run dev  # Starts server with mock data
```

### Option 2: MongoDB Setup

For production or persistent data storage:

#### Install MongoDB

```bash
# macOS (using Homebrew)
brew install mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb

# Windows - Download from https://www.mongodb.com/try/download/community
```

#### Initialize Database

```bash
# Start MongoDB service
# macOS/Linux
brew services start mongodb-community
# OR
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services or run mongod.exe
```

#### Configure Environment Variables

```bash
# In backend/.env
MONGODB_URI=mongodb://localhost:27017/jobboard
PORT=5000
NODE_ENV=development
```

#### Seed Database with Sample Data

```bash
cd backend
npm run seed  # Populates database with 6 sample jobs
```

## 📁 Project Structure

```
careerboost-job-board/
├── backend/                 # Backend API server
│   ├── models/             # MongoDB data models
│   │   ├── job.js         # Job schema
│   │   └── application.js # Application schema
│   ├── routes/            # API routes
│   │   ├── jobs.js        # Job endpoints
│   │   └── application.js # Application endpoints
│   ├── seed.js            # Database seeding script
│   ├── dev-server.js      # MongoDB development server
│   ├── start-dev.js       # Mock data development server
│   ├── .env.example       # Environment variables template
│   └── package.json
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── layout.tsx        # Main layout with navigation
│   │   │   ├── jobcard.tsx       # Job listing card
│   │   │   └── notification.tsx  # Toast notifications
│   │   ├── pages/         # Page components
│   │   │   ├── home.tsx          # Homepage with job listings
│   │   │   ├── jobdetail.tsx     # Individual job details
│   │   │   ├── applicationform.tsx # Job application form
│   │   │   └── admin.tsx         # Admin dashboard
│   │   ├── api/           # API service functions
│   │   │   └── index.ts          # Axios HTTP client setup
│   │   ├── types/         # TypeScript type definitions
│   │   │   └── index.ts          # Job and Application interfaces
│   │   ├── index.css      # Global styles and animations
│   │   └── main.tsx       # Application entry point
│   ├── index.html         # HTML template
│   ├── vite.config.ts     # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── package.json
└── README.md              # This file
```

## 🔗 API Endpoints

### Jobs

- `GET /api/jobs` - Get all jobs (with optional type filter)
  ```bash
  curl http://localhost:5000/api/jobs
  curl http://localhost:5000/api/jobs?type=remote
  ```
- `GET /api/jobs/:id` - Get specific job details
  ```bash
  curl http://localhost:5000/api/jobs/1
  ```

### Applications

- `POST /api/applications` - Submit a job application
  ```bash
  curl -X POST http://localhost:5000/api/applications \
    -H "Content-Type: application/json" \
    -d '{"job_id":"1","name":"John Doe","email":"john@example.com","resume_link":"https://example.com/resume.pdf","cover_letter":"I am interested in this position..."}'
  ```
- `GET /api/applications` - Get all applications (admin view)
  ```bash
  curl http://localhost:5000/api/applications
  ```

### Health Check

- `GET /api/health` - Server health status
  ```bash
  curl http://localhost:5000/api/health
  ```

## 💡 Usage Examples

### For Job Seekers

1. **Browse Jobs**: Visit homepage to see all available positions
2. **Filter Jobs**: Use filter buttons to view specific job types
3. **View Details**: Click "View Details" on any job card
4. **Apply**: Fill out the application form with your information

### For Employers/Admins

1. **View Applications**: Navigate to `/admin`
2. **Review Candidates**: See all submitted applications in a table format
3. **Access Resumes**: Click resume links to view candidate documents

## 🎨 Design Features

### Visual Enhancements

- **Modern Typography** - Professional Google Fonts (Sora, Inter, Poppins)
- **Gradient Backgrounds** - Smooth color transitions and overlays
- **Floating Animations** - Laptop and money icons with rotation effects
- **Glass Morphism** - Backdrop blur effects for modern aesthetics
- **Micro-interactions** - Button hover effects, card animations, transitions

### Responsive Design

- **Mobile-First** - Optimized for all screen sizes
- **Flexible Layouts** - CSS Grid and Flexbox for consistent alignment
- **Touch-Friendly** - Proper spacing and sizing for mobile devices

## 🧪 Testing

### Manual Testing Checklist

- [ ] Homepage loads with job listings
- [ ] Filter buttons work correctly
- [ ] Job detail pages display full information
- [ ] Application form validation works
- [ ] Applications submit successfully
- [ ] Admin panel shows submitted applications
- [ ] Responsive design works on mobile devices

### API Testing

```bash
# Test job listings
curl http://localhost:5000/api/jobs

# Test job details
curl http://localhost:5000/api/jobs/1

# Test application submission
curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -d '{"job_id":"1","name":"Test User","email":"test@example.com","resume_link":"https://example.com/resume.pdf","cover_letter":"Test cover letter"}'
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)

```bash
# Build for production
cd frontend
npm run build

# The dist/ folder contains the production build
```

### Backend (Heroku/Railway/Fly.io)

```bash
# Ensure you have a Procfile for Heroku
echo "web: node server.js" > backend/Procfile

# Set environment variables
export MONGODB_URI=your_production_mongodb_url
export PORT=5000
```

### Environment Variables

Set these in your production environment:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard
PORT=5000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **MongoDB** - For the flexible NoSQL database
- **Vite** - For the lightning-fast build tool
- **Google Fonts** - For beautiful typography

## 📞 Support

For support, questions, or contributions:

- Open an issue in the GitHub repository
- Contact: [your-email@example.com]

---

**Made with ❤️ for the developer community**

### 🌟 Star this repository if you found it helpful!
