import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import AiAssistant from './components/AiAssistant';

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);

  useEffect(() => {
    const handleOpenAi = () => setIsAiOpen(true);
    window.addEventListener('open-emiflow-ai', handleOpenAi);
    return () => window.removeEventListener('open-emiflow-ai', handleOpenAi);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="product/:slug" element={<ProductDetailPage />} />
            <Route path="how-it-works" element={<HowItWorksPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>

        {/* Global Floating AI Assistant */}
        <AiAssistant
          isOpenExternal={isAiOpen}
          onToggleExternal={() => setIsAiOpen(!isAiOpen)}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}
