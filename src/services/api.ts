import axios from 'axios';
import { SupportCase, SupportCaseResponsePagination } from '../types/supportCase';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createSupportCase = async (caseData: Omit<SupportCase, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
  const response = await axios.post<SupportCase>(`${API_BASE_URL}/cases`, caseData);
  return response.data;
};

export const getSupportCases = async (page: number = 1, limit: number = 10) => {
  const response = await axios.get<SupportCaseResponsePagination>(
    `${API_BASE_URL}/support-cases/?page=${page}&size=${limit}`
  );
  
  return {
    cases: response.data.items,
    totalPages: response.data.total_pages,
    totalItems: response.data.total,
    pageSize: response.data.page,
    success: response.data.success,
    message: response.data.message,

  };
};