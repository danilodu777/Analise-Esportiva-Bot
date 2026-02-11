import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { MatchesPage } from './pages/MatchesPage';
import { StatsPage } from './pages/StatsPage';
import { RobotPage } from './pages/RobotPage';
import { PlansPage } from './pages/PlansPage';
import { SettingsPage } from './pages/SettingsPage';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');

  // Redirect to dashboard if authenticated and on landing/login/register
  const effectivePage = isAuthenticated && ['landing', 'login', 'register'].includes(currentPage) 
    ? 'dashboard' 
    : currentPage;

  // Redirect to landing if not authenticated and trying to access protected pages
  const protectedPages = ['dashboard', 'matches', 'stats', 'robot', 'plans', 'settings'];
  const finalPage = !isAuthenticated && protectedPages.includes(effectivePage) 
    ? 'landing' 
    : effectivePage;

  const renderPage = () => {
    switch (finalPage) {
      case 'landing':
        return <LandingPage setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'register':
        return <RegisterPage setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return <DashboardPage setCurrentPage={setCurrentPage} />;
      case 'matches':
        return <MatchesPage />;
      case 'stats':
        return <StatsPage />;
      case 'robot':
        return <RobotPage />;
      case 'plans':
        return <PlansPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage setCurrentPage={setCurrentPage} />;
    }
  };

  // Show navbar only for authenticated users and not on auth pages
  const showNavbar = isAuthenticated && !['landing', 'login', 'register'].includes(finalPage);

  return (
    <div className="min-h-screen bg-gray-900">
      {showNavbar && (
        <Navbar currentPage={finalPage} setCurrentPage={setCurrentPage} />
      )}
      {renderPage()}
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
