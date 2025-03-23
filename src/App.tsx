import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TripPlanner from "./pages/TripPlanner";
import Destinations from "./pages/Destinations";
import Destinationnext from "./pages/Destinationnext";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import ActivityProviderSignUp from "./pages/signup/ActivityProviderSignUp";
import HotelSignUp from "./pages/signup/HotelSignUp";
import GuideSignUp from "./pages/signup/GuideSignUp";
import TravelerSignUp from "./pages/signup/TravelerSignUp";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import ActivityDetails from "./pages/ActivityDetails";
import ActivityCom from "./pages/ActivityCom";
import Gallery from "./pages/GalleryCom";
import VerifyEmailPage from "./pages/signup/VerifyEmailPage";
import ProtectedRoute from "./components/ProtectedRoute";

import NotFound from "./pages/NotFound";
import Bookings from "./pages/Bookings";
import BookingHistory from "./pages/BookingHistory";
import Feedback from "./components/Feedback";
import FeedbackIndex from "./pages/FeedbackIndex";
import ViewRatings from "./pages/ViewRatings";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login/:userType" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/activity/:id" element={<ActivityDetails />} />
        <Route path="/activity" element={<ActivityCom />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/nextDestinations" element={<Destinationnext />} />
        
        {/* Signup Routes */}
        <Route path="/signup/traveler" element={<TravelerSignUp />} />
        <Route path="/signup/guide" element={<GuideSignUp />} />
        <Route path="/signup/hotel" element={<HotelSignUp />} />
        <Route path="/signup/activity-provider" element={<ActivityProviderSignUp />} />
        
        {/* Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        {/* Email Verification Route */}
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        <Route path="/bookings" element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        } />
        <Route path="/booking-history" element={
          <ProtectedRoute>
            <BookingHistory />
          </ProtectedRoute>
        } />
        <Route path="/ratings" element={<ViewRatings />} />
        <Route path="/feedback" element={<FeedbackIndex />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;