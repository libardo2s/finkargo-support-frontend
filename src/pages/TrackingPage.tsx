import { useState, useEffect } from 'react';
import SupportCasesTable from '../components/tables/SupportCasesTable';
import { getSupportCases } from '../services/api';
import { SupportCase } from '../types/supportCase';

export default function TrackingPage() {
  const [cases, setCases] = useState<SupportCase[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const data = await getSupportCases(currentPage);
        setCases(data.cases);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };

    fetchCases();
  }, [currentPage]);

  return (
    <div>
      <h1 className="mb-4">Track Support Cases</h1>
      <SupportCasesTable
        cases={cases}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}