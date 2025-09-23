import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Check if user is signed in (this would connect to your auth system later)
    const checkAuthStatus = () => {
      // For now, we'll always show splash for new users
      // Later this would check localStorage, cookies, or auth tokens
      const hasSeenApp = localStorage.getItem('hasSeenApp');
      if (hasSeenApp) {
        setShowSplash(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleEnterApp = () => {
    localStorage.setItem('hasSeenApp', 'true');
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onEnterApp={handleEnterApp} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
