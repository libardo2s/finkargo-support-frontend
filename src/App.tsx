import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateCasePage from './pages/CreateCasePage';
import TrackingPage from './pages/TrackingPage';
import SupportCaseDetailPage from './pages/SupportCaseDetailPage';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<TrackingPage />} />
          <Route path="/create-case" element={<CreateCasePage />} />
          <Route path="/track-cases" element={<TrackingPage />} />
          <Route path="/track-cases/:id" element={<SupportCaseDetailPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;