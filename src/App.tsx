import { AuthProvider } from "react-oauth2-code-pkce";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, SignInOidc, Dashboard } from './pages';
import ProtectedRoute from './components/ProtectedRoute';
import { authConfig } from './config/auth';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AppContent = () => {
  const queryClient = new QueryClient();

  return (
      <div className="App">
        <main className="main-content">
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin-oidc" element={<SignInOidc />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </QueryClientProvider>
        </main>
      </div>
  );
};

function App() {
  return (
    <AuthProvider authConfig={authConfig}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

