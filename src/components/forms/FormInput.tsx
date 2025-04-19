import { Form } from 'react-bootstrap';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  register: UseFormRegister<any>;
  validation?: Record<string, any>;
  error?: FieldError;
}

export default function FormInput({
  label,
  name,
  type,
  placeholder,
  options,
  register,
  validation,
  error,
}: FormInputProps) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      
      {type === 'select' ? (
        <Form.Select
          {...register(name, validation)}
          isInvalid={!!error}
        >
          <option value="">Seleccione una opción</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      ) : type === 'textarea' ? (
        <Form.Control
          as="textarea"
          rows={3}
          placeholder={placeholder}
          {...register(name, validation)}
          isInvalid={!!error}
        />
      ) : (
        <Form.Control
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
          isInvalid={!!error}
        />
      )}
      
      {error && (
        <Form.Control.Feedback type="invalid">
          {error.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}