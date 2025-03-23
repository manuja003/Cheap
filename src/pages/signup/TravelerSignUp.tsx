import { useState, useEffect, useRef } from "react";
import { useToast } from "../../components/ui/use-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Eye, EyeOff, User } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { db, auth, storage } from "../../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const TravelerSignUp = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validate password format
  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
    return regex.test(password);
  };

  // Check if username already exists in Firestore
  const checkUsernameExists = async (username: string) => {
    const q = query(collection(db, "travelers"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  // Check if email already exists in Firestore
  const checkEmailExists = async (email: string) => {
    const collections = ["travelers", "hotels", "guides", "activityProviders"];
    for (const collectionName of collections) {
      const q = query(collection(db, collectionName), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return true;
      }
    }
    return false;
  };

  // Check if phone number already exists in Firestore
  const checkPhoneExists = async (phone: string) => {
    const collections = ["travelers", "hotels", "guides", "activityProviders"];
    for (const collectionName of collections) {
      const q = query(collection(db, collectionName), where("contactNumber", "==", phone));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return true;
      }
    }
    return false;
  };

  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File Too Large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload
  const uploadImage = async (uid: string): Promise<string> => {
    if (!profileImage) return "";
    
    const fileExtension = profileImage.name.split(".").pop();
    const storageRef = ref(storage, `profile_images/${uid}.${fileExtension}`);
    
    try {
      const snapshot = await uploadBytes(storageRef, profileImage);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError("");
    setEmailError("");
    setContactNumberError("");

    try {
      // Check if all required fields are filled
      if (
        !username ||
        !email ||
        !password ||
        !confirmPassword ||
        !fullName ||
        !address ||
        !country ||
        !contactNumber
      ) {
        toast({
          title: "Missing Required Fields",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      // Check if the user agreed to the terms
      if (!agreeToTerms) {
        toast({
          title: "Terms Not Accepted",
          description: "You must agree to the Terms and Conditions to proceed.",
          variant: "destructive",
        });
        return;
      }

      // Validate email format
      if (!validateEmail(email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }

      // Validate password format
      if (!validatePassword(password)) {
        toast({
          title: "Invalid Password",
          description:
            "Password must be 8-14 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
          variant: "destructive",
        });
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match.",
          variant: "destructive",
        });
        return;
      }

      // Check for existing credentials
      const [usernameExists, emailExists, phoneExists] = await Promise.all([
        checkUsernameExists(username),
        checkEmailExists(email),
        checkPhoneExists(contactNumber)
      ]);

      if (usernameExists) {
        setUsernameError("Username already exists. Please choose a different one.");
        return;
      }

      if (emailExists) {
        setEmailError("This email is already registered. Please use a different email.");
        return;
      }

      if (phoneExists) {
        setContactNumberError("This phone number is already registered. Please use a different number.");
        return;
      }

      // Step 1: Register user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Upload profile image if selected
      let profileImageUrl = "";
      if (profileImage) {
        profileImageUrl = await uploadImage(user.uid);
      }

      // Step 2: Send email verification
      await sendEmailVerification(user);
      toast({
        title: "Registration Successful",
        description: "A verification email has been sent. Please verify your email.",
      });

      // Step 3: Save additional user data in Firestore
      await addDoc(collection(db, "travelers"), {
        uid: user.uid,
        username,
        email,
        preferences,
        fullName,
        address,
        country,
        contactNumber,
        profileImageUrl,
        userType: 'traveler',
        createdAt: new Date().toISOString(),
      });

      // Clear the form
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
      setAddress("");
      setCountry("");
      setContactNumber("");
      setPreferences([]);
      setAgreeToTerms(false);
      setProfileImage(null);
      setImagePreview("");

      // Redirect to the "Verification Pending" page
      navigate("/verify-email");
    } catch (error: any) {
      console.error("Error during registration:", error);
      if (error.code === "auth/email-already-in-use") {
        setEmailError("This email is already registered. Please use a different email.");
      } else {
        toast({
          title: "Registration Failed",
          description: error.message || "There was an error during registration.",
          variant: "destructive",
        });
      }
    }
  };

  // Validate password in real-time
  useEffect(() => {
    if (password.length > 0 && !validatePassword(password)) {
      setPasswordError(
        "Password must be 8-14 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }
  }, [password]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm mt-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">Traveler Registration</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Image */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Profile Image</h2>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? "Change Image" : "Upload Image"}
                </Button>
                {imagePreview && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      setProfileImage(null);
                      setImagePreview("");
                    }}
                  >
                    Remove Image
                  </Button>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">
                    Username <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    required
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setUsernameError("");
                    }}
                  />
                  {usernameError && <p className="text-sm text-red-500">{usernameError}</p>}
                </div>
                <div>
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    className={emailError ? "border-red-500" : ""}
                  />
                  {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                </div>
                <div>
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="address">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    placeholder="Enter your address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="country">
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="country"
                    placeholder="Enter your country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contactNumber">
                    Contact Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactNumber"
                    placeholder="Enter your contact number"
                    required
                    value={contactNumber}
                    onChange={(e) => {
                      setContactNumber(e.target.value);
                      setContactNumberError("");
                    }}
                    className={contactNumberError ? "border-red-500" : ""}
                  />
                  {contactNumberError && <p className="text-sm text-red-500">{contactNumberError}</p>}
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Account Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                </div>
                <div>
                  <Label htmlFor="confirmPassword">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Preferences */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Travel Preferences (Optional)</h2>
              <div className="space-y-4">
                <div>
                  <Label>Preferred Activities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {[
                      "Surfing",
                      "Hiking",
                      "Wildlife",
                      "Historical Tours",
                      "Adventure Sports",
                      "Cultural Experiences",
                      "Beach Activities",
                      "Food Tours",
                      "Photography",
                    ].map((preference) => (
                      <div key={preference} className="flex items-center space-x-2">
                        <Checkbox
                          id={preference}
                          checked={preferences.includes(preference)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setPreferences([...preferences, preference]);
                            } else {
                              setPreferences(preferences.filter((p) => p !== preference));
                            }
                          }}
                        />
                        <label htmlFor={preference} className="text-sm">
                          {preference}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Compliance */}
            <div className="space-y-4">
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
            </div>

            <Button type="submit" className="w-full" disabled={!agreeToTerms}>
              Register as Traveler
            </Button>
          </form>
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

export default TravelerSignUp;