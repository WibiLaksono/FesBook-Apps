
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import VenueDetail from "./pages/VenueDetail";
import Auth from "./pages/Auth";
import Booking from "./pages/Booking";
import BookingStatus from "./pages/BookingStatus";
import HostDashboard from "./pages/HostDashboard";
import NotFound from "./pages/NotFound";
import FormHost from "./pages/FormHost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/venue/:id" element={<VenueDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking-status" element={<BookingStatus />} />
          <Route path="/host-dashboard" element={<HostDashboard />} />
          <Route path="/form-host" element={<FormHost />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
