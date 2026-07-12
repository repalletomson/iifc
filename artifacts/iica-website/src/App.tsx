import React, { useEffect } from 'react';
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from 'framer-motion';
import { ConfigProvider } from '@/lib/configContext';
import { ThemeProvider } from '@/lib/themeContext';
import { DataErrorBanner } from '@/components/ui/DataErrorBanner';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloating } from '@/components/sections/WhatsAppFloating';

// Scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

// Pages
import Home from '@/pages/home';
import Artists from '@/pages/artists';
import ArtistProfile from '@/pages/artist-profile';
import Events from '@/pages/events';
import Jobs from '@/pages/jobs';
import About from '@/pages/about';
import CEO from '@/pages/ceo';
import IncreaseEarnings from '@/pages/increase-earnings';
import RelaunchBrand from '@/pages/relaunch-brand';
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

// Error Boundary for catching runtime errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground p-6">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-3xl font-bold text-red-500">Something went wrong</h1>
            <p className="text-muted-foreground">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="gradient-bg text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Return to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/artists" component={Artists} />
            <Route path="/artist/:slug" component={ArtistProfile} />
            <Route path="/events" component={Events} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/about" component={About} />
            <Route path="/ceo" component={CEO} />
            <Route path="/increase-earnings" component={IncreaseEarnings} />
            <Route path="/relaunch-brand" component={RelaunchBrand} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ConfigProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <DataErrorBanner />
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </QueryClientProvider>
        </ConfigProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
