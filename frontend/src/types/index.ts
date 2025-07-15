export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  type: "full-time" | "part-time" | "remote" | "contract";
  salary: string;
  createdAt: string;
}

export interface Application {
  _id?: string;
  job_id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_letter: string;
  appliedAt?: string;
}

export interface ApplicationWithJob extends Application {
  job_id: {
    _id: string;
    title: string;
    company: string;
  };
}
