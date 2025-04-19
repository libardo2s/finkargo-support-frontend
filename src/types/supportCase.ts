export interface SupportCase {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    created_at: string;
    updated_at: string;
  }
  
  export interface CreateSupportCaseDto {
    title: string;
    description: string;
    priority: 'baja' | 'media' | 'alta';
  }
  
  export interface SupportCaseResponsePagination {
    page: number;
    size: number;
    total: number;
    success: boolean;
    message: string;
    items: SupportCase[];
    total_pages: number;
  }