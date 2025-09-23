import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";
import SkillDetail from "./components/SkillDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    console.log('App component mounted');
    // Always show splash screen on first load for the intro animation
    // In a real app, you might want to show this only once per session
    setShowSplash(true);
  }, []);

  console.log('App render - showSplash:', showSplash);

  const handleEnterApp = () => {
    console.log('handleEnterApp called');
    localStorage.setItem('hasSeenApp', 'true');
    setShowSplash(false);
    console.log('showSplash set to false');
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
            <Route path="/skill/:skillId" element={<SkillDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
