import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsApi, applicationsApi } from '../api';
import { Job, Application } from '../types';

const ApplicationForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume_link: '',
    cover_letter: ''
  });

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
      console.error('Failed to fetch job details');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.resume_link.trim()) {
      newErrors.resume_link = 'Resume link is required';
    } else if (!/^https?:\/\/.+/.test(formData.resume_link)) {
      newErrors.resume_link = 'Please enter a valid URL';
    }

    if (!formData.cover_letter.trim()) {
      newErrors.cover_letter = 'Cover letter is required';
    } else if (formData.cover_letter.length < 50) {
      newErrors.cover_letter = 'Cover letter must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !id) return;

    setSubmitting(true);
    try {
      const application: Application = {
        job_id: id,
        ...formData
      };

      await applicationsApi.submitApplication(application);
      alert('Application submitted successfully!');
      navigate('/');
    } catch (err) {
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>Job not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for Position</h1>
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
          <p className="text-gray-600">{job.company} • {job.location}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="resume_link" className="block text-sm font-medium text-gray-700 mb-2">
              Resume Link *
            </label>
            <input
              type="url"
              id="resume_link"
              name="resume_link"
              value={formData.resume_link}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.resume_link ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/your-resume.pdf"
            />
            {errors.resume_link && <p className="mt-1 text-sm text-red-600">{errors.resume_link}</p>}
          </div>

          <div>
            <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter *
            </label>
            <textarea
              id="cover_letter"
              name="cover_letter"
              value={formData.cover_letter}
              onChange={handleChange}
              rows={8}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.cover_letter ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Write your cover letter here (minimum 50 characters)..."
            />
            {errors.cover_letter && <p className="mt-1 text-sm text-red-600">{errors.cover_letter}</p>}
            <p className="mt-1 text-sm text-gray-500">
              {formData.cover_letter.length}/50 characters minimum
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/jobs/${id}`)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
