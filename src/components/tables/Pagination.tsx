import React from 'react';
import { Pagination, Form, Row, Col } from 'react-bootstrap';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
  maxVisiblePages?: number;
  disabled?: boolean;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50, 100],
  maxVisiblePages = 5,
  disabled = false
}) => {
  // Calculate visible page range
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const items = [];
  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => !disabled && onPageChange(number)}
        disabled={disabled}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Row className="align-items-center flex-wrap">
      <Col xs={12} md="auto" className="mb-2 mb-md-0">
        <Pagination size="sm" className="mb-0">
          <Pagination.First 
            disabled={currentPage === 1 || disabled}
            onClick={() => !disabled && onPageChange(1)}
            aria-label="First page"
          />
          <Pagination.Prev 
            disabled={currentPage === 1 || disabled}
            onClick={() => !disabled && onPageChange(currentPage - 1)}
            aria-label="Previous page"
          />
          {startPage > 1 && <Pagination.Ellipsis disabled />}
          {items}
          {endPage < totalPages && <Pagination.Ellipsis disabled />}
          <Pagination.Next 
            disabled={currentPage === totalPages || disabled}
            onClick={() => !disabled && onPageChange(currentPage + 1)}
            aria-label="Next page"
          />
          <Pagination.Last 
            disabled={currentPage === totalPages || disabled}
            onClick={() => !disabled && onPageChange(totalPages)}
            aria-label="Last page"
          />
        </Pagination>
      </Col>
      
      <Col xs={6} md="auto" className="mt-2 mt-md-0">
        <Form.Group as={Row} className="align-items-center g-2">
          <Form.Label column htmlFor="pageSizeSelect" className="mb-0" style={{ whiteSpace: 'nowrap' }}>
            items por pagina:
          </Form.Label>
          <Col>
            <Form.Select
              id="pageSizeSelect"
              value={pageSize}
              onChange={(e) => !disabled && onPageSizeChange(Number(e.target.value))}
              size="sm"
              disabled={disabled}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
      </Col>
      
      <Col xs={6} md="auto" className="text-muted mt-2 mt-md-0 text-end text-md-start">
        Pagina {currentPage} de {totalPages}
      </Col>
    </Row>
  );
};

export default React.memo(PaginationComponent);