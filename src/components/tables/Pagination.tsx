import { Pagination } from 'react-bootstrap';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.Prev 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)} 
      />
      {items}
      <Pagination.Next 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)} 
      />
    </Pagination>
  );
}