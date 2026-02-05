import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import ScanPage from "./pages/ScanPage";
import HistoryPage from "./pages/HistoryPage";
import DiseasesPage from "./pages/DiseasesPage";
import AlertsPage from "./pages/AlertsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth Routes - Public */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Routes - Require Authentication */}
              <Route
                path="/"
                element={<ProtectedRoute element={<Index />} />}
              />
              <Route
                path="/scan"
                element={<ProtectedRoute element={<ScanPage />} />}
              />
              <Route
                path="/history"
                element={<ProtectedRoute element={<HistoryPage />} />}
              />
              <Route
                path="/diseases"
                element={<ProtectedRoute element={<DiseasesPage />} />}
              />
              <Route
                path="/alerts"
                element={<ProtectedRoute element={<AlertsPage />} />}
              />
              <Route
                path="/profile"
                element={<ProtectedRoute element={<ProfilePage />} />}
              />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
