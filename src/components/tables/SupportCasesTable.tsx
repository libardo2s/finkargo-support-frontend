import React, { useMemo, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { format } from 'date-fns';
import PaginationComponent from './Pagination';
import SupportCaseDetails from '../modals/SupportCaseDetails';
import { SupportCase } from '../../types/supportCase';
import { CaseStatus, CasePriority } from '../../types/supportCase';

interface SupportCasesTableProps {
  cases: SupportCase[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  loading?: boolean;
}

const statusBadgeColors: Record<string, string> = {
  [CaseStatus.PENDING]: 'info',
  [CaseStatus.ON_HOLD]: 'warning',
  [CaseStatus.COMPLETED]: 'success',
  [CaseStatus.IN_PROGRESS]: 'secondary',
  [CaseStatus.REJECTED]: 'danger'
};

const priorityBadgeColors: Record<string, string> = {
  [CasePriority.LOW]: 'success',
  [CasePriority.MEDIUM]: 'warning',
  [CasePriority.HIGH]: 'danger'
};

const EmptyState = () => (
  <tr>
    <td colSpan={6} className="text-center text-muted py-4">
      <i className="bi bi-inbox fs-4"></i>
      <p className="mt-2 mb-0">No se encontraron casos</p>
    </td>
  </tr>
);

const LoadingState = () => (
  <tr>
    <td colSpan={6} className="text-center text-muted py-4">
      <Spinner animation="border" size="sm" className="me-2" />
      Cargando casos...
    </td>
  </tr>
);

export default function SupportCasesTable({
  cases,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  loading = false
}: SupportCasesTableProps) {
  const [selectedCase, setSelectedCase] = useState<SupportCase | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handleShowDetails = (supportCase: SupportCase) => {
    setSelectedCase(supportCase);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedCase(null);
  };

  const caseRows = useMemo(() => {
    return cases.map((supportCase) => (
      <tr key={supportCase.id} className="align-middle">
        <td className="text-truncate" style={{ maxWidth: '200px' }} title={supportCase.id}>
          {supportCase.id}
        </td>
        <td>{supportCase.title}</td>
        <td>
          <span 
            className={`badge bg-${statusBadgeColors[supportCase.status] || 'primary'} text-capitalize`}
          >
            {supportCase.status}
          </span>
        </td>
        <td>
          <span 
            className={`badge bg-${priorityBadgeColors[supportCase.priority] || 'primary'} text-capitalize`}
          >
            {supportCase.priority}
          </span>
        </td>
        <td>
          <small className="text-muted">
            {format(new Date(supportCase.created_at), 'MMM dd, yyyy')}
          </small>
        </td>
        <td className="text-center">
          <Button 
            variant="outline-primary" 
            size="sm"
            onClick={() => handleShowDetails(supportCase)}
            className="px-3"
          >
            <i className="bi bi-eye me-1"></i> Ver
          </Button>
        </td>
      </tr>
    ));
  }, [cases]);

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="text-muted small">
          Mostrando {startItem} a {endItem} de {totalItems} casos
        </div>
      </div>
      
      <div className="table-responsive rounded border">
        <Table hover className="mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ width: '15%' }}>ID</th>
              <th style={{ width: '30%' }}>Título</th>
              <th style={{ width: '15%' }}>Estado</th>
              <th style={{ width: '15%' }}>Prioridad</th>
              <th style={{ width: '15%' }}>Fecha</th>
              <th style={{ width: '10%' }} className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <LoadingState />
            ) : cases.length > 0 ? (
              caseRows
            ) : (
              <EmptyState />
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          disabled={loading}
        />
      </div>

      <SupportCaseDetails 
        show={showDetails}
        onHide={handleCloseDetails}
        supportCase={selectedCase}
      />
    </div>
  );
}