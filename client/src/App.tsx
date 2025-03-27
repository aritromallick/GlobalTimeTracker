import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import ManagingTeamsAcrossTimeZones from "@/pages/BlogPost1";
import PsychologyOfTimeZones from "@/pages/BlogPost2";
import SchedulingInternationalMeetings from "@/pages/BlogPost3";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/managing-teams-across-time-zones" component={ManagingTeamsAcrossTimeZones} />
      <Route path="/blog/psychology-of-time-zones" component={PsychologyOfTimeZones} />
      <Route path="/blog/scheduling-international-meetings" component={SchedulingInternationalMeetings} />
      <Route component={NotFound} />
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
