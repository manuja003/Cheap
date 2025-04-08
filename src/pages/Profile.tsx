import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from '../components/ui/use-toast';
import { 
  CalendarDays, 
  Heart, 
  LogOut, 
  MapPin, 
  Wallet, 
  Mail, 
  Phone, 
  Globe,
  Award,
  Building,
  Calendar,
  User,
  Briefcase,
  Tag,
  Languages,
  Star,
  Hotel,
  Activity
} from "lucide-react";
import { auth, db } from '../firebase';
import { signOut, sendEmailVerification } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface UserProfile {
  id?: string;
  username?: string;
  email: string;
  fullName: string;
  profileImageUrl?: string;
  address?: string;
  contactNumber?: string;
  country?: string;
  createdAt?: string;
  userType?: 'traveler' | 'guide' | 'hotel' | 'activity-provider';
  emailVerified?: boolean;
  
  // Traveler specific fields
  preferences?: string[];
  
  // Guide specific fields
  experience?: string;
  languages?: string[];
  bankDetails?: string;
  
  // Hotel specific fields
  businessInfo?: {
    businessName: string;
    type: string;
    location: string;
    description: string;
  };
  
  // Activity Provider specific fields
  activityName?: string;
  location?: string;
  description?: string;
  activityTypes?: string[];
}

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const checkAuthAndFetchProfile = async () => {
      try {
        const user = auth.currentUser;
        
        if (!user) {
          toast({
            title: "Authentication Required",
            description: "Please sign up or log in to view your profile",
            variant: "destructive",
          });
          navigate('/signup/traveler');
          return;
        }

        // Check email verification status
        setEmailVerified(user.emailVerified);

        // Listen for email verification changes
        const unsubscribeEmailVerification = auth.onAuthStateChanged((user) => {
          if (user) {
            setEmailVerified(user.emailVerified);
          }
        });

        // Try to get profile from localStorage first
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
          const parsedProfile = JSON.parse(storedProfile);
          // Only use stored profile if it matches current user
          if (parsedProfile.email === user.email) {
            setUserProfile(parsedProfile);
            setLoading(false);
            return;
          }
        }

        // If not in localStorage or doesn't match, fetch from Firestore
        const collections = ['travelers', 'guides', 'hotels', 'activityProviders'];
        let userDoc = null;

        for (const collectionName of collections) {
          const q = query(
            collection(db, collectionName),
            where('email', '==', user.email)
          );
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            userDoc = { 
              id: querySnapshot.docs[0].id, 
              ...querySnapshot.docs[0].data(),
              emailVerified: user.emailVerified 
            };
            break;
          }
        }

        if (userDoc) {
          localStorage.setItem('userProfile', JSON.stringify(userDoc));
          setUserProfile(userDoc as UserProfile);
          toast({
            title: "Profile Loaded",
            description: "Welcome back!",
          });
        } else {
          toast({
            title: "Profile Not Found",
            description: "Please complete your registration",
            variant: "destructive",
          });
          navigate('/signup/traveler');
        }

        return () => {
          unsubscribeEmailVerification();
        };
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile. Please try logging in again.",
          variant: "destructive",
        });
        navigate('/login/traveler');
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/signup/traveler');
        return;
      }
      checkAuthAndFetchProfile();
    });

    return () => unsubscribe();
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userProfile');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      navigate('/login/traveler');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await sendEmailVerification(user);
      toast({
        title: "Verification Email Sent",
        description: "Please check your email to verify your account",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification email. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading profile...</h2>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Profile not found</h2>
          <p className="mt-2 text-gray-600">Please sign up or log in to continue</p>
          <div className="mt-4 space-y-2">
            <Button onClick={() => navigate('/signup/traveler')} className="w-full">
              Sign Up
            </Button>
            <Button onClick={() => navigate('/login/traveler')} variant="outline" className="w-full">
              Log In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage 
                        src={userProfile.profileImageUrl} 
                        alt={userProfile.fullName || userProfile.username} 
                      />
                      <AvatarFallback>
                        {userProfile.fullName?.charAt(0) || userProfile.username?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold">{userProfile.fullName}</h2>
                      <p className="text-gray-600">@{userProfile.username}</p>
                      {!emailVerified && (
                        <p className="text-sm text-yellow-600 mt-1">
                          Please verify your email address
                        </p>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Content */}
            <div className="mt-6">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{userProfile.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{userProfile.contactNumber}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium">{userProfile.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Country</p>
                            <p className="font-medium">{userProfile.country}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferences & Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {userProfile.userType === 'traveler' && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Heart className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Travel Preferences</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {userProfile.preferences?.map((pref, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    {pref}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {userProfile.userType === 'guide' && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Award className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Experience</p>
                              <p className="font-medium">{userProfile.experience}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Languages className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Languages</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {userProfile.languages?.map((lang, index) => (
                                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                    {lang}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {userProfile.userType === 'hotel' && userProfile.businessInfo && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Hotel className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Business Name</p>
                              <p className="font-medium">{userProfile.businessInfo.businessName}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Building className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Business Type</p>
                              <p className="font-medium">{userProfile.businessInfo.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium">{userProfile.businessInfo.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Briefcase className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Description</p>
                              <p className="font-medium">{userProfile.businessInfo.description}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {userProfile.userType === 'activity-provider' && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Activity className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Activity Name</p>
                              <p className="font-medium">{userProfile.activityName}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium">{userProfile.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Briefcase className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Description</p>
                              <p className="font-medium">{userProfile.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Tag className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Activity Types</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {userProfile.activityTypes?.map((type, index) => (
                                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                    {type}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Email Verification</h3>
                            <p className="text-sm text-gray-500">
                              {emailVerified 
                                ? "Your email is verified" 
                                : "Please verify your email address"}
                            </p>
                          </div>
                          {!emailVerified && (
                            <Button variant="outline" onClick={handleVerifyEmail}>
                              Verify Email
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Change Password</h3>
                            <p className="text-sm text-gray-500">Update your password</p>
                          </div>
                          <Button variant="outline">Change Password</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Account Created</p>
                            <p className="font-medium">
                              {new Date(userProfile.createdAt || '').toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Account Type</p>
                            <p className="font-medium capitalize">
                              {userProfile.userType?.replace('-', ' ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;