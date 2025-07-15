import React from "react";
import { Link } from "react-router-dom";
import { Job } from "../types";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-green-100 text-green-800 border-green-200";
      case "part-time":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "remote":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "contract":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="card fade-in h-full">
      <div className="p-8 flex flex-col h-full">
        {/* Header section with title and badge */}
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex-1 pr-4 leading-tight">
            {job.title}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 border ${getTypeColor(job.type)}`}
          >
            {job.type}
          </span>
        </div>

        {/* Company and location section */}
        <div className="mb-6">
          <p className="text-gray-600 font-semibold text-lg mb-2 flex items-center">
            <svg
              className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            {job.company}
          </p>
          <p className="text-gray-500 flex items-center">
            <svg
              className="w-4 h-4 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {job.location}
          </p>
        </div>

        {/* Description section - flexible to take remaining space */}
        <div className="flex-1 mb-8">
          <p className="text-gray-700 line-clamp-3 leading-relaxed text-sm">
            {job.description}
          </p>
        </div>

        {/* Footer section with salary and button */}
        <div className="mt-auto">
          {/* Salary section */}
          <div className="flex items-center text-green-600 font-semibold text-lg mb-4">
            <svg
              className="w-5 h-5 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
            <span className="truncate">{job.salary}</span>
          </div>

          {/* Button section - full width and properly contained */}
          <div className="w-full">
            <Link
              to={`/jobs/${job._id}`}
              className="job-card-btn w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
            >
              <span>View Details</span>
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
