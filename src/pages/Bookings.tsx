import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityBookingForm from "@/components/booking/ActivityBookingForm";
import HotelBookingForm from "@/components/booking/HotelBookingForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("activity");

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&auto=format&fit=crop&w=2560&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Book Your Perfect Trip</h1>

        <Tabs defaultValue="activity" className="w-full max-w-3xl mx-auto" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="activity">Activity Booking</TabsTrigger>
            <TabsTrigger value="hotel">Hotel Booking</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="animate-fade-in">
            <ActivityBookingForm />
          </TabsContent>

          <TabsContent value="hotel" className="animate-fade-in">
            <HotelBookingForm />
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-6">
          <Link to="/booking-history">
            <Button variant="outline" className="bg-[#2a9d8f]/90 hover:bg-[#2a9d8f] text-white">
              <History className="w-4 h-4 mr-2" />
              View Booking History
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bookings;