import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PaymentForm from "../payment/PaymentForm";
import { saveHotelBooking } from "@/services/bookingService";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Manually create an array of hotels based on the CSV data
const hotels = [
  {
    Hotel_ID: "H001",
    Hotel_name: "Antic Guesthouse-Galle Fort",
    Location: "Galle Fort, Galle",
    Price_per_Night_LKR: 5000,
    Budget_category: "Low",
    Contact_number: "777610890",
    City: "Galle",
    Property_amenities: "Free Wi-Fi in public areas, 24-hour reception, Express check-in/-out",
  },
  {
    Hotel_ID: "H002",
    Hotel_name: "Beach Hevan - Guest House",
    Location: "Galle Fort, Galle",
    Price_per_Night_LKR: 5500,
    Budget_category: "Low",
    Contact_number: "0912 234 663",
    City: "Galle",
    Property_amenities: "Wi-Fi, Darts, Non-smoking rooms, Air Conditioning",
  },
  {
    Hotel_ID: "H003",
    Hotel_name: "Mango House - Galle Fort",
    Location: "Leyn Baan Cross Street, Galle Fort, Galle",
    Price_per_Night_LKR: 14000,
    Budget_category: "Medium",
    Contact_number: "077 730 3883",
    City: "Galle",
    Property_amenities: "Wi-Fi, Spa, Guided galle fort walk, Mini bar Drinks",
  },
  {
    Hotel_ID: "H004",
    Hotel_name: "The Heritage Hotel Galle Fort",
    Location: "Galle Fort, Galle",
    Price_per_Night_LKR: 13500,
    Budget_category: "Medium",
    Contact_number: "94 91 222 8494",
    City: "Galle",
    Property_amenities: "Open air-resturant, Tours, Airport pickup and drop, Rent bicycles",
  },
  {
    Hotel_ID: "H005",
    Hotel_name: "Le Grand Galle by Asia Leisure",
    Location: "No. 30, Park Road, Kaluwella, Galle",
    Price_per_Night_LKR: 30000,
    Budget_category: "High",
    Contact_number: "0912 228 555",
    City: "Galle",
    Property_amenities: "Wi-Fi, Free parking, 24-hour reception, Express check-in/-out",
  },
  {
    Hotel_ID: "H006",
    Hotel_name: "Fort Bazaar",
    Location: "26 Church Street, Galle Fort, Galle",
    Price_per_Night_LKR: 28000,
    Budget_category: "High",
    Contact_number: "077 363 8381",
    City: "Galle",
    Property_amenities: "Wi-Fi, Spa, Guided galle fort walk, Mini bar Drinks",
  },
  {
    Hotel_ID: "H007",
    Hotel_name: "KK Beach",
    Location: "Habaraduwa Dharmarama Mawatha, Galle",
    Price_per_Night_LKR: 62000,
    Budget_category: "Luxury",
    Contact_number: "077 203 5555",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Free Breakfast, Free Parking, Outdoor Pool, Air-conditioned, Laundry service",
  },
  {
    Hotel_ID: "H008",
    Hotel_name: "Amangalle",
    Location: "10 Church Street, Galle Fort, Galle",
    Price_per_Night_LKR: 85000,
    Budget_category: "Luxury",
    Contact_number: "091 2233388",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Free Breakfast, Free Parking, Outdoor Pool, Air-conditioned, Laundry service",
  },
  {
    Hotel_ID: "H009",
    Hotel_name: "Blue Beach Galle",
    Location: "10 Church Street, Galle Fort, Galle",
    Price_per_Night_LKR: 15721,
    Budget_category: "Medium",
    Contact_number: "912220220",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Free Breakfast, Free Parking, Accessible, Air-conditioned, Beach access",
  },
  {
    Hotel_ID: "H010",
    Hotel_name: "The Bartizan Galle Fort",
    Location: "77 Pedlar Street, 80000 Galle, Sri Lanka",
    Price_per_Night_LKR: 39672,
    Budget_category: "Luxury",
    Contact_number: "912234020",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Free Breakfast, Free Parking, Accessible, Air-conditioned, Kid-Friendly",
  },
  {
    Hotel_ID: "H011",
    Hotel_name: "Secret Garden Galle Fort",
    Location: "Pedlar Street 66A, 8000 Galle, Sri Lanka",
    Price_per_Night_LKR: 13189,
    Budget_category: "Medium",
    Contact_number: "766825359",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Free Breakfast, Air-conditioned, Kid-Friendly, Room Service, Resturant",
  },
  {
    Hotel_ID: "H012",
    Hotel_name: "Ocean Villa Den",
    Location: "No.23 Pitiwella, Boosa, 80270 Galle, Sri Lanka",
    Price_per_Night_LKR: 14495,
    Budget_category: "Medium",
    Contact_number: "768694925",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Free Breakfast, Air-conditioned, Free Parking, Pool, Beach Access",
  },
  {
    Hotel_ID: "H013",
    Hotel_name: "The Lady Hill Hotel",
    Location: "No 29, Upper Dickson Road, 80000 Galle, Sri Lanka",
    Price_per_Night_LKR: 39329,
    Budget_category: "Luxury",
    Contact_number: "766900058",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Paid Breakfast, Air-conditioned, Free Parking, Outdoor Pool, Laundry Service",
  },
  {
    Hotel_ID: "H014",
    Hotel_name: "Ceylon Olive Galle",
    Location: "Ceylon olive, Udugama Road, 80000 Galle, Sri Lanka",
    Price_per_Night_LKR: 44764,
    Budget_category: "Luxury",
    Contact_number: "766692186",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Paid Breakfast, Air-conditioned, Free Parking, Pool, Kid-friendly",
  },
  {
    Hotel_ID: "H015",
    Hotel_name: "Wirdana Resort & Spa",
    Location: "Gingahawila Waththa, Kadurupe, Boossa | Wirdana Spa & Villas, Galle 80000, Sri Lanka",
    Price_per_Night_LKR: 49072,
    Budget_category: "Luxury",
    Contact_number: "+39 347 386 8459",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Paid Breakfast, Air-conditioned, Free Parking, Pool, Accessible",
  },
  {
    Hotel_ID: "H016",
    Hotel_name: "de MODA Boutique Hotel Galle",
    Location: "9 Bope Cross Road, 80000 Galle, Sri Lanka",
    Price_per_Night_LKR: 17053,
    Budget_category: "High",
    Contact_number: "777701511",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Paid Breakfast, Air-conditioned, Free Parking, Pool, Accessible",
  },
  {
    Hotel_ID: "H017",
    Hotel_name: "No 05 Middle Street",
    Location: "no.5 middle street, 80000 Galle, Sri Lanka",
    Price_per_Night_LKR: 29310,
    Budget_category: "High",
    Contact_number: "077 777 4450",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Paid Breakfast, Air-conditioned",
  },
  {
    Hotel_ID: "H018",
    Hotel_name: "City Stay",
    Location: "Approach to Galle Highway entrance road, Nugaduwa Galle, 80000 Galle, Sri Lanka",
    Price_per_Night_LKR: 8586,
    Budget_category: "Medium",
    Contact_number: "0914 947 100",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Paid Breakfast, Air-conditioned, Free Parking, Pool",
  },
  {
    Hotel_ID: "H019",
    Hotel_name: "Radisson Collection Resort Galle",
    Location: "724 MATARA ROAD, TALPE, 80615 Galle, Sri Lanka",
    Price_per_Night_LKR: 59572,
    Budget_category: "Luxury",
    Contact_number: "0912 088 880",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Paid breakfast, Free parking, Accessible, Indoor and outdoor pool, Air-conditioned",
  },
  {
    Hotel_ID: "H020",
    Hotel_name: "Olinda Galle",
    Location: "no 12a Bope Cross Road, 80000 Galle, Sri Lanka",
    Price_per_Night_LKR: 28659,
    Budget_category: "High",
    Contact_number: "077 715 9999",
    City: "Galle",
    Property_amenities: "Wi-Fi, Paid breakfast, Indoor and outdoor pool, Air-conditioned",
  },
  {
    Hotel_ID: "H021",
    Hotel_name: "Heritage Samanthanna",
    Location: "10 Samantanne Estate Balagoda, Poddala, Galle",
    Price_per_Night_LKR: 21494,
    Budget_category: "High",
    Contact_number: "757505400",
    City: "Galle",
    Property_amenities: "Sauna, Outdoor Pool, Spa, Massage, Garden, Tennis court",
  },
  {
    Hotel_ID: "H022",
    Hotel_name: "Zichron Rest",
    Location: "Dangedara Road, Galle, Sri Lanka",
    Price_per_Night_LKR: 23285,
    Budget_category: "High",
    Contact_number: "077 297 7810",
    City: "Galle",
    Property_amenities: "Air-conditioned, Outdoor Swimming pool, Free private parking",
  },
  {
    Hotel_ID: "H023",
    Hotel_name: "The Quale Villa",
    Location: "The Quale,Madugoda Waththa,Kalahe,Wanchawala,Galle,Sri Lanka",
    Price_per_Night_LKR: 22501,
    Budget_category: "High",
    Contact_number: "760423840",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Free breakfast, Free Parking, Room Service, Air-conditioned, Pool",
  },
  {
    Hotel_ID: "H024",
    Hotel_name: "Sol Y Mar - Unawatuna",
    Location: "119A Yaddehimulla Rd, Unawatuna",
    Price_per_Night_LKR: 12538,
    Budget_category: "Medium",
    Contact_number: "077 725 0074",
    City: "Galle",
    Property_amenities: "Free private parking, Garden, Wi-Fi",
  },
  {
    Hotel_ID: "H025",
    Hotel_name: "Ivy Lane Galle Fort",
    Location: "58A Lighthouse St, Galle",
    Price_per_Night_LKR: 27669,
    Budget_category: "High",
    Contact_number: "0912 251 324",
    City: "Galle",
    Property_amenities: "Free Wi-Fi, Air - conditioned, Airport shuttle",
  },
];

const formSchema = z.object({
  hotelName: z.string().min(2, "Hotel name must be at least 2 characters"),
  checkIn: z.date({
    required_error: "Check-in date is required",
  }),
  checkOut: z.date({
    required_error: "Check-out date is required",
  }),
  numberOfRooms: z.string().min(1, "Number of rooms is required"),
  specialRequirements: z.string().optional(),
});

const HotelBookingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [bookingData, setBookingData] = useState<any>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hotelName: "",
      specialRequirements: "",
      numberOfRooms: "1",
    },
  });

  // Calculate number of nights between two dates
  const calculateNights = (checkIn: Date, checkOut: Date) => {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Calculate total price based on hotel, nights, and rooms
  const calculateTotalPrice = (hotel: any, checkIn: Date, checkOut: Date, numberOfRooms: number) => {
    if (!hotel || !checkIn || !checkOut || !numberOfRooms) return 0;
    
    const nights = calculateNights(checkIn, checkOut);
    const pricePerNight = hotel.Price_per_Night_LKR;
    return pricePerNight * nights * numberOfRooms;
  };

  // Update price when form values change
  useEffect(() => {
    const hotelName = form.watch("hotelName");
    const checkIn = form.watch("checkIn");
    const checkOut = form.watch("checkOut");
    const numberOfRooms = form.watch("numberOfRooms");

    const hotel = hotels.find(h => h.Hotel_name === hotelName);
    if (hotel && checkIn && checkOut && numberOfRooms) {
      const total = calculateTotalPrice(hotel, checkIn, checkOut, parseInt(numberOfRooms));
      setCalculatedPrice(total);
      setSelectedHotel(hotel);
    } else {
      setCalculatedPrice(0);
      setSelectedHotel(null);
    }
  }, [form.watch("hotelName"), form.watch("checkIn"), form.watch("checkOut"), form.watch("numberOfRooms")]);

  const handleInitialSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedHotel) {
      toast({
        title: "Error",
        description: "Please select a valid hotel",
        variant: "destructive",
      });
      return;
    }

    const nights = calculateNights(values.checkIn, values.checkOut);
    
    setBookingData({
      hotelName: values.hotelName,
      hotelId: selectedHotel.Hotel_ID,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      numberOfRooms: parseInt(values.numberOfRooms),
      numberOfNights: nights,
      specialRequirements: values.specialRequirements || "",
      totalPrice: calculatedPrice,
      pricePerNight: selectedHotel.Price_per_Night_LKR
    });
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    if (!bookingData) return;
    
    try {
      setIsLoading(true);
      // Save booking to Firebase
      await saveHotelBooking(bookingData);
      
      toast({
        title: "Booking Successful!",
        description: "Your hotel has been booked successfully.",
      });
      
      // Redirect to booking history page
      navigate("/booking-history");
    } catch (error) {
      console.error("Error saving booking:", error);
      toast({
        title: "Error",
        description: "There was an error saving your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowPayment(false);
      form.reset();
    }
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  if (showPayment) {
    return (
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <PaymentForm
          amount={calculatedPrice}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          bookingType="hotel"
        />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleInitialSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <FormField
          control={form.control}
          name="hotelName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hotel Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a hotel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {hotels.map((hotel) => (
                    <SelectItem key={hotel.Hotel_ID} value={hotel.Hotel_name}>
                      {hotel.Hotel_name} - {hotel.Budget_category} (LKR {hotel.Price_per_Night_LKR}/night)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Check-in Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Check-out Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="numberOfRooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Rooms</FormLabel>
              <FormControl>
                <Input type="number" min="1" placeholder="Enter number of rooms" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specialRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requirements (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any special requirements or notes..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {calculatedPrice > 0 && selectedHotel && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">Price Summary</h3>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-600">Hotel: {selectedHotel.Hotel_name}</p>
              <p className="text-sm text-gray-600">Price per Night: LKR {selectedHotel.Price_per_Night_LKR}</p>
              <p className="text-sm text-gray-600">Number of Rooms: {form.watch("numberOfRooms")}</p>
              <p className="text-sm text-gray-600">Number of Nights: {form.watch("checkIn") && form.watch("checkOut") ? 
                calculateNights(form.watch("checkIn"), form.watch("checkOut")) : 0}</p>
              <p className="text-lg font-bold text-[#2a9d8f] mt-2">Total Price: LKR {calculatedPrice}</p>
            </div>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-[#2a9d8f] hover:bg-[#2a9d8f]/80 text-white" 
          disabled={isLoading || calculatedPrice === 0}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            `Proceed to Payment (LKR ${calculatedPrice})`
          )}
        </Button>
      </form>
    </Form>
  );
};

export default HotelBookingForm;