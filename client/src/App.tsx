import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import Results from "./pages/Results";
import { useState, useEffect } from "react";
import { Mood } from "@/lib/types";

function Router() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [minRating, setMinRating] = useState<number>(6.0);
  const [contentType, setContentType] = useState<string>("movie");
  const [location] = useLocation();

  // Reset selections when returning to home page
  useEffect(() => {
    if (location === "/") {
      // Don't reset completely to allow going back and forth
    }
  }, [location]);

  return (
    <Switch>
      <Route path="/">
        {() => (
          <Home 
            selectedMood={selectedMood} 
            setSelectedMood={setSelectedMood}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            minRating={minRating}
            setMinRating={setMinRating}
            contentType={contentType}
            setContentType={setContentType}
          />
        )}
      </Route>
      <Route path="/results">
        {() => (
          <Results 
            selectedMood={selectedMood}
            selectedLanguage={selectedLanguage}
            minRating={minRating}
            contentType={contentType}
          />
        )}
      </Route>
      <Route>
        {() => <NotFound />}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
