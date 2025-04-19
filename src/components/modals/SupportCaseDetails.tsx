import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { format } from 'date-fns';
import { SupportCase } from '../../types/supportCase';
import { CaseStatus, CasePriority } from '../../types/supportCase';

interface SupportCaseDetailsProps {
    show: boolean;
    onHide: () => void;
    supportCase: SupportCase | null;
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

export default function SupportCaseDetails({ show, onHide, supportCase }: SupportCaseDetailsProps) {
    if (!supportCase) return null;

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Caso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                        <p><strong>Creado el:</strong> {format(new Date(supportCase.created_at), 'PPPpp')}</p>
                        <p><strong>Actualizado el:</strong> {format(new Date(supportCase.updated_at), 'PPPpp')}</p>
                        <p><strong>Ejecutado por:</strong> {supportCase.executed_by || 'N/A'}</p>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12">
                        <h5>Información de Base de Datos</h5>
                        <div className="mb-2">
                            <p><strong>Base de datos:</strong> {supportCase.database_name || 'N/A'}</p>
                            <p><strong>Esquema:</strong> {supportCase.schema_name || 'N/A'}</p>
                        </div>
                        <div className="mb-2">
                            <p><strong>Consulta SQL:</strong></p>
                            <pre className="bg-light p-3 rounded" style={{whiteSpace: 'pre-wrap'}}>
                                {supportCase.sql_query || 'N/A'}
                            </pre>
                        </div>
                        <div className="mb-2">
                            <p><strong>Resultado de ejecución:</strong></p>
                            <pre className="bg-light p-3 rounded" style={{whiteSpace: 'pre-wrap'}}>
                                {supportCase.execution_result || 'N/A'}
                            </pre>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}