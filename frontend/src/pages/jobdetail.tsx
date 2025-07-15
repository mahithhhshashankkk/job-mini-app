import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jobsApi } from "../api";
import { Job } from "../types";

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchJob(id);
    }
  }, [id]);

  const fetchJob = async (jobId: string) => {
    try {
      setLoading(true);
      const jobData = await jobsApi.getJob(jobId);
      setJob(jobData);
    } catch (err) {
      setError("Failed to fetch job details");
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="spinner"></div>
        <p className="mt-4 text-gray-600">Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error || "Job not found"}</p>
        <Link
          to="/"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <div className="card">
        <div className="p-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8 gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {job.title}
              </h1>
              <p className="text-xl text-gray-600 mb-2 font-semibold">
                {job.company}
              </p>
              <p className="text-gray-500 flex items-center">
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
            <div className="flex-shrink-0">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium border ${getTypeColor(job.type)}`}
              >
                {job.type}
              </span>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Job Description
            </h2>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50 p-6 rounded-lg border border-gray-200">
              {job.description}
            </div>
          </div>

          {/* Requirements Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Requirements
            </h3>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50 p-6 rounded-lg border border-gray-200">
              {job.requirements}
            </div>
          </div>

          {/* Salary Section */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Salary</h3>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <p className="text-3xl font-bold text-green-600">{job.salary}</p>
              <p className="text-green-700 text-sm mt-1">Annual salary range</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <Link
              to={`/jobs/${job._id}/apply`}
              className="btn-primary inline-flex items-center justify-center px-8 py-4 text-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Apply Now
            </Link>
            <Link
              to="/"
              className="btn-secondary inline-flex items-center justify-center px-8 py-4 text-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
