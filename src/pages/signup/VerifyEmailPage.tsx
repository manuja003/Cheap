import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const checkVerification = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }

      // Force refresh the token to get the latest email verification status
      try {
        await user.reload();
        if (user.emailVerified) {
          setIsVerifying(true);
          // Fetch user profile from Firestore
          const collections = ['travelers', 'guides', 'hotels', 'activity-providers'];
          let userDoc = null;

          for (const collectionName of collections) {
            const q = query(
              collection(db, collectionName),
              where('email', '==', user.email)
            );
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
              userDoc = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
              break;
            }
          }

          if (userDoc) {
            // Store in localStorage for future use
            localStorage.setItem('userProfile', JSON.stringify(userDoc));
            toast({
              title: "Email Verified",
              description: "Your email has been verified. Redirecting to profile...",
            });
            navigate('/profile');
          } else {
            toast({
              title: "Error",
              description: "Could not find user profile",
              variant: "destructive",
            });
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error checking verification:', error);
        toast({
          title: "Error",
          description: "Failed to check email verification status",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
      }
    };

    // Check verification status every 5 seconds
    const interval = setInterval(checkVerification, 5000);

    // Initial check
    checkVerification();

    return () => clearInterval(interval);
  }, [navigate, toast]);

  const handleResendVerificationEmail = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        await sendEmailVerification(user);
        toast({
          title: "Verification Email Sent",
          description: "Please check your email to verify your account.",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to send verification email.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "No user found. Please try logging in again.",
        variant: "destructive",
      });
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="text-gray-600 mb-6">
          A verification email has been sent to your email address. Please verify your email to continue.
        </p>
        <div className="space-y-4">
          <Button 
            onClick={handleResendVerificationEmail} 
            className="w-full"
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Resend Verification Email"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/login")} 
            className="w-full"
            disabled={isVerifying}
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;