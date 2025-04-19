import React, { useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { format } from 'date-fns';
import PaginationComponent from './Pagination';
import { SupportCase } from '../../types/supportCase';

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

const EmptyState = () => (
  <tr>
    <td colSpan={5} className="text-center text-muted py-4">
      No cases found
    </td>
  </tr>
);

const LoadingState = () => (
  <tr>
    <td colSpan={5} className="text-center text-muted py-4">
      Loading cases...
    </td>
  </tr>
);

function getStatusBadgeColor(status: string): string {
  switch(status.toLowerCase()) {
    case CaseStatus.PENDING: return 'info';
    case CaseStatus.ON_HOLD: return 'warning';
    case CaseStatus.COMPLETED: return 'success';
    case CaseStatus.IN_PROGRESS: return 'secondary';
    case CaseStatus.REJECTED: return 'danger';
    default: return 'primary';
  }
}

function getPriorityBadgeColor(priority: string): string {
  switch(priority.toLowerCase()) {
    case CasePriority.LOW: return 'success';
    case CasePriority.MEDIUM: return 'warning';
    case CasePriority.HIGH: return 'danger';
    default: return 'primary';
  }
}

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
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const caseRows = useMemo(() => {
    return cases.map((supportCase) => (
      <tr key={supportCase.id}>
        <td className="text-truncate" style={{ maxWidth: '250px' }} title={supportCase.id}>
          {supportCase.id}
        </td>
        <td>{supportCase.title}</td>
        <td>
          <span className={`badge bg-${getStatusBadgeColor(supportCase.status)}`}>
            {supportCase.status}
          </span>
        </td>
        <td>
          <span className={`badge bg-${getPriorityBadgeColor(supportCase.priority)}`}>
            {supportCase.priority}
          </span>
        </td>
        <td>{format(new Date(supportCase.created_at), 'MMM dd, yyyy HH:mm')}</td>
      </tr>
    ));
  }, [cases]);

  return (
    <div className="mt-4">
      <div className="mb-3">
        <span className="text-muted">
          {startItem} a {endItem} de {totalItems} casos
        </span>
      </div>
      
      <Table striped bordered hover responsive className="mt-2">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Estado</th>
            <th>Priridad</th>
            <th>Fecha de creacion</th>
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
    </div>
  );
}