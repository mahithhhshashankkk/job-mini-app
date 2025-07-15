import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jobsApi } from '../api';
import { Job } from '../types';

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
      setError('Failed to fetch job details');
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-yellow-100 text-yellow-800';
      case 'remote': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error || 'Job not found'}</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-xl text-gray-600 mb-1">{job.company}</p>
            <p className="text-gray-500">{job.location}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}>
            {job.type}
          </span>
        </div>

        <div className="mb-6">
          <h2
