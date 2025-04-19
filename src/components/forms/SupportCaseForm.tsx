import { Form, Button, Card } from 'react-bootstrap';
import FormInput from './FormInput';

export default function SupportCaseForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <FormInput 
            label="Title"
            name="title"
            type="text"
            placeholder="Enter case title"
            required
          />
          <FormInput 
            label="Description"
            name="description"
            type="textarea"
            placeholder="Describe your issue"
            required
          />
          <FormInput 
            label="Priority"
            name="priority"
            type="select"
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' }
            ]}
            required
          />
          <Button variant="primary" type="submit">
            Submit Case
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}