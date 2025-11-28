import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ChecklistProvider } from './context/ChecklistContext';
import { PairChecklistProvider } from './context/PairChecklistContext';
import Navbar from './components/Layout/Navbar';
import JournalPage from './pages/JournalPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import PairGridPage from './pages/PairGridPage';
import PairDetailPage from './pages/PairDetailPage';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <ChecklistProvider>
        <PairChecklistProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-dark-900 dark:to-dark-800">
              <Navbar />
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                  <Route path="/" element={<PairGridPage />} />
                  <Route path="/journal" element={<JournalPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/pairs" element={<PairGridPage />} />
                  <Route path="/pair/:pairId" element={<PairDetailPage />} />
                </Routes>
              </main>
            </div>
          </Router>
        </PairChecklistProvider>
      </ChecklistProvider>
    </ThemeProvider>
  );
}

export default App;