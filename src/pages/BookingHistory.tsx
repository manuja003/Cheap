import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { getActivityBookings, getHotelBookings, ActivityBooking, HotelBooking } from "@/services/bookingService";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";

const BookingHistory = () => {
  const [activityBookings, setActivityBookings] = useState<ActivityBooking[]>([]);
  const [hotelBookings, setHotelBookings] = useState<HotelBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const activities = await getActivityBookings();
        const hotels = await getHotelBookings();
        
        setActivityBookings(activities);
        setHotelBookings(hotels);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative">
        {/* Background Image with Overlay */}
        <div 
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=2560&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8 pt-24">
          <h1 className="text-4xl font-bold text-center mb-8 text-white">Your Bookings</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          ) : (
            <Tabs defaultValue="activities" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="activities">Activity Bookings ({activityBookings.length})</TabsTrigger>
                <TabsTrigger value="hotels">Hotel Bookings ({hotelBookings.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activities" className="animate-fade-in">
                {activityBookings.length === 0 ? (
                  <Card className="backdrop-blur-sm bg-white/90">
                    <CardHeader>
                      <CardTitle>No Activity Bookings</CardTitle>
                      <CardDescription>
                        You haven't made any activity bookings yet.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {activityBookings.map((booking) => (
                      <Card key={booking.id} className="backdrop-blur-sm bg-white/90">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{booking.activityName}</CardTitle>
                              <CardDescription>
                                {format(booking.date, "PPP")}
                              </CardDescription>
                            </div>
                            <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                              {booking.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p>Participants: {booking.participants}</p>
                            {booking.provider && <p>Provider: {booking.provider}</p>}
                            {booking.specialRequirements && (
                              <div>
                                <p className="font-medium">Special Requirements:</p>
                                <p className="text-sm">{booking.specialRequirements}</p>
                              </div>
                            )}
                            <p className="text-xs text-gray-500">
                              Booked on: {format(booking.timestamp, "PPP 'at' p")}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="hotels" className="animate-fade-in">
                {hotelBookings.length === 0 ? (
                  <Card className="backdrop-blur-sm bg-white/90">
                    <CardHeader>
                      <CardTitle>No Hotel Bookings</CardTitle>
                      <CardDescription>
                        You haven't made any hotel bookings yet.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {hotelBookings.map((booking) => (
                      <Card key={booking.id} className="backdrop-blur-sm bg-white/90">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{booking.hotelName}</CardTitle>
                              <CardDescription>
                                {format(booking.checkIn, "PPP")} - {format(booking.checkOut, "PPP")}
                              </CardDescription>
                            </div>
                            <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                              {booking.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p>Rooms: {booking.rooms} | Guests: {booking.guests}</p>
                            {booking.specialRequests && (
                              <div>
                                <p className="font-medium">Special Requests:</p>
                                <p className="text-sm">{booking.specialRequests}</p>
                              </div>
                            )}
                            <p className="text-xs text-gray-500">
                              Booked on: {format(booking.timestamp, "PPP 'at' p")}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingHistory;
