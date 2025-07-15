import React, { useState, useEffect } from "react";
import { jobsApi } from "../api";
import { Job } from "../types";
import JobCard from "../components/jobcard";

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    fetchJobs();
  }, [filter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const jobsData = await jobsApi.getJobs(filter || undefined);
      setJobs(jobsData);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(
        "Unable to load jobs. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (type: string) => {
    setFilter(filter === type ? "" : type);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="spinner"></div>
        <p className="mt-4 text-gray-600">Loading amazing opportunities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <svg
            className="w-16 h-16 mx-auto text-red-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchJobs}
            className="btn-primary inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-12 fade-in">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Find Your Dream Job
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Discover opportunities that match your skills and ambitions. Join
          thousands of professionals who found their perfect career through
          CareerBoost.
        </p>
        <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Verified Companies
          </div>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Remote Friendly
          </div>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-purple-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Quick Apply
          </div>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => handleFilterChange("")}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            filter === ""
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-gray-700 border border-gray-300 hover:border-blue-300 hover:shadow-md"
          }`}
        >
          All Jobs
        </button>
        {["full-time", "part-time", "remote", "contract"].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange(type)}
            className={`px-6 py-3 rounded-lg font-medium capitalize transition-all duration-200 ${
              filter === type
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-300 hover:border-blue-300 hover:shadow-md"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Jobs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No jobs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
