import { Form } from 'react-bootstrap';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}

export default function FormInput({
  label,
  name,
  type,
  placeholder,
  required = false,
  options = []
}: FormInputProps) {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      {type === 'select' ? (
        <Form.Select name={name} required={required}>
          <option value="">Select an option</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      ) : type === 'textarea' ? (
        <Form.Control 
          as="textarea" 
          name={name} 
          placeholder={placeholder} 
          required={required} 
          rows={3}
        />
      ) : (
        <Form.Control 
          type={type} 
          name={name} 
          placeholder={placeholder} 
          required={required} 
        />
      )}
    </Form.Group>
  );
}