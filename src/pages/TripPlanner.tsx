
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, differenceInDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  travelFormSchema,
  TravelFormValues,
  defaultValues,
  SpecialNeedsType,
  TravelStyleType,
  ActivityType,
  DistrictType
} from "@/lib/form-schema";
import { toast } from "sonner";
import { formTransition, fadeInUp, staggerContainer } from "@/lib/animations";
import bg from "../../src/images/colombo-sri-lanka.jpg";
// UI Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Icons
import {
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
  Check,
  CheckCircle2,
  Clock,
  InfoIcon,
  Map,
  Plane,
  Send,
  Languages,
  Wifi,
  CreditCard,
  Phone,
  HelpCircle
} from "lucide-react";

// Travel form step configuration
const steps = [
  { id: 1, name: "Dates" },
  { id: 2, name: "Flights" },
  { id: 3, name: "Accommodation" },
  { id: 4, name: "Preferences" },
  { id: 5, name: "Destinations" },
  { id: 6, name: "Additional Services" },
  { id: 7, name: "Review" },
];

// Data configuration
const budgetRanges = [
  "Backpack Traverler (Under LKR 6000/night)",
  "Budget Traveler (LKR 19500-37500/night)",
  "Mid Range Traveler (LKR 38500-69000/night)",
  "Luxury Traveler (LKR 70000+/night)",
];

const accommodationTypes = [
  "Hotel",
  "Resort",
  "Guesthouse",
  "Homestay",
  "Villa",
  "Apartment",
  "Eco Lodge",
  "Boutique Hotel",
];

// Additional services
const additionalServices = [
  { id: "currency-exchange", label: "Currency Exchange", icon: CreditCard },
  { id: "sim-card", label: "Local SIM Card", icon: Phone },
  { id: "wifi-rental", label: "Portable WiFi Rental", icon: Wifi },
  { id: "translation-service", label: "Translation Service", icon: Languages },
];

const guideLanguages = [
  "English",
  "French",
  "German",
  "Spanish",
  "Chinese",
  "Japanese",
  "Russian",
  "Arabic"
];


const accommodationOptions = [
  { type: "Hotel", min: 40000, max: 100000 }, // Hotel prices generally range from budget options to more premium.
  { type: "Resort", min: 8000, max: 500000 }, // Resorts tend to be on the pricier side, especially for premium ones.
  { type: "Guesthouse", min: 1500, max: 8000 }, // Guesthouses are typically affordable, so I adjusted the range.
  { type: "Homestay", min: 2000, max: 10000 }, // Homestays vary from affordable to slightly higher end.
  { type: "Villa", min: 900000, max: 60000 }, // Villas are often luxury properties, so I expanded the max range.
  { type: "Apartment", min: 8000, max: 30000 }, // Apartments can range from affordable to moderately expensive.
  { type: "Eco Lodge", min: 4000, max: 15000 }, // Eco lodges tend to have a mid-range price point.
  { type: "Boutique Hotel", min: 5000, max: 25000 }, // Boutique hotels often fit within this range, more premium than guesthouses but not quite as expensive as luxury resorts.
];

const transportTypes = [
  "Public Transport (Bus, Train, Tuk-tuk)",
  "Shared Taxi or Ride-Sharing",
  "Bicycle or E-Bike",
  "Motorbike Rental",
  "Self-Drive (Rental Car, Scooter)",
  "Private Car with Driver",
  "Luxury Tour Bus or Chauffeur Service",
  "Campervan or RV",
  "Boat or Ferry",
  "Helicopter (Charter or Tour)",
];


const transportModes = [
  { type: "Public Transport (Bus, Train, Tuk-tuk)", min: 50, max: 500 }, // Public transport is typically affordable and ranges from very cheap to slightly higher, depending on the distance.
  { type: "Shared Taxi or Ride-Sharing (1-4 people)", min: 500, max: 3000 }, // Shared taxis are affordable but cost more than public transport.
  { type: "Bicycle or E-Bike (1 person)", min: 100, max: 1000 }, // Renting a bike or e-bike is usually low-cost.
  { type: "Motorbike Rental (1-2 people)", min: 500, max: 3000 }, // Renting a motorbike is an affordable, flexible mode of transport.
  { type: "Self-Drive (Rental Car, Scooter) (1-2 people)", min: 2000, max: 15000 }, // Rental vehicles offer more comfort but at a higher price.
  { type: "Private 123 Car with Driver (1-4 people)", min: 4000, max: 30000 }, // Private car rentals include a driver, with higher costs based on trip distance or comfort.
  { type: "Luxury Tour Bus or Chauffeur Service (10-50 people)", min: 20000, max: 100000 }, // High-end tour buses or chauffeur services for larger groups.
  { type: "Campervan or RV (2-6 people)", min: 10000, max: 50000 }, // Renting a campervan or RV for a more comfortable and longer travel experience.
  { type: "Boat or Ferry (Varies)", min: 50000, max: 70000 }, // Boat rentals or ferry rides, with varying prices based on the type and duration.
  { type: "Helicopter (Charter or Tour) (1-4 people)", min: 50, max: 500 }, // Helicopter services are a luxury offering and tend to have high pricing.
];




const specialNeeds: { id: string; label: SpecialNeedsType }[] = [
  { id: "sea-view", label: "Sea view" },
  { id: "jungle-stay", label: "Jungle stay" },
  { id: "camping", label: "Camping" },
  { id: "villa", label: "Villa" },
  { id: "cultural-stay", label: "Cultural stay" },
];

// District data with places
const districtData: Record<DistrictType, string[]> = {
  Galle: [
    "Galle Fort",
    "Unawatuna Beach",
    "Jungle Beach",
    "Koggala Lake Boat Safari",
    "Sea Turtle Hatchery",
    "Dutch Reformed Church",
    "All Saints' Church",
    "Galle Lighthouse",
    "Maritime Archaeology Museum (Exterior & Surroundings)",
    "Meera Mosque",
    "Mihiripenna Beach",
    "Dewata Beach",
    "Koggala Beach",
    "Kanneliya Rainforest",
    "Flag Rock Bastion",
    "Sunset at the Ramparts",
    "Peace Pagoda (Rumassala Temple)",
    "Japanese Peace Pagoda Hilltop Viewpoint",
    "Galle Fish Market",
    "Galle Old Town Streets",
    "Street Art in Galle Fort",
    "Galle Public Market"
]

};

const districts = Object.keys(districtData) as DistrictType[];

const travelStyles: TravelStyleType[] = [
  "Adventure & Nature",
  "Cultural & Historical",
  "Relaxation & Leisure",
  "Food & Cultural Experiences"
];

const activities: string[] = [
  "Trekking",
  "Surfing",
  "Safari",
  "Scuba Diving",
  "Temple Visits",
  "Heritage Tours",
  "Village Experiences",
  "Beach Stays",
  "Ayurveda & Spa",
  "Waterfall Visits",
  "Food Tours",
  "Tea Plantation Visits",
  "Cooking Classes"
];

const Index = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form initialization
  const form = useForm<TravelFormValues>({
    resolver: zodResolver(travelFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const header = document.querySelector(".parallax-header");
      if (header instanceof HTMLElement) {
        header.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        header.style.opacity = `${1 - scrollPosition / 700}`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [filteredAccommodations, setFilteredAccommodations] = useState(accommodationTypes);
  //Accomodation filtering
  useEffect(() => {
    const budgetRange = form.watch("accommodationPreferences.budgetRange");
    const parsedRange = parseBudgetRange(budgetRange);

    if (parsedRange) {
      const { min, max } = parsedRange;

      // Filter accommodations based on the budget range
      const updatedTypes = accommodationOptions
        .filter(({ min: accMin, max: accMax }) => {
          // Check if the accommodation's price range overlaps with the selected budget range
          return (
            (accMin >= min && accMin <= max) || // Accommodation min is within the budget range
            (accMax >= min && accMax <= max) || // Accommodation max is within the budget range
            (accMin <= min && accMax >= max)    // Accommodation range fully contains the budget range
          );
        })
        .map(({ type }) => type);

      setFilteredAccommodations(updatedTypes);
    } else {
      // If no budget range is selected, show all accommodation types
      setFilteredAccommodations(accommodationTypes);
    }
  }, [form.watch("accommodationPreferences.budgetRange")]);
  // Helper function to parse budget range string into min and max values
  const parseBudgetRange = (budgetRange: string): { min: number; max: number } | null => {
    // Match patterns like "LKR 19500-37500/night" or "LKR 70000+/night"
    const match = budgetRange.match(/(\d+)\+?\/?.*?-?\/?.*?(\d*)\+?\/?.*/);
    if (!match) return null;

    const min = parseInt(match[1], 10);
    const max = match[2] ? parseInt(match[2], 10) : Infinity; // Use Infinity for ranges with "+"

    return { min, max };
  };

  const [filteredTransportModes, setFilteredTransportModes] = useState(transportTypes);

  // Transport mode filtering
  useEffect(() => {
    const budgetRange = form.watch("accommodationPreferences.budgetRange");
    const parsedRange = parseBudgetRange(budgetRange);

    if (parsedRange) {
      const { min, max } = parsedRange;

      // Filter transport modes based on the budget range
      const updatedTransportModes = transportModes
        .filter(({ min: transportMin, max: transportMax }) => {
          // Check if the transport mode's price range overlaps with the selected budget range
          return (
            (transportMin >= min && transportMin <= max) || // Transport min is within the budget range
            (transportMax >= min && transportMax <= max) || // Transport max is within the budget range
            (transportMin <= min && transportMax >= max)    // Transport range fully contains the budget range
          );
        })
        .map(({ type }) => type);

      setFilteredTransportModes(updatedTransportModes);
    } else {
      // If no budget range is selected, show all transport modes
      setFilteredTransportModes(transportTypes);
    }
  }, [form.watch("accommodationPreferences.budgetRange")]);

  // Helper function to parse budget range string into min and max values


  // Duration calculation
  const [days, setDays] = useState<number | null>(null);
  const [budgetAmount, setBudgetAmount] = useState<number | null>(null);
  useEffect(() => {
    const budgetRange = form.watch("accommodationPreferences.budgetRange");
    const parsedRange = parseBudgetRange(budgetRange); // Corrected variable name


    if (parsedRange && days) {
      const { min, max } = parsedRange;
      const averageBudget = (min + max) / 2; // Use average for calculation
      const totalBudget = days * averageBudget;
      setBudgetAmount(totalBudget);
      form.setValue("accommodationPreferences.budgetAmount", totalBudget); // Update form value
    } else {
      setBudgetAmount(null);
      form.setValue("accommodationPreferences.budgetAmount", null); // Reset form value
    }
  }, [form.watch("accommodationPreferences.budgetRange"), days]);

  // Watched form values
  const arrivalDate = form.watch("arrivalDate");
  const departureDate = form.watch("departureDate");
  const needPickup = form.watch("airportPickup.needPickup");
  const selectedDistricts = form.watch("selectedDistricts") || [];
  const selectedPlaces = form.watch("selectedPlaces") || {};
  const needGuide = form.watch("additionalServices.needGuide"); 

  useEffect(() => {
    if (arrivalDate && departureDate) {
      const dayCount = differenceInDays(departureDate, arrivalDate);
      setDays(dayCount > 0 ? dayCount : null);
    } else {
      setDays(null);
    }
  }, [arrivalDate, departureDate]);

  // Update places when districts change
  useEffect(() => {
    const updatedSelectedPlaces = { ...selectedPlaces };

  

    // Add empty arrays for newly selected districts
    selectedDistricts.forEach((district) => {
      if (!updatedSelectedPlaces[district]) {
        updatedSelectedPlaces[district] = [];
      }
    });

    if (JSON.stringify(updatedSelectedPlaces) !== JSON.stringify(selectedPlaces)) {
      form.setValue("selectedPlaces", updatedSelectedPlaces);
    }
  }, [selectedDistricts, form, selectedPlaces]);

  // Step navigation
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsToValidateForStep(currentStep);

    const isValid = await form.trigger(fieldsToValidate as any);

    if (isValid) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      toast.error("Please fix the errors before proceeding");
    }
  };

  // Form submission
  const onSubmit = async (data: TravelFormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);

      toast.success("Your travel booking has been submitted successfully!");

    } catch (error) {
      toast.error("There was an error submitting your form. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine which fields to validate based on current step
  const getFieldsToValidateForStep = (step: number): string[] => {
    switch (step) {
      case 1:
        return ["arrivalDate", "departureDate"];
      case 2:
        // Flight details are optional
        return [];
      case 3:
        return [
          "accommodationPreferences.budgetRange",
          "accommodationPreferences.accommodationType",
        ];
      case 4:
        return [
          "travelType",
          "transportMode",
          ...(form.getValues("travelType") === "Group"
            ? ["groupSize", "groupType"]
            : []),
          "travelStyles",
          "activities",
        ];
      case 5:
        return ["selectedDistricts"];
        case 6:
          // Additional services are optional
          return [];
        case 7:
          // Final review - all fields should be validated
          return [];
      default:
        return [];
    }
  };

  // Helper functions
  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "MMMM d, yyyy") : "Not specified";
  };

  const formatTime = (time: string | undefined) => {
    return time || "Not specified";
  };

  // Conditional rendering
  const isLastStep = currentStep === steps.length;
  const isFirstStep = currentStep === 1;



  // Step content rendering
  const renderFormStepper = () => {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between space-x-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <button
                type="button"
                onClick={() => {
                  if (step.id <= currentStep) {
                    setCurrentStep(step.id);
                  }
                }}
                disabled={step.id > currentStep}
                className={cn(
                  "flex-1 relative py-2",
                  step.id <= currentStep
                    ? "text-primary cursor-pointer"
                    : "text-muted-foreground cursor-not-allowed"
                )}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full mb-2",
                      step.id < currentStep
                        ? "bg-primary text-primary-foreground"
                        : step.id === currentStep
                          ? "border-2 border-primary"
                          : "border-2 border-muted"
                    )}
                  >
                    {step.id < currentStep ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-sm">{step.id}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs hidden sm:block",
                      step.id <= currentStep ? "font-medium" : ""
                    )}
                  >
                    {step.name}
                  </span>
                </div>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-[2px]",
                    currentStep > index + 1
                      ? "bg-primary"
                      : "bg-muted"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderDateRangeSelector = () => {
    return (
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        exit="exit"
        className="grid gap-6 lg:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="arrivalDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-base">Arrival Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-14 pl-4 text-left font-normal justify-between bg-white border border-input hover:bg-secondary/30",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select arrival date</span>
                      )}
                      <CalendarIcon className="h-5 w-5 opacity-70" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Please select your arrival date
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="departureDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-base">Departure Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-14 pl-4 text-left font-normal justify-between bg-white border border-input hover:bg-secondary/30",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select departure date</span>
                      )}
                      <CalendarIcon className="h-5 w-5 opacity-70" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < (arrivalDate || new Date())
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Please select your departure date
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="lg:col-span-2 pt-2">
          <FormLabel className="text-base">Duration</FormLabel>
          <div className="flex items-center mt-2 space-x-2">
            <Input
              value={days ? `${days} days` : ""}
              readOnly
              className="h-14 bg-muted/30 cursor-not-allowed text-base font-medium"
            />
            {!days && arrivalDate && !departureDate && (
              <div className="flex items-center text-sm text-muted-foreground">
                <InfoIcon className="w-4 h-4 mr-1" />
                Select a departure date to calculate duration
              </div>
            )}
            {days && (
              <Badge variant="outline" className="bg-primary/10 py-2 px-3">
                {days} {days === 1 ? "day" : "days"} trip
              </Badge>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderFlightDetails = () => {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        exit="exit"
        className="space-y-6"
      >
        <motion.div variants={fadeInUp} className="space-y-2">
          <h3 className="text-xl font-medium">Flight Details (Optional)</h3>
          <p className="text-muted-foreground">
            Provide your flight information if available
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="grid gap-6 md:grid-cols-2 pt-2"
        >
          <FormField
            control={form.control}
            name="flightDetails.flightNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flight Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Plane className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...field}
                      placeholder="e.g. SQ321"
                      className="pl-10 h-12 bg-white"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="flightDetails.airline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Airline</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Singapore Airlines"
                    className="h-12 bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="flightDetails.departureAirport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure Airport</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Map className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...field}
                      placeholder="e.g. JFK"
                      className="pl-10 h-12 bg-white"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="flightDetails.arrivalAirport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arrival Airport</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Map className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...field}
                      placeholder="e.g. SIN"
                      className="pl-10 h-12 bg-white"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="flightDetails.flightDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Flight Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 pl-3 text-left font-normal justify-between bg-white",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                        <CalendarIcon className="ml-auto h-5 w-5 opacity-70" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="flightDetails.flightTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flight Time</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...field}
                      type="time"
                      className="pl-10 h-12 bg-white"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="space-y-6 border-t pt-6 mt-8"
        >
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Airport Pickup</h3>
            <p className="text-muted-foreground">
              Would you like us to arrange airport pickup service?
            </p>
          </div>

          <FormField
            control={form.control}
            name="airportPickup.needPickup"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-white/50 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Need Airport Pickup?</FormLabel>
                  <FormDescription>
                    We'll arrange a comfortable ride from the airport
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {needPickup && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FormField
                control={form.control}
                name="airportPickup.additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes for Pickup</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special requests or information for your pickup?"
                        className="resize-none bg-white h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide information about luggage, special needs, or specific instructions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  const renderAccommodationPreferences = () => {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        exit="exit"
        className="space-y-6"
      >
        <motion.div variants={fadeInUp} className="space-y-2">
          <h3 className="text-xl font-medium">Budget & Accommodation Preferences</h3>
          <p className="text-muted-foreground">
            Tell us about your budget and accommodation preferences
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="grid gap-6 md:grid-cols-2 pt-2"
        >
          {/* Budget Range Selection */}
          <FormField
            control={form.control}
            name="accommodationPreferences.budgetRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Suggested Budget Range (per day)</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value); // Update the form value directly
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 bg-white">
                      <SelectValue placeholder="Select a budget range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white shadow-lg">
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select your preferred budget range per day.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Budget Amount Calculation */}
          <FormField
            control={form.control}
            name="accommodationPreferences.budgetAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Budget (LKR)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-base"></span>
                    <Input
                      type="text"
                      placeholder="Calculated budget"
                      className="pl-8 h-12 bg-white"
                      value={budgetAmount ? `LKR ${budgetAmount.toFixed(2)}` : ""}
                      readOnly
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Total budget = Number of days × Selected budget range.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accommodationPreferences.accommodationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Accommodation Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 bg-white">
                      <SelectValue placeholder="Select accommodation type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white shadow-lg">
                    {filteredAccommodations.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose your preferred type of accommodation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />;
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-3 pt-4">
          <FormField
            control={form.control}
            name="accommodationPreferences.specialNeeds"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Special Accommodation Needs</FormLabel>
                  <FormDescription>
                    Select any special accommodation preferences you have
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="accommodationPreferences.specialNeeds"
                    render={({ field }) => {
                      return (
                        <FormItem
                          className="flex flex-col items-start space-y-3 p-4 rounded-md border bg-white/50"
                        >
                          <FormControl>
                            <select
                              value={field.value || ""}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="p-2 border rounded-md"
                            >
                              <option value="" disabled>
                                Select a special accommodation
                              </option>
                              {specialNeeds.map((item) => (
                                <option key={item.id} value={item.label}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>

                        </FormItem>
                      );
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>


      </motion.div>
    );
  };

  const renderTravelPreferences = ({ days }: { days: number | null }) => {
    return (
      <motion.div variants={staggerContainer} initial="hidden" animate="show" exit="exit" className="space-y-6">
        {/* Travel Preferences Heading */}
        <motion.div variants={fadeInUp} className="space-y-2">
          <h3 className="text-xl font-medium">Travel Preferences</h3>
          <p className="text-muted-foreground">Tell us more about your travel style and preferences.</p>
        </motion.div>
  
        {/* Travel Type Selection */}
        <motion.div variants={fadeInUp} className="grid gap-6 md:grid-cols-2 pt-2">
          <FormField
            control={form.control}
            name="travelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Travel Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                  <FormControl>
                    <SelectTrigger className="h-12 bg-white">
                      <SelectValue placeholder="Select travel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white shadow-lg">
                    <SelectItem value="Solo">Solo</SelectItem>
                    <SelectItem value="Couple">Couple</SelectItem>
                    <SelectItem value="Group">Group</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Are you traveling alone, as a couple, or in a group?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Group Travel Options */}
          {form.watch("travelType") === "Group" && (
            <>
              <FormField
                control={form.control}
                name="groupSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Size</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Number of people"
                        className="h-12 bg-white"
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          field.onChange(isNaN(value) ? null : value);
                        }}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>How many people will be traveling in your group?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="groupType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-white">
                          <SelectValue placeholder="Select group type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white shadow-lg">
                        <SelectItem value="Family Trip">Family Trip</SelectItem>
                        <SelectItem value="Friends' Trip">Friends' Trip</SelectItem>
                        <SelectItem value="Corporate Retreat">Corporate Retreat</SelectItem>
                        <SelectItem value="School/University Trip">School/University Trip</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>What kind of group are you traveling with?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="hasChildrenOrElderly"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-white/50 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Children or Elderly in Group?</FormLabel>
                      <FormDescription>Does your group include children under 12 or adults over 65?</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value || false} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
        </motion.div>
  
        {/* Daily Activities Selection */}
        {days && days > 0 && (
          <motion.div variants={fadeInUp} className="space-y-6 pt-6">
            <div>
              <FormLabel className="text-base">Daily Activities</FormLabel>
              <FormDescription className="mt-1 mb-4">Select one activity per day.</FormDescription>
  
              {Array.from({ length: days }).map((_, dayIndex) => (
                <div key={dayIndex} className="mb-6">
                  <h3 className="font-semibold text-lg">Day {dayIndex + 1}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {activities.map((activity) => (
                      <FormField
                        key={`${activity}-${dayIndex}`}
                        control={form.control}
                        name={`activities.${dayIndex}` as const} // Use type assertion to ensure TypeScript understands this is valid
                        render={({ field }) => (
                          <FormItem
                            className={cn(
                              "flex flex-row items-start space-x-3 space-y-0 p-3 rounded-md border",
                              field.value === activity ? "bg-primary/5 border-primary/50" : "bg-white"
                            )}
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value === activity}
                                onCheckedChange={() => field.onChange(field.value === activity ? null : activity)}
                              />
                            </FormControl>
                            <FormLabel className="cursor-pointer font-normal text-sm">{activity}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <FormMessage />
          </motion.div>
        )}
      </motion.div>
    );
  };
  
    const renderDestinationSelector = () => {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        exit="exit"
        className="space-y-6"
      >
        <motion.div variants={fadeInUp} className="space-y-2">
          <h3 className="text-xl font-medium">Destination Preferences</h3>
          <p className="text-muted-foreground">
            Select the districts and places you'd like to visit
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-6 pt-2">
          <div>
            <FormLabel className="text-lg">Select Districts</FormLabel>
            <FormDescription className="mt-1 mb-4">
              Choose the districts you want to explore
            </FormDescription>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {districts.map((district) => (
                <FormField
                  key={district}
                  control={form.control}
                  name="selectedDistricts"
                  render={({ field }) => {
                    return (
                      <FormItem
                        className={cn(
                          "flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md border",
                          field.value?.includes(district)
                            ? "bg-primary/5 border-primary/50"
                            : "bg-white"
                        )}
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(district)}
                            onCheckedChange={(checked) => {
                              const currentValues = field.value || [];

                              if (checked) {
                                field.onChange([...currentValues, district]);
                              } else {
                                field.onChange(
                                  currentValues.filter(
                                    (value) => value !== district
                                  )
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-normal">
                          {district}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </div>

          {selectedDistricts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="pt-4"
            >
              <FormLabel className="text-lg">Select Places to Visit</FormLabel>
              <FormDescription className="mt-1 mb-4">
                Choose specific places you want to visit in Galle (All places are Free to Visit)
              </FormDescription>

              {selectedDistricts.map((district) => (
                <div key={district} className="mb-6">
                  <h4 className="text-md font-medium mb-3 bg-secondary/50 p-2 rounded">
                    {district}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pl-2">
                    {districtData[district as DistrictType].map((place) => (
                      <FormField
                        key={`${district}-${place}`}
                        control={form.control}
                        name={`selectedPlaces.${district}`}
                        render={({ field }) => {
                          const currentPlaces = field.value || [];
                          return (
                            <FormItem
                              className="flex flex-row items-center space-x-2 space-y-0 py-1"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={currentPlaces.includes(place)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      form.setValue(
                                        `selectedPlaces.${district}`,
                                        [...currentPlaces, place]
                                      );
                                    } else {
                                      form.setValue(
                                        `selectedPlaces.${district}`,
                                        currentPlaces.filter((p) => p !== place)
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="cursor-pointer font-normal text-sm">
                                {place}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          <div className="border-t pt-6">
            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional requests or information for your trip..."
                      className="resize-none bg-white min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Share any special requirements, questions, or additional details about your trip
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </motion.div>
      </motion.div>
    );

  };
  const renderAdditionalServices = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Additional Services</h3>
          <p className="text-muted-foreground">
            Select any extra services you might need during your trip
          </p>
        </div>

        <div className="space-y-6 pt-2">
          <FormLabel className="text-base">Travel Services</FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalServices.map((service) => (
              <FormField
                key={service.id}
                control={form.control}
                name="additionalServices.selectedServices"
                render={({ field }) => {
                  const Icon = service.icon;
                  return (
                    <FormItem
                      className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md border bg-white/50"
                    >
                      <FormControl>
                        <Checkbox
                          checked={(field.value || []).includes(service.id)}
                          onCheckedChange={(checked) => {
                            const currentValues = field.value || [];
                            if (checked) {
                              field.onChange([...currentValues, service.id]);
                            } else {
                              field.onChange(
                                currentValues.filter((value) => value !== service.id)
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <div className="flex items-center">
                        <Icon className="h-5 w-5 mr-2 text-primary" />
                        <FormLabel className="cursor-pointer font-normal">
                          {service.label}
                        </FormLabel>
                      </div>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t">
          <FormField
            control={form.control}
            name="additionalServices.needGuide"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-white/50 shadow-sm">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                    <FormLabel className="text-base">Need a Tour Guide?</FormLabel>
                  </div>
                  <FormDescription>
                    Would you like a dedicated tour guide for your trip?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {needGuide && (
            <div className="pl-4 pt-2 space-y-4">
              <FormField
                control={form.control}
                name="additionalServices.guideLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Guide Language</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 bg-white">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white shadow-lg">
                        {guideLanguages.map((language) => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose your preferred language for the tour guide
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalServices.guideNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions for Guide</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any specific requirements for your guide?"
                        className="resize-none bg-white h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide any specific requirements or areas of expertise needed
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        <div className="space-y-4 pt-6 border-t">
          <FormField
            control={form.control}
            name="additionalServices.additionalRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Additional Requests</FormLabel>
                <FormDescription className="mt-1">
                  Any other services or special requirements for your trip?
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="E.g., specific dietary needs, health considerations, or any other special requirements"
                    className="resize-none bg-white h-32 mt-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  };


  const renderFormConfirmation = () => {
    const formData = form.getValues();
    const days = formData.arrivalDate && formData.departureDate
      ? differenceInDays(formData.departureDate, formData.arrivalDate)
      : 0;
  
    return (
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold">Review Your Trip Details</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Please review your travel plan details below. If everything looks correct, you're ready to submit your booking!
          </p>
        </div>
  
        <div className="space-y-6">
          <div className="bg-background rounded-lg border p-6 space-y-6">
            {/* Trip Overview */}
            <div>
              <h3 className="text-lg font-medium">Trip Overview</h3>
              <div className="grid gap-4 mt-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Travel Type</p>
                  <p className="font-medium">{formData.travelType}</p>
                </div>
  
                {formData.travelType === "Group" && (
                  <>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Group Size</p>
                      <p className="font-medium">{formData.groupSize || "Not specified"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Group Type</p>
                      <p className="font-medium">{formData.groupType || "Not specified"}</p>
                    </div>
                  </>
                )}
  
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Transport Mode</p>
                  <p className="font-medium">{formData.transportMode}</p>
                </div>
              </div>
            </div>
  
            {/* Travel Dates */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium">Travel Dates</h3>
              <div className="grid gap-4 mt-4 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Arrival Date</p>
                  <p className="font-medium">{formatDate(formData.arrivalDate)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Departure Date</p>
                  <p className="font-medium">{formatDate(formData.departureDate)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{days} days</p>
                </div>
              </div>
            </div>
  
            {/* Flight Information */}
            {formData.flightDetails && (
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium">Flight Information</h3>
                <div className="grid gap-4 mt-4 md:grid-cols-3">
                  {formData.flightDetails.flightNumber && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Flight Number</p>
                      <p className="font-medium">{formData.flightDetails.flightNumber}</p>
                    </div>
                  )}
                  {formData.flightDetails.airline && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Airline</p>
                      <p className="font-medium">{formData.flightDetails.airline}</p>
                    </div>
                  )}
                  {formData.flightDetails.departureAirport && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Departure Airport</p>
                      <p className="font-medium">{formData.flightDetails.departureAirport}</p>
                    </div>
                  )}
                  {formData.flightDetails.arrivalAirport && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Arrival Airport</p>
                      <p className="font-medium">{formData.flightDetails.arrivalAirport}</p>
                    </div>
                  )}
                  {formData.flightDetails.flightDate && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Flight Date</p>
                      <p className="font-medium">{formatDate(formData.flightDetails.flightDate)}</p>
                    </div>
                  )}
                  {formData.flightDetails.flightTime && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Flight Time</p>
                      <p className="font-medium">{formatTime(formData.flightDetails.flightTime)}</p>
                    </div>
                  )}
                </div>
                {formData.airportPickup.needPickup && (
                  <div className="mt-4 pt-2 border-t border-border/50">
                    <Badge variant="outline" className="bg-primary/10">Airport Pickup Requested</Badge>
                    {formData.airportPickup.additionalNotes && (
                      <div className="mt-2 text-sm bg-muted/30 p-3 rounded">
                        <p className="font-medium mb-1">Additional Notes:</p>
                        <p>{formData.airportPickup.additionalNotes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
  
            {/* Accommodation Preferences */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium">Accommodation Preferences & Budget</h3>
              <div className="grid gap-4 mt-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Budget Range</p>
                  <p className="font-medium">{formData.accommodationPreferences.budgetRange}</p>
                </div>
                {formData.accommodationPreferences.budgetAmount && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Budget Amount</p>
                    <p className="font-medium">LKR {formData.accommodationPreferences.budgetAmount}</p>
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Accommodation Type</p>
                  <p className="font-medium">{formData.accommodationPreferences.accommodationType}</p>
                </div>
                {formData.accommodationPreferences.specialNeeds &&
                  formData.accommodationPreferences.specialNeeds.length > 0 && (
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-sm text-muted-foreground">Special Accommodation Needs</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {formData.accommodationPreferences.specialNeeds.map((need) => (
                          <Badge key={need} variant="outline" className="bg-secondary/50">
                            {need}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
  
            {/* Travel Preferences */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium">Travel Preferences</h3>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Preferred Travel Styles</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.travelStyles.map((style) => (
                      <Badge key={style} className="bg-primary/10 text-primary border-primary/20 py-1">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Activities of Interest</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.activities.map((activity) => (
                      <Badge key={activity} variant="outline" className="bg-muted/50">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
  
            {/* Destinations */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium">Destinations</h3>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Selected Districts</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedDistricts.map((district) => (
                      <Badge key={district} className="bg-primary/10 text-primary border-primary/20 py-1">
                        {district}
                      </Badge>
                    ))}
                  </div>
                </div>
                {formData.selectedPlaces && Object.keys(formData.selectedPlaces).length > 0 && (
                  <div className="space-y-3 mt-4">
                    <p className="text-sm text-muted-foreground">Selected Places</p>
                    {Object.entries(formData.selectedPlaces).map(([district, places]) => (
                      places.length > 0 && (
                        <div key={district} className="mt-2">
                          <p className="text-sm font-medium">{district}</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {places.map((place) => (
                              <Badge key={`${district}-${place}`} variant="outline" className="bg-background">
                                {place}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>
  
            {/* Additional Services */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium">Additional Services</h3>
              <div className="space-y-4 mt-4">
                {/* Selected Additional Services */}
                {formData.additionalServices.selectedServices && formData.additionalServices.selectedServices.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Selected Services</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.additionalServices.selectedServices.map((serviceId) => {
                        const service = additionalServices.find((s) => s.id === serviceId);
                        return (
                          <Badge key={serviceId} variant="outline" className="bg-muted/50">
                            {service?.label}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
  
                {/* Tour Guide Details */}
                {formData.additionalServices.needGuide && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Tour Guide Details</p>
                    <div className="space-y-1">
                      <p className="font-medium">Preferred Language: {formData.additionalServices.guideLanguage}</p>
                      {formData.additionalServices.guideNotes && (
                        <p className="text-sm text-muted-foreground">Notes: {formData.additionalServices.guideNotes}</p>
                      )}
                    </div>
                  </div>
                )}
  
                {/* Additional Requests */}
                {formData.additionalServices.additionalRequests && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Additional Requests</p>
                    <div className="p-3 bg-muted/30 rounded-md">
                      <p>{formData.additionalServices.additionalRequests}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
  
            {/* Special Requests */}
            {formData.specialRequests && (
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium">Special Requests</h3>
                <div className="mt-3 p-3 bg-muted/30 rounded-md">
                  <p>{formData.specialRequests}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderDateRangeSelector();
      case 2:
        return renderFlightDetails();
      case 3:
        return renderAccommodationPreferences();
      case 4:
        return renderTravelPreferences({days});
      case 5:
        return renderDestinationSelector();
        case 6:
          return renderAdditionalServices();
        case 7:
          return renderFormConfirmation();
      default:
        return null;
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
  {/* Hero Header */}
  <Navbar />
  <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/30" />

    <div
      className="absolute inset-0 bg-cover bg-center parallax-header"
      style={{
        backgroundImage: `url(${bg})`, // Set the imported image as the background
        transformOrigin: 'center',
        willChange: 'transform, opacity',
        zIndex: -1
      }}
    />
    
    {/* Optional overlay to make text more readable */}
    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
    
    <div className="container relative h-full flex flex-col justify-center items-center text-center z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto px-4"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md">
          Plan Your Perfect Journey
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
          Customize your travel experience with our seamless booking form
        </p>
      </motion.div>
    </div>
  </div>



      {/* Main Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={cn(
          "container px-4 relative -mt-24 z-20 pb-20"
        )}
      >
        <div className="glass-morphism rounded-2xl subtle-shadow p-6 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">Travel Booking Form</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete the form below to create your customized travel itinerary. We'll help you plan the perfect trip based on your preferences.
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto">
            {renderFormStepper()}

            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      //exit={{ opacity: 0, x: -20 }}
                      transition={formTransition}
                    >
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>

                  <motion.div
                    className="flex justify-between pt-6 border-t"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={isFirstStep}
                      className="min-w-[100px]"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>

                    {!isLastStep ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="min-w-[100px]"
                      >
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="min-w-[120px] bg-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>Processing...</>
                        ) : (
                          <>
                            Submit
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </motion.div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />

    </div>
  );
};

export default Index;
