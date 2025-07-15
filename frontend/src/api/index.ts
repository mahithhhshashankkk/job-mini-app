import axios from "axios";
import { Job, Application, ApplicationWithJob } from "../types";

// Use relative URL in production, localhost in development
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
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
    const response = await api.get("/jobs", { params: { type } });
    return response.data;
  },

  getJob: async (id: string): Promise<Job> => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },
};

export const applicationsApi = {
  submitApplication: async (application: Application): Promise<any> => {
    const response = await api.post("/applications", application);
    return response.data;
  },

  getApplications: async (): Promise<ApplicationWithJob[]> => {
    const response = await api.get("/applications");
    return response.data;
  },
};
