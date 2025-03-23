import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

// Types for our booking data
export interface ActivityBooking {
  id?: string;
  activityName: string;
  date: Date;
  participants: number;
  provider?: string;
  specialRequirements?: string;
  status: string;
  timestamp: Date;
}

export interface HotelBooking {
  id?: string;
  hotelName: string;
  checkIn: Date;
  checkOut: Date;
  rooms: number;
  guests: number;
  specialRequests?: string;
  status: string;
  timestamp: Date;
}

// Save activity booking to Firestore
export const saveActivityBooking = async (booking: Omit<ActivityBooking, "id" | "timestamp" | "status">) => {
  try {
    const docRef = await addDoc(collection(db, "activityBookings"), {
      ...booking,
      status: "confirmed",
      timestamp: new Date(),
    });
    console.log("Activity booking document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding activity booking document: ", error);
    throw error;
  }
};

// Save hotel booking to Firestore
export const saveHotelBooking = async (booking: Omit<HotelBooking, "id" | "timestamp" | "status">) => {
  try {
    const docRef = await addDoc(collection(db, "hotelBookings"), {
      ...booking,
      status: "confirmed",
      timestamp: new Date(),
    });
    console.log("Hotel booking document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding hotel booking document: ", error);
    throw error;
  }
};

// Get all activity bookings
export const getActivityBookings = async (): Promise<ActivityBooking[]> => {
  try {
    const q = query(collection(db, "activityBookings"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        activityName: data.activityName,
        date: data.date.toDate(),
        participants: data.participants,
        provider: data.provider,
        specialRequirements: data.specialRequirements,
        status: data.status,
        timestamp: data.timestamp.toDate(),
      } as ActivityBooking;
    });
  } catch (error) {
    console.error("Error getting activity bookings: ", error);
    return [];
  }
};

// Get all hotel bookings
export const getHotelBookings = async (): Promise<HotelBooking[]> => {
  try {
    const q = query(collection(db, "hotelBookings"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        hotelName: data.hotelName,
        checkIn: data.checkIn.toDate(),
        checkOut: data.checkOut.toDate(),
        rooms: data.rooms,
        guests: data.guests,
        specialRequests: data.specialRequests,
        status: data.status,
        timestamp: data.timestamp.toDate(),
      } as HotelBooking;
    });
  } catch (error) {
    console.error("Error getting hotel bookings: ", error);
    return [];
  }
};