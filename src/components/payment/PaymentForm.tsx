import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
  bookingType: 'activity' | 'hotel';
}

const PaymentForm = ({ amount, onSuccess, onCancel, bookingType }: PaymentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleProceedToPayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Proceeding to Payment!",
        description: `You will be redirected to the payment page for your ${bookingType} booking.`,
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Payment</h2>
        <p className="text-gray-600">Total Amount: ${amount.toFixed(2)}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="flex-1 bg-[#2a9d8f] hover:bg-[#2a9d8f]/80 text-white"
          onClick={handleProceedToPayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            `Proceed to Payment`
          )}
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;