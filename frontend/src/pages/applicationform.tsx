import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobsApi, applicationsApi } from "../api";
import { Job, Application } from "../types";
import Notification from "../components/notification";

const ApplicationForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info";
    message: string;
    isVisible: boolean;
  }>({ type: "info", message: "", isVisible: false });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume_link: "",
    cover_letter: "",
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
      console.error("Failed to fetch job details");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.resume_link.trim()) {
      newErrors.resume_link = "Resume link is required";
    } else if (!/^https?:\/\/.+/.test(formData.resume_link)) {
      newErrors.resume_link = "Please enter a valid URL";
    }

    if (!formData.cover_letter.trim()) {
      newErrors.cover_letter = "Cover letter is required";
    } else if (formData.cover_letter.length < 50) {
      newErrors.cover_letter = "Cover letter must be at least 50 characters";
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
        ...formData,
      };

      await applicationsApi.submitApplication(application);
      setNotification({
        type: "success",
        message:
          "Application submitted successfully! Redirecting to jobs page...",
        isVisible: true,
      });
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setNotification({
        type: "error",
        message: "Failed to submit application. Please try again.",
        isVisible: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
    <>
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() =>
          setNotification((prev) => ({ ...prev, isVisible: false }))
        }
      />
      <div className="max-w-2xl mx-auto fade-in page-transition">
        <div className="card application-form">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Apply for Position
            </h1>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900">
                {job.title}
              </h2>
              <p className="text-gray-600">
                {job.company} • {job.location}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="form-label">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? "form-input-error" : ""}`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? "form-input-error" : ""}`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="resume_link" className="form-label">
                  Resume Link *
                </label>
                <input
                  type="url"
                  id="resume_link"
                  name="resume_link"
                  value={formData.resume_link}
                  onChange={handleChange}
                  className={`form-input ${errors.resume_link ? "form-input-error" : ""}`}
                  placeholder="https://example.com/your-resume.pdf"
                />
                {errors.resume_link && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.resume_link}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="cover_letter" className="form-label">
                  Cover Letter *
                </label>
                <textarea
                  id="cover_letter"
                  name="cover_letter"
                  value={formData.cover_letter}
                  onChange={handleChange}
                  rows={8}
                  className={`form-input ${errors.cover_letter ? "form-input-error" : ""}`}
                  placeholder="Write your cover letter here (minimum 50 characters)..."
                />
                {errors.cover_letter && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cover_letter}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.cover_letter.length}/50 characters minimum
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg
                        className="w-4 h-4 ml-2"
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
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/jobs/${id}`)}
                  className="flex-1 btn-secondary inline-flex items-center justify-center"
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
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationForm;
