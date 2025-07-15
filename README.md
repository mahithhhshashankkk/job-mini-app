# CareerBoost Job Board 🚀

A modern, full-stack job board application built with React, TypeScript, Node.js, and Express. This application demonstrates end-to-end development skills with a clean, responsive UI and robust backend functionality.

## ✨ Features

### 🎯 Core Features

- **Browse Job Listings** - View all available jobs with filtering capabilities
- **Job Details** - Detailed job descriptions, requirements, and company information
- **Application System** - Submit applications with form validation
- **Admin Dashboard** - Manage and review submitted applications
- **Responsive Design** - Works seamlessly on desktop and mobile devices

### 🔧 Technical Features

- **Real-time Filtering** - Filter jobs by type (full-time, part-time, remote, contract)
- **Form Validation** - Client-side validation with user-friendly error messages
- **Modern UI/UX** - Clean design with smooth animations and transitions
- **RESTful API** - Well-structured backend with proper HTTP methods
- **Type Safety** - Full TypeScript implementation for better development experience

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database (with in-memory option for development)
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd job-board-app
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

   The backend will start on `http://localhost:5000` with mock data

2. **Start the frontend development server**

   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to use the application

## 📁 Project Structure

```
job-board-app/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── start-dev.js     # Development server with mock data
│   ├── dev-server.js    # MongoDB development server
│   ├── seed.js          # Database seeding script
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/       # Page components
│   │   ├── api/         # API service functions
│   │   ├── types/       # TypeScript type definitions
│   │   └── index.css    # Global styles and Tailwind imports
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
└── README.md
```

## 🔗 API Endpoints

### Jobs

- `GET /api/jobs` - Get all jobs (with optional type filter)
- `GET /api/jobs/:id` - Get specific job details

### Applications

- `POST /api/applications` - Submit a job application
- `GET /api/applications` - Get all applications (admin view)

### Health Check

- `GET /api/health` - Server health status

## 💡 Usage Examples

### Browsing Jobs

1. Visit the homepage to see all available jobs
2. Use filter buttons to view jobs by type
3. Click "View Details" on any job card to see full information

### Applying for Jobs

1. Click "Apply Now" on a job detail page
2. Fill out the application form with:
   - Full name
   - Email address
   - Resume link (URL)
   - Cover letter (minimum 50 characters)
3. Submit the application

### Admin Features

1. Navigate to `/admin` to view all applications
2. Review applicant information and cover letters
3. Access resume links directly from the table

## 🎨 Design Features

- **Modern UI** - Clean, professional design with consistent spacing
- **Responsive Layout** - Mobile-first approach with Tailwind CSS
- **Interactive Elements** - Hover effects, smooth transitions, and loading states
- **Accessibility** - Proper ARIA labels and keyboard navigation
- **Visual Feedback** - Loading spinners, success/error notifications

## 🔮 Future Enhancements

- **User Authentication** - Login system for job seekers and employers
- **Job Posting** - Allow companies to post new job listings
- **Advanced Search** - Search by keywords, location, salary range
- **Email Notifications** - Automated emails for application confirmations
- **File Upload** - Direct resume upload instead of URL links
- **Company Profiles** - Detailed company information and branding
- **Analytics Dashboard** - Application metrics and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Made with ❤️ for the developer community**
