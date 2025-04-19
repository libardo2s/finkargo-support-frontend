import React, { useMemo, useState, useEffect } from 'react';
import { Table, Button, Spinner, Form, Row, Col } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';
import PaginationComponent from './Pagination';
import { SupportCase } from '../../types/supportCase';
import { CaseStatus, CasePriority } from '../../types/supportCase';
import { useNavigate } from 'react-router-dom';

interface SupportCasesTableProps {
  cases: SupportCase[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onFilterChange: (filters: any) => void;
  loading?: boolean;
  onSearch: () => void;
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
  onFilterChange,
  onSearch,
  loading = false
}: SupportCasesTableProps) {
  const [selectedCase, setSelectedCase] = useState<SupportCase | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState({
    id: '',
    status: '',
    priority: '',
    startDate: '',
    endDate: ''
  });

  const navigate = useNavigate();

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

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchClick = () => {
    onFilterChange(filters);
    onSearch();
  };

  const handleClearFilters = () => {
    setFilters({
      id: '',
      status: '',
      priority: '',
      startDate: '',
      endDate: ''
    });
    onFilterChange({});
    onSearch(); 
  }

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
            {format(parseISO(supportCase.created_at), 'MMM dd, yyyy')}
          </small>
        </td>
        <td className="text-center">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => navigate(`/track-cases/${supportCase.id}`)}
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
      <div className="bg-light p-3 mb-3 rounded">
        <h5 className="mb-3">Filtros</h5>
        <Row>
          <Col md={3}>
            <Form.Group controlId="filterId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={filters.id}
                onChange={handleFilterChange}
                placeholder="Buscar por ID"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="filterStatus">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">Todos</option>
                <option value={CaseStatus.PENDING}>Pendiente</option>
                <option value={CaseStatus.ON_HOLD}>En Pausa</option>
                <option value={CaseStatus.IN_PROGRESS}>En proceso</option>
                <option value={CaseStatus.REJECTED}>Rechazado</option>
                <option value={CaseStatus.COMPLETED}>Completado</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="filterPriority">
              <Form.Label>Prioridad</Form.Label>
              <Form.Select
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
              >
                <option value="">Todas</option>
                <option value={CasePriority.LOW}>Baja</option>
                <option value={CasePriority.MEDIUM}>Media</option>
                <option value={CasePriority.HIGH}>Alta</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="filterDateRange">
              <Form.Label>Rango de fechas</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    placeholder="Desde"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    placeholder="Hasta"
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
          <Form.Group controlId="filterDateRange">
          <Button
              variant="primary"
              onClick={handleSearchClick}
              disabled={loading}
              className="w-100"
            >
              <i className="bi bi-search me-2"></i>
              Buscar
            </Button>
            <Button
              variant="primary"
              onClick={handleClearFilters}
              disabled={loading}
              className="w-100 mt-2"
            >
              <i className="bi bi-search me-2"></i>
              Limpiar Filtros
            </Button>

          </Form.Group>
          </Col>
        </Row>
      </div>

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
    </div>
  );
}