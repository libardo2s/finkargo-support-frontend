import { useState, useEffect, useCallback } from 'react';
import SupportCasesTable from '../components/tables/SupportCasesTable';
import { getSupportCases } from '../services/api';
import { SupportCase } from '../types/supportCase';
import { Alert, Spinner, Container } from 'react-bootstrap';

export default function TrackingPage() {
  const [cases, setCases] = useState<SupportCase[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    id: '',
    status: '',
    priority: '',
    startDate: '',
    endDate: ''
  });
  const [searchTrigger, setSearchTrigger] = useState(0);

  const fetchCases = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSupportCases({
        page: currentPage,
        size: pageSize,
        id: filters.id,
        status: filters.status,
        priority: filters.priority,
        start_date: filters.startDate,
        end_date: filters.endDate
      });
      setCases(data.cases);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.error('Error fetching cases:', error);
      setError('Failed to load support cases. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, filters, searchTrigger]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases, currentPage, pageSize, searchTrigger]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Don't trigger search here anymore
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
    setSearchTrigger(prev => prev + 1); // Trigger search
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Lista de casos de soporte</h1>
      
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {loading && cases.length === 0 ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p className="mt-2">Cargando casos de soporte...</p>
        </div>
      ) : (
        <SupportCasesTable
          cases={cases}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          loading={loading}
        />
      )}
    </Container>
  );
}