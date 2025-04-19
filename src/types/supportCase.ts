export interface SupportCase {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateSupportCaseDto {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
  }