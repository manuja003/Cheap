import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import TripPlanLoading from "./trip-planner/TripPlanLoading";
import TripPlanResult from "./trip-planner/TripPlanResult";
import { useToast } from "@/components/ui/use-toast";

type TripPlannerFormData = {
  visitInspiration: string;
  previousVisit: "yes" | "no";
  hotelPreference: string;
  workspaceNeeded: boolean;
  transportPreference: "private" | "public";
  overnightTravel: boolean;
  diningPreference: "buffet" | "alacarte";
  dietaryRequirements: string;
  photographerNeeded: boolean;
  volunteeringInterest: boolean;
  languageInterest: boolean;
  villageVisit: boolean;
  ecoFriendlySouvenirs: boolean;
  bargainingHelp: boolean;
  safetyInfo: boolean;
  insuranceHelp: boolean;
  expenseTracking: boolean;
  networkingInterest: boolean;
};

const sections = [
  {
    id: "general",
    title: "1. General Information",
    fields: ["visitInspiration", "previousVisit"],
  },
  {
    id: "accommodation",
    title: "2. Accommodation Preferences",
    fields: ["hotelPreference", "workspaceNeeded"],
  },
  {
    id: "transportation",
    title: "3. Transportation",
    fields: ["transportPreference", "overnightTravel"],
  },
  {
    id: "dining",
    title: "4. Food & Dining",
    fields: ["diningPreference", "dietaryRequirements"],
  },
  {
    id: "activities",
    title: "5. Activities & Experiences",
    fields: ["photographerNeeded", "volunteeringInterest"],
  },
  {
    id: "cultural",
    title: "6. Traditional & Cultural Experiences",
    fields: ["languageInterest", "villageVisit"],
  },
  {
    id: "shopping",
    title: "7. Shopping & Souvenirs",
    fields: ["ecoFriendlySouvenirs", "bargainingHelp"],
  },
  {
    id: "safety",
    title: "8. Emergency & Safety",
    fields: ["safetyInfo", "insuranceHelp"],
  },
  {
    id: "misc",
    title: "9. Miscellaneous",
    fields: ["expenseTracking", "networkingInterest"],
  },
];

const TripPlannerForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const form = useForm<TripPlannerFormData>();
  const [progress, setProgress] = React.useState(0);
  const { toast } = useToast();

  const previousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  React.useEffect(() => {
    const values = form.watch();
    const totalSections = sections.length;
    const currentSectionFields = sections[currentSection].fields;
    
    // Calculate how many sections are fully completed
    let completedSections = 0;
    for (let i = 0; i < currentSection; i++) {
      const sectionFields = sections[i].fields;
      const isSectionComplete = sectionFields.every(field => 
        values[field as keyof TripPlannerFormData] !== undefined && 
        values[field as keyof TripPlannerFormData] !== ""
      );
      if (isSectionComplete) completedSections++;
    }

    // Calculate progress in current section
    const filledFieldsInCurrentSection = currentSectionFields.filter(field =>
      values[field as keyof TripPlannerFormData] !== undefined &&
      values[field as keyof TripPlannerFormData] !== ""
    ).length;
    
    const currentSectionProgress = filledFieldsInCurrentSection / currentSectionFields.length;
    
    // Calculate total progress
    const sectionWeight = 100 / totalSections;
    const calculatedProgress = (completedSections * sectionWeight) + 
      (currentSectionProgress * sectionWeight);
    
    setProgress(Math.min(calculatedProgress, 99)); // Cap at 99% until last section is complete
    
    // Only allow 100% when on last section and all fields are filled
    if (currentSection === sections.length - 1 && currentSectionProgress === 1) {
      setProgress(100);
    }
  }, [form.watch(), currentSection]);

  const mockTripPlan = {
    days: [
      {
        day: 1,
        activities: [
          "Arrival at Bandaranaike International Airport",
          "Check-in at hotel",
          "Evening city tour of Colombo",
        ],
        accommodation: {
          name: "Cinnamon Grand Colombo",
          type: "5-star hotel",
          price: 200,
        },
      },
      {
        day: 2,
        activities: [
          "Morning visit to Gangaramaya Temple",
          "Afternoon at Galle Face Green",
          "Shopping at Dutch Hospital",
        ],
        accommodation: {
          name: "Cinnamon Grand Colombo",
          type: "5-star hotel",
          price: 200,
        },
        guide: {
          name: "Samantha Perera",
          expertise: "Cultural Expert",
        },
      },
      // Add more days as needed
    ],
    totalBudget: 1500,
  };

  const handleFinalize = () => {
    // Implement payment gateway integration
    toast({
      title: "Redirecting to Payment",
      description: "Please wait while we redirect you to the payment gateway...",
    });
  };

  const handleCustomize = () => {
    setShowResult(false);
    setCurrentSection(0);
    form.reset();
  };

  const onSubmit = async (data: TripPlannerFormData) => {
    console.log(data);
    setIsSubmitting(true);
    
    // After 7 seconds, show the result
    setTimeout(() => {
      setIsSubmitting(false);
      setShowResult(true);
    }, 7000);
  };

  if (isSubmitting) {
    return <TripPlanLoading onLoadingComplete={() => setShowResult(true)} />;
  }

  if (showResult) {
    return (
      <TripPlanResult
        tripPlan={mockTripPlan}
        onFinalize={handleFinalize}
        onCustomize={handleCustomize}
      />
    );
  }

  const currentSectionData = sections[currentSection];

  return (
    <div className="p-8">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-primary">Plan Your Trip</h1>
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            {Math.round(progress)}% completed
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6 bg-white/50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary">{currentSectionData.title}</h2>
              
              {currentSectionData.id === "general" && (
                <>
                  <FormField
                    control={form.control}
                    name="visitInspiration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What inspired you to visit Sri Lanka?</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="min-h-[100px]" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="previousVisit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Have you traveled to Sri Lanka before?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="yes" />
                              <Label htmlFor="yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="no" />
                              <Label htmlFor="no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentSectionData.id === "accommodation" && (
                <>
                  <FormField
                    control={form.control}
                    name="hotelPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you prefer a specific hotel chain or brand?</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workspaceNeeded"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Do you need a workspace in your accommodation?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentSectionData.id === "transportation" && (
                <>
                  <FormField
                    control={form.control}
                    name="transportPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Would you prefer private transport over public?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="private" id="private" />
                              <Label htmlFor="private">Private</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="public" id="public" />
                              <Label htmlFor="public">Public</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="overnightTravel"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Are you comfortable with overnight buses/trains?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentSectionData.id === "dining" && (
                <>
                  <FormField
                    control={form.control}
                    name="diningPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you prefer buffet-style meals or à la carte?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="buffet" id="buffet" />
                              <Label htmlFor="buffet">Buffet</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="alacarte" id="alacarte" />
                              <Label htmlFor="alacarte">À la carte</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dietaryRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you have any dietary requirements?</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="E.g., vegetarian, vegan, gluten-free" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentSectionData.id === "activities" && (
                <>
                  <FormField
                    control={form.control}
                    name="photographerNeeded"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Would you like to book a professional photographer?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="volunteeringInterest"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Are you interested in volunteering during your trip?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentSectionData.id === "cultural" && (
                <>
                  <FormField
                    control={form.control}
                    name="languageInterest"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Would you like to learn local language phrases?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="villageVisit"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Would you like to visit local villages?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentSectionData.id === "shopping" && (
                <>
                  <FormField
                    control={form.control}
                    name="ecoFriendlySouvenirs"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Are you interested in eco-friendly souvenirs?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bargainingHelp"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Would you like help with bargaining at local markets?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentSectionData.id === "safety" && (
                <>
                  <FormField
                    control={form.control}
                    name="safetyInfo"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Would you like information about local hospitals and pharmacies?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="insuranceHelp"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Would you like travel insurance recommendations?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentSectionData.id === "misc" && (
                <>
                  <FormField
                    control={form.control}
                    name="expenseTracking"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Would you like to track your expenses using an app?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="networkingInterest"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Are you interested in networking events or co-working spaces?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={previousSection}
                  disabled={currentSection === 0}
                  className="w-32"
                >
                  Previous
                </Button>
                {currentSection === sections.length - 1 ? (
                  <Button type="submit" className="w-32">Submit</Button>
                ) : (
                  <Button type="button" onClick={nextSection} className="w-32">
                    Next
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TripPlannerForm;
