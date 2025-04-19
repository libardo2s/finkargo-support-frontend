import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { format } from 'date-fns';
import { getSupportCaseById } from '../services/api';
import { SupportCase } from '../types/supportCase';
import { CaseStatus, CasePriority } from '../types/supportCase';

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

export default function SupportCaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [supportCase, setSupportCase] = useState<SupportCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        setLoading(true);
        const data = await getSupportCaseById(id as string); 
        if (!data.success) {
          throw new Error(data.message);
        }
        setSupportCase(data.case);
      } catch (err) {
        setError('Failed to load support case details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCase();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-2">Cargando detalles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    );
  }

  if (!supportCase) {
    return (
      <div className="py-5">
        <Alert variant="warning">Caso de soporte no encontrado</Alert>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Detalles del Caso</h1>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Información Básica</h5>
              <p><strong>ID:</strong> {supportCase.id}</p>
              <p><strong>Título:</strong> {supportCase.title}</p>
              <p><strong>Descripción:</strong> {supportCase.description || 'N/A'}</p>
              <p>
                <strong>Estado:</strong>{' '}
                <span className={`badge bg-${statusBadgeColors[supportCase.status]}`}>
                  {supportCase.status}
                </span>
              </p>
              <p>
                <strong>Prioridad:</strong>{' '}
                <span className={`badge bg-${priorityBadgeColors[supportCase.priority]}`}>
                  {supportCase.priority}
                </span>
              </p>
            </div>
            <div className="col-md-6">
              <h5>Metadatos</h5>
              <p><strong>Creado el:</strong> {format(new Date(), 'PPPpp')}</p>
              <p><strong>Actualizado el:</strong> {format(new Date(), 'PPPpp')}</p>
              <p><strong>Ejecutado por:</strong> {supportCase.executed_by || 'N/A'}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h5>Información de Base de Datos</h5>
              <div className="mb-3">
                <p><strong>Base de datos:</strong> {supportCase.database_name || 'N/A'}</p>
                <p><strong>Esquema:</strong> {supportCase.schema_name || 'N/A'}</p>
              </div>
              <div className="mb-3">
                <p><strong>Consulta SQL:</strong></p>
                <pre className="bg-light p-3 rounded" style={{whiteSpace: 'pre-wrap'}}>
                  {supportCase.sql_query || 'N/A'}
                </pre>
              </div>
              <div className="mb-3">
                <p><strong>Resultado de ejecución:</strong></p>
                <pre className="bg-light p-3 rounded" style={{whiteSpace: 'pre-wrap'}}>
                  {supportCase.execution_result || 'N/A'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}