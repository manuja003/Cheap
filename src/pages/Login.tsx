import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";
import { useState } from "react";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, setPersistence, browserLocalPersistence } from "firebase/auth";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Separator } from "../components/ui/separator";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

const Login = () => {
  const { userType } = useParams<{ userType: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [loginError, setLoginError] = useState<{
    emailOrUsername?: string;
    password?: string;
    general?: string;
  }>({});

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail || !validateEmail(resetEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Configure actionCodeSettings for password reset
      const actionCodeSettings = {
        url: window.location.origin + '/login/' + userType, // Redirect back to login page
        handleCodeInApp: true,
      };

      await sendPasswordResetEmail(auth, resetEmail, actionCodeSettings);
      toast({
        title: "Reset Email Sent",
        description: "Check your email for password reset instructions.",
      });
      setIsResetDialogOpen(false);
      setResetEmail("");
    } catch (error: any) {
      let message = "Failed to send reset email.";
      if (error.code === "auth/user-not-found") {
        message = "No account found with this email.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email format.";
      } else if (error.code === "auth/too-many-requests") {
        message = "Too many attempts. Please try again later.";
      }
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError({});

    if (!agreeToTerms) {
      toast({
        title: "Terms Not Accepted",
        description: "You must agree to the Terms and Conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    let email = emailOrUsername;

    // If the input is not an email, assume it's a username and fetch the corresponding email
    if (!validateEmail(emailOrUsername)) {
      try {
        const q = query(collection(db, userType + "s"), where("username", "==", emailOrUsername));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setLoginError({
            emailOrUsername: "No account found with this username.",
          });
          return;
        }
        email = querySnapshot.docs[0].data().email;
      } catch (err) {
        setLoginError({
          general: "Failed to verify credentials. Please try again.",
        });
        return;
      }
    }

    try {
      // Set session persistence
      await setPersistence(auth, browserLocalPersistence);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if email is verified
      if (!user.emailVerified) {
        setLoginError({
          general: "Please verify your email address to continue.",
        });
        return;
      }

      // Fetch user profile from Firestore
      const q = query(collection(db, userType + "s"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userProfile = querySnapshot.docs[0].data();
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        toast({ title: "Login Successful", description: "Welcome back!" });
        navigate("/profile");
      } else {
        setLoginError({
          general: "Profile not found. Please complete your registration.",
        });
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.code === "auth/wrong-password") {
        setLoginError({
          password: "Incorrect password. Please try again.",
        });
      } else if (err.code === "auth/user-not-found") {
        setLoginError({
          emailOrUsername: "No account found with this email.",
        });
      } else if (err.code === "auth/invalid-email") {
        setLoginError({
          emailOrUsername: "Invalid email format.",
        });
      } else if (err.code === "auth/too-many-requests") {
        setLoginError({
          general: "Too many failed attempts. Please try again later.",
        });
      } else {
        setLoginError({
          general: "Login failed. Please check your credentials and try again.",
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    if (!agreeToTerms) {
      toast({
        title: "Terms Not Accepted",
        description: "You must agree to the Terms and Conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;

      // Check if user exists in the correct collection based on userType
      const q = query(collection(db, userType + "s"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // User doesn't exist in this role
        toast({ 
          title: "Access Denied", 
          description: `You are not registered as a ${formattedUserType}. Please sign up first.`,
          variant: "destructive" 
        });
        await auth.signOut(); // Sign out the user
        return;
      }

      // User exists in correct role
      const userProfile = querySnapshot.docs[0].data();
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      
      toast({ 
        title: "Login Successful", 
        description: "You are now signed in with Google." 
      });
      navigate("/profile");
    } catch (err: any) {
      console.error("Google login error:", err);
      let errorMessage = "Failed to sign in with Google.";
      
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = "Login cancelled. Please try again.";
      } else if (err.code === 'auth/popup-blocked') {
        errorMessage = "Login popup was blocked. Please allow popups and try again.";
      }
      
      toast({ 
        title: "Login Failed", 
        description: errorMessage, 
        variant: "destructive" 
      });
    }
  };

  const formattedUserType = userType
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome back, {formattedUserType}!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Email or Username"
                  value={emailOrUsername}
                  onChange={(e) => {
                    setEmailOrUsername(e.target.value);
                    setLoginError({});
                  }}
                  className={`pl-10 ${loginError.emailOrUsername ? 'border-red-500' : ''}`}
                  required
                />
                {loginError.emailOrUsername && (
                  <p className="mt-1 text-sm text-red-500">{loginError.emailOrUsername}</p>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError({});
                  }}
                  className={`pl-10 ${loginError.password ? 'border-red-500' : ''}`}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </button>
                {loginError.password && (
                  <p className="mt-1 text-sm text-red-500">{loginError.password}</p>
                )}
              </div>
            </div>

            {loginError.general && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{loginError.general}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto font-normal"
                    onClick={() => setShowTerms(true)}
                  >
                    Terms and Conditions
                  </Button>
                </Label>
              </div>
              <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm">
                    Forgot password?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogDescription>
                      Enter your email address and we'll send you a link to reset your password.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <Label htmlFor="reset-email">Email</Label>
                      <Input
                        id="reset-email"
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Reset Link
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Button type="submit" className="w-full" disabled={!agreeToTerms}>
              Sign in
            </Button>
          </form>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <a href={`/signup/${userType}`} className="text-primary hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Dialog */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Terms and Conditions</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="space-y-4 text-sm">
              <h3 className="font-semibold">1. Acceptance of Terms</h3>
              <p>
                By accessing and using CheapChaser, you agree to be bound by these Terms and Conditions
                and our Privacy Policy. If you do not agree to these terms, please do not use our services.
              </p>

              <h3 className="font-semibold">2. User Accounts</h3>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials
                and for all activities that occur under your account. You must immediately notify us
                of any unauthorized use of your account.
              </p>

              <h3 className="font-semibold">3. User Conduct</h3>
              <p>
                You agree to use our services only for lawful purposes and in accordance with these
                Terms. You agree not to:
              </p>
              <ul className="list-disc pl-6">
                <li>Post or transmit any unlawful, threatening, or harmful content</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with or disrupt our services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>

              <h3 className="font-semibold">4. Privacy</h3>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how
                we collect, use, and protect your personal information.
              </p>

              <h3 className="font-semibold">5. Service Modifications</h3>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of our services
                at any time without notice.
              </p>

              <h3 className="font-semibold">6. Limitation of Liability</h3>
              <p>
                CheapChaser shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages arising out of your use of our services.
              </p>

              <h3 className="font-semibold">7. Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of
                Sri Lanka, without regard to its conflict of law provisions.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowTerms(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Login;