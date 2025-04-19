import { Table, Pagination } from 'react-bootstrap';
import { SupportCase } from '../../types/supportCase';
import PaginationComponent from './Pagination';

interface SupportCasesTableProps {
  cases: SupportCase[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function SupportCasesTable({
  cases,
  currentPage,
  totalPages,
  onPageChange
}: SupportCasesTableProps) {
  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((supportCase) => (
            <tr key={supportCase.id}>
              <td>{supportCase.id}</td>
              <td>{supportCase.title}</td>
              <td>{supportCase.status}</td>
              <td>{supportCase.priority}</td>
              <td>{new Date(supportCase.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}