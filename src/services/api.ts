import axios from 'axios';
import { SupportCase, SupportCaseResponsePagination, GetSupportCasesParams, SupportCaseResponse, SupportCaseFormData } from '../types/supportCase';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createSupportCase = async (caseData: SupportCaseFormData) => {
  const response = await axios.post<SupportCase>(`${API_BASE_URL}/support-cases`, caseData);
  return response.data;
};

export const getSupportCases = async (params: GetSupportCasesParams = {}) => {
  // Set default values if not provided
  const {
    page = 1,
    size = 10,
    id = '',
    status = '',
    priority = '',
    start_date = '',
    end_date = ''
  } = params;

  // Build query string
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('size', size.toString());

  if (id) queryParams.append('id', id);
  if (status) queryParams.append('status', status);
  if (priority) queryParams.append('priority', priority);
  if (start_date) queryParams.append('start_date', start_date);
  if (end_date) queryParams.append('end_date', end_date);

  const response = await axios.get<SupportCaseResponsePagination>(
    `${API_BASE_URL}/support-cases/?${queryParams.toString()}`
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

export const getSupportCaseById = async (id: string) => {
  const response = await axios.get<SupportCaseResponse>(`${API_BASE_URL}/support-cases/case/${id}`);
  return response.data;
}