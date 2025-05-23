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
import { Textarea } from "@/components/ui/textarea";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const HotelSignUp = () => {
  const { toast } = useToast();
  const [hotelAmenities, setHotelAmenities] = useState<string[]>([]);
  const [roomFacilities, setRoomFacilities] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [bankDetails, setBankDetails] = useState("");

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
    const q = query(collection(db, "hotels"), where("username", "==", username));
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
        !hotelName ||
        !hotelAddress ||
        !registrationNumber ||
        !contactNumber ||
        !bankDetails
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
      await addDoc(collection(db, "hotels"), {
        uid: user.uid,
        username,
        email,
        hotelAmenities,
        roomFacilities,
        hotelName,
        hotelAddress,
        registrationNumber,
        contactNumber,
        bankDetails,
        profileImageUrl,
        userType: 'hotel',
        createdAt: new Date().toISOString(),
      });

      // Clear the form
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setHotelName("");
      setHotelAddress("");
      setRegistrationNumber("");
      setContactNumber("");
      setHotelAmenities([]);
      setRoomFacilities([]);
      setBankDetails("");
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
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">Hotel Registration</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Image */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Hotel Profile Image</h2>
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
                  {imagePreview ? "Change Image" : "Upload Hotel Image"}
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

            {/* Hotel Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Hotel Information</h2>
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
                    placeholder="Enter email"
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
                  <Label htmlFor="hotelName">
                    Hotel Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="hotelName"
                    placeholder="Enter your hotel name"
                    required
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="hotelAddress">
                    Hotel Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="hotelAddress"
                    placeholder="Enter your hotel address"
                    required
                    value={hotelAddress}
                    onChange={(e) => setHotelAddress(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="registrationNumber">
                    Registration Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="registrationNumber"
                    placeholder="Enter your registration number"
                    required
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
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

            {/* Accommodation Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Accommodation Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Room Types Available</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {[
                      "Single",
                      "Double",
                      "Twin",
                      "Triple",
                      "Suite",
                      "Family Room",
                      "Dormitory",
                    ].map((roomType) => (
                      <div key={roomType} className="flex items-center space-x-2">
                        <Checkbox
                          id={roomType}
                          checked={roomFacilities.includes(roomType)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setRoomFacilities([...roomFacilities, roomType]);
                            } else {
                              setRoomFacilities(roomFacilities.filter((f) => f !== roomType));
                            }
                          }}
                        />
                        <label
                          htmlFor={roomType}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {roomType}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Amenities & Services */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Hotel Amenities & Services</h2>
              <div className="space-y-4">
                <div>
                  <Label>General Facilities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {[
                      "Restaurant",
                      "Swimming Pool",
                      "Gym",
                      "Spa",
                      "Parking",
                      "Bar",
                      "Business Center",
                      "Laundry Service",
                      "Room Service",
                    ].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={hotelAmenities.includes(amenity)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setHotelAmenities([...hotelAmenities, amenity]);
                            } else {
                              setHotelAmenities(hotelAmenities.filter((a) => a !== amenity));
                            }
                          }}
                        />
                        <label
                          htmlFor={amenity}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="bankDetails">
                    Bank Account Details <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="bankDetails"
                    placeholder="Enter your bank account details (Account Number, Bank Name, Branch, Account Type)"
                    required
                    value={bankDetails}
                    onChange={(e) => setBankDetails(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This information will be used for receiving payments from clients.
                  </p>
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
              Register Hotel
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HotelSignUp;