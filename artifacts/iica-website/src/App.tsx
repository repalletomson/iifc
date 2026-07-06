import React, { useEffect } from 'react';
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from 'framer-motion';
import { ConfigProvider } from '@/lib/configContext';
import { ThemeProvider } from '@/lib/themeContext';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

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
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ConfigProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
