import axios from 'axios';
import { Job, Application, ApplicationWithJob } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jobsApi = {
  getJobs: async (type?: string): Promise<Job[]> => {
    const response = await api.get('/jobs', { params: { type } });
    return response.data;
  },

  getJob: async (id: string): Promise<Job> => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },
};

export const applicationsApi = {
  submitApplication: async (application: Application): Promise<any> => {
    const response = await api.post('/applications', application);
    return response.data;
  },

  getApplications: async (): Promise<ApplicationWithJob[]> => {
    const response = await api.get('/applications');
    return response.data;
  },
};
