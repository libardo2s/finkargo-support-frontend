import { useState } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { createSupportCase } from '../../services/api';
import { CaseStatus, CasePriority, SupportCaseFormData } from '../../types/supportCase';
import { useForm } from 'react-hook-form';

export default function SupportCaseForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupportCaseFormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      await createSupportCase({
        ...data,
        // Ensure optional fields are either string or undefined
        execution_result: data.execution_result || undefined,
        executed_by: data.executed_by || undefined
      });

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Card>
      <Card.Body>
        {submitSuccess && (
          <Alert variant="success" dismissible onClose={() => setSubmitSuccess(false)}>
            ¡Caso creado exitosamente!
          </Alert>
        )}

        {submitError && (
          <Alert variant="danger" dismissible onClose={() => setSubmitError(null)}>
            {submitError}
          </Alert>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el título del caso"
              isInvalid={!!errors.title}
              {...register('title', { required: 'El título es requerido' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Describa el problema"
              isInvalid={!!errors.description}
              {...register('description', {
                required: 'La descripción es requerida',
                minLength: {
                  value: 10,
                  message: 'La descripción debe tener al menos 10 caracteres'
                }
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Priority */}
          <Form.Group className="mb-3">
            <Form.Label>Prioridad</Form.Label>
            <Form.Select
              isInvalid={!!errors.priority}
              {...register('priority', { required: 'La prioridad es requerida' })}
            >
              <option value={CasePriority.LOW}>Baja</option>
              <option value={CasePriority.MEDIUM}>Media</option>
              <option value={CasePriority.HIGH}>Alta</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.priority?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              isInvalid={!!errors.status}
              {...register('status', { required: 'El estado es requerido' })}
            >
              <option value={CaseStatus.PENDING}>Pendiente</option>
              <option value={CaseStatus.IN_PROGRESS}>En proceso</option>
              <option value={CaseStatus.COMPLETED}>Completado</option>
              <option value={CaseStatus.REJECTED}>Rechazado</option>
              <option value={CaseStatus.ON_HOLD}>En pausa</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.status?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Database Name */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre de la base de datos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la base de datos"
              isInvalid={!!errors.database_name}
              {...register('database_name', {
                required: 'El nombre de la base de datos es requerido'
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.database_name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Schema Name */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre del esquema</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del esquema"
              isInvalid={!!errors.schema_name}
              {...register('schema_name', {
                required: 'El nombre del esquema es requerido'
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.schema_name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* SQL Query */}
          <Form.Group className="mb-3">
            <Form.Label>Consulta SQL</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Ingrese la consulta SQL relacionada al caso"
              isInvalid={!!errors.sql_query}
              {...register('sql_query', {
                required: 'La consulta SQL es requerida',
                validate: (value) =>
                  value.trim().length > 0 || 'La consulta SQL no puede estar vacía'
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.sql_query?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Execution Result (Optional) */}
          <Form.Group className="mb-3">
            <Form.Label>Resultado de ejecución</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese el resultado de ejecución (opcional)"
              {...register('execution_result')}
            />
          </Form.Group>

          {/* Executed By (Optional) */}
          <Form.Group className="mb-3">
            <Form.Label>Ejecutado por</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del ejecutor (opcional)"
              {...register('executed_by')}
            />
          </Form.Group>

          <div className="d-grid gap-2 mt-4">
            <Button
              variant="primary"
              type="submit"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Enviando...
                </>
              ) : (
                'Crear Caso de Soporte'
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}