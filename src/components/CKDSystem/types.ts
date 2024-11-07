export interface FormData {
  hospitalId: string;
  hospitalName: string;
  name: string;
  dob: string;
  creatinine: string;
  urea: string;
  hemoglobin: string;
  bp: string;
  diabetes: string;
  albumin: string;
}

export interface AnalysisResult {
  risk: string;
  stage: string;
  advice: string;
  diet: string;
  outcomes: string;
}

export interface Hospital {
  id: string;
  name: string;
}

export interface District {
  name: string;
  hospitals: Hospital[];
}

export interface Region {
  region: string;
  districts: District[];
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}