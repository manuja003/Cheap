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
import { Checkbox } from "@/components/ui/checkbox";
import { saveActivityBooking } from "@/services/bookingService";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  activityName: z.string().min(2, "Activity name must be at least 2 characters"),
  date: z.date({
    required_error: "Please select a date",
  }),
  participants: z.string().min(1, "Number of participants is required"),
  specialRequirements: z.string().optional(),
  provider: z.string().min(1, "Please select a provider"),
});

// Activity provider mapping
const activityProviders = {
  "Trekking": ["Act001-Low(4500-5000 LKR)", "Act002-Medium(8000-15000 LKR)", "Act003-High(20000 LKR)", "Act004-Luxury(32500 LKR)"],
  "Scuba Diving": ["Act005-Low(5000 LKR)", "Act006-Medium(8500 LKR)", "Act007-High(20000 LKR)", "Act008-Luxury(33000 LKR)"],
  "Village Experiences": ["Act009-Low(4000 LKR)", "Act010-Medium(9000 LKR)", "Act011-High(20000 LKR)", "Act012-Luxury(34000 LKR)"],
  "Whale Watching": ["Act013-Low(3500 LKR)", "Act014-Medium(8500 LKR)", "Act015-High(18500 LKR)", "Act016-Luxury(35000 LKR)"],
  "Cookery Classes": ["Act017-Low(5000 LKR)", "Act018-Medium(11600 LKR)", "Act019-High(20000 LKR)", "Act020-Luxury(33000 LKR)"],
  "Surfing": ["Act021-Low(5000 LKR)", "Act022-Medium(10500 LKR)", "Act023-High(25000 LKR)", "Act024-Luxury(35000 LKR)"],
  "Ayurveda & Spa": ["Act025-Low(4500 LKR)", "Act026-Medium(9000 LKR)", "Act027-High(27000 LKR)",],
  "Cycling": ["Act029-Low(5500 LKR)", "Act030-Medium(10500 LKR)", "Act031-High(17000 LKR)", "Act032-Luxury(31500 LKR)"],
  "Jetski": ["Act033-Low(4700 LKR)", "Act034-Medium(7500 LKR)", "Act035-High(20000 LKR)", "Act036-Luxury(32000 LKR)"],
  "Snorkeling": ["Act037-Low(5500 LKR)", "Act038-Medium(9000 LKR)", "Act039-High(10500 LKR)", "Act040-Luxury(31000 LKR)"],
  "Stilt Fishing": ["Act041-Low(5000 LKR)", "Act042-Medium(7000-15000 LKR)", "Act043-High(16000-30000 LKR)", "Act044-Luxury(32000 LKR)"],
  "Boat Riding (Madu River)": ["Act045-Low(8000 LKR)", "Act046-Medium(9500 LKR)", "Act047-High(14500 LKR)", "Act048-Luxury(31000 LKR)"],
  "Boat Riding (Koggala Lake)": ["Act049-Low(2500-5500 LKR)", "Act050-Medium(7000-15000 LKR)", "Act051-High(16000-30000 LKR)", "Act052-Luxury(31000 LKR)"],
  "Turtle Watching": ["Act053-Low(2000 LKR)", "Act054-Medium(7000-15000 LKR)", "Act055-High(16000-30000 LKR)", "Act056-Luxury(31000 LKR)"]
};

const ActivityBookingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [providers, setProviders] = useState<string[]>([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [bookingData, setBookingData] = useState<any>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Function to extract price from provider string
  const extractPrice = (providerString: string): number => {
    const priceMatch = providerString.match(/\((\d+(?:-\d+)?)\s*LKR\)/);
    if (priceMatch) {
      const priceRange = priceMatch[1].split('-');
      // If there's a range, take the lower price
      return parseInt(priceRange[0]);
    }
    return 0;
  };

  // Function to calculate total price
  const calculateTotalPrice = (provider: string, participants: number): number => {
    const basePrice = extractPrice(provider);
    return basePrice * participants;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityName: "",
      specialRequirements: "",
      provider: "",
    },
  });

  // Update price when provider or participants change
  useEffect(() => {
    const provider = form.watch("provider");
    const participants = form.watch("participants");
    
    if (provider && participants) {
      const total = calculateTotalPrice(provider, parseInt(participants));
      setCalculatedPrice(total);
    } else {
      setCalculatedPrice(0);
    }
  }, [form.watch("provider"), form.watch("participants")]);

  // Update providers when activity changes
  useEffect(() => {
    const activity = form.watch("activityName");
    if (activity && activity in activityProviders) {
      setSelectedActivity(activity);
      setProviders(activityProviders[activity as keyof typeof activityProviders]);
      // Reset the provider value when activity changes
      form.setValue("provider", "");
    } else {
      setProviders([]);
      setSelectedActivity("");
    }
  }, [form.watch("activityName"), form]);

  const handleInitialSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Activity booking details:", values);
    setBookingData({
      activityName: values.activityName,
      date: values.date,
      participants: parseInt(values.participants),
      provider: values.provider,
      specialRequirements: values.specialRequirements || "",
      totalPrice: calculatedPrice
    });
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    if (!bookingData) return;
    
    try {
      setIsLoading(true);
      // Save booking to Firebase
      await saveActivityBooking(bookingData);
      
      toast({
        title: "Booking Successful!",
        description: "Your activity has been booked successfully.",
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
          amount={calculatedPrice} // Now using the calculated price
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          bookingType="activity"
        />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleInitialSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <FormField
          control={form.control}
          name="activityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Surfing Lesson" list="activity-suggestions" {...field} />
              </FormControl>
              <datalist id="activity-suggestions">
                {Object.keys(activityProviders).map((activity) => (
                  <option key={activity} value={activity} />
                ))}
              </datalist>
              <FormMessage />
            </FormItem>
          )}
        />

        {providers.length > 0 && (
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Provider for {selectedActivity}</FormLabel>
                <div className="space-y-3">
                  {providers.map((provider) => (
                    <div key={provider} className="flex items-center space-x-2">
                      <Checkbox 
                        id={provider} 
                        checked={field.value === provider}
                        onCheckedChange={() => field.onChange(provider)}
                      />
                      <label 
                        htmlFor={provider} 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {provider}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
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
          name="participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Participants</FormLabel>
              <FormControl>
                <Input type="number" min="1" placeholder="Enter number of participants" {...field} />
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

        {calculatedPrice > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">Price Summary</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-600">Base Price per Person: LKR {extractPrice(form.watch("provider"))}</p>
              <p className="text-sm text-gray-600">Number of Participants: {form.watch("participants") || 0}</p>
              <p className="text-lg font-bold text-[#2a9d8f] mt-2">Total Price: LKR {calculatedPrice}</p>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full bg-[#2a9d8f] hover:bg-[#2a9d8f]/80 text-white" disabled={isLoading || calculatedPrice === 0}>
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

export default ActivityBookingForm;
