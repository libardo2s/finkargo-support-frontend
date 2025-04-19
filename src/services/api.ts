import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Adjust to your backend URL

interface ApiResponse<T> {
  data: T;
  totalPages: number;
}

export interface SupportCase {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export const createSupportCase = async (caseData: Omit<SupportCase, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
  const response = await axios.post<SupportCase>(`${API_BASE_URL}/cases`, caseData);
  return response.data;
};

export const getSupportCases = async (page: number = 1, limit: number = 10) => {
  const response = await axios.get<ApiResponse<SupportCase[]>>(
    `${API_BASE_URL}/cases?page=${page}&limit=${limit}`
  );
  return {
    cases: response.data.data,
    totalPages: response.data.totalPages
  };
};