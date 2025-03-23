import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase"; // Ensure this path is correct

export interface Feedback {
  id: number | string;
  rating: number;
  country: string;
  age: string;
  comment: string;
  date: string;
}

// Collection reference
const feedbacksRef = collection(db, "feedbacks");

// Save feedback to Firestore
export const saveFeedback = async (feedback: Omit<Feedback, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(feedbacksRef, feedback);
    return docRef.id;
  } catch (error) {
    console.error("Error adding feedback: ", error);
    throw error;
  }
};

// Get all feedbacks from Firestore
export const getFeedbacks = async (): Promise<Feedback[]> => {
  try {
    const q = query(feedbacksRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Feedback));
  } catch (error) {
    console.error("Error getting feedbacks: ", error);
    throw error;
  }
};