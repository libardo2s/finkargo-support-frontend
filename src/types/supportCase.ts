export interface SupportCase {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    created_at: string;
    updated_at: string;
    execution_result: string
    database_name: string;
    schema_name: string
    sql_query: string
    executed_by: string
  }

  export interface SupportCaseResponse {
    success: boolean;
    message: string;
    case: SupportCase;
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

  export enum CaseStatus {
    PENDING = "pendiente",
    COMPLETED = "completado",
    IN_PROGRESS = "en_proceso",
    REJECTED = "rechazado",
    ON_HOLD = "en_pausa"
  }
  
  export enum CasePriority {
    LOW = 'baja',
    MEDIUM = 'media',
    HIGH = 'alta'
  }

  export interface GetSupportCasesParams {
    page?: number;
    size?: number;
    id?: string;
    status?: string;
    priority?: string;
    start_date?: string;
    end_date?: string;
  }

  export interface SupportCaseFormData {
    title: string;
    description: string;
    priority: CasePriority;
    status: CaseStatus;
    database_name: string;
    schema_name: string;
    sql_query: string;
    execution_result?: string;
    executed_by?: string;
  }
  