import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'teas' | 'tinctures' | 'supplements' | 'topicals';
  tags: string[];
  stock: number;
  rating: number;
  vendorId?: string;
  createdAt?: string; // Add createdAt to Product interface if not already present
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
}

interface Subscription {
  id: string;
  planId: string;
  status: string;
  startDate: Date;
  endDate: Date | any; // Use Date | any to accommodate potential Firestore Timestamp or Date objects
  autoRenew: boolean;
}

// User Profile
export const createUserProfile = async (userId: string, data: DocumentData) => {
  await setDoc(doc(db, 'users', userId), {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
};

export const getUserProfile = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

// Products
export const addProduct = async (data: DocumentData) => {
  const docRef = doc(collection(db, 'products'));
  await setDoc(docRef, {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  return docRef.id;
};

export const getProducts = async (limitCount: number = 10): Promise<Product[]> => {
  try {
    const productsRef = collection(db, "products");
    const q = query(
      productsRef,
      orderBy("createdAt", "desc"),
      firestoreLimit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((docSnap: QueryDocumentSnapshot) => ({
      id: docSnap.id,
      ...docSnap.data()
    })) as Product[]; // Explicitly cast to Product[]

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getUserProducts = async (userId: string): Promise<Product[]> => {
  try {
    const productsRef = collection(db, "products");
    const q = query(
      productsRef,
      where("vendorId", "==", userId)
    );
    
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((docSnap: QueryDocumentSnapshot) => ({
      id: docSnap.id,
      ...docSnap.data()
    })) as Product[]; // Explicitly cast to Product[]

    // Sort products in memory instead of using orderBy
    return products.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0); // Handle potentially undefined createdAt
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error("Error fetching user products:", error);
    throw error;
  }
};

// Appointments
export const createAppointment = async (data: DocumentData) => {
  const docRef = doc(collection(db, 'appointments'));
  await setDoc(docRef, {
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  return docRef.id;
};

export const getDoctorAppointments = async (doctorId: string) => {
  const q = query(
    collection(db, 'appointments'),
    where('doctorId', '==', doctorId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Community Posts
export const createPost = async (data: DocumentData) => {
  const docRef = doc(collection(db, 'posts'));
  await setDoc(docRef, {
    ...data,
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  return docRef.id;
};

export const getPosts = async (limit: number = 10) => {
  const q = query(
    collection(db, 'posts'),
    orderBy('createdAt', 'desc'),
    firestoreLimit(limit)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Subscriptions
export const createSubscriptionWithData = async (userId: string, data: DocumentData) => {
  const docRef = doc(db, 'subscriptions', userId);
  await setDoc(docRef, {
    ...data,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
};

export const getSubscription = async (userId: string) => {
  const docRef = doc(db, 'subscriptions', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

// Subscription Plans
export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  try {
    const plansRef = collection(db, "subscriptionPlans");
    const q = query(plansRef, orderBy("price", "asc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        price: data.price,
        duration: data.duration,
        features: data.features || [] // Ensure features is an array, default to empty array
      } as SubscriptionPlan; // Explicitly cast to SubscriptionPlan
    });
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    throw error;
  }
};

export const getUserSubscription = async (userId: string): Promise<Subscription | null> => {
  try {
    const subscriptionRef = doc(db, "subscriptions", userId);
    const subscriptionSnap = await getDoc(subscriptionRef);
    
    if (!subscriptionSnap.exists()) {
      return null;
    }

    const data = subscriptionSnap.data();
    return {
      id: subscriptionSnap.id,
      planId: data.planId,
      status: data.status,
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
      autoRenew: data.autoRenew
    } as Subscription; // Explicitly cast to Subscription
  } catch (error) {
    console.error("Error fetching user subscription:", error);
    throw error;
  }
};

export const createSubscription = async (userId: string, planId: string, paymentId: string) => {
  await setDoc(doc(db, 'subscriptions', userId), {
    planId,
    paymentId,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
};

export const updateSubscriptionStatus = async (userId: string, status: string) => {
  const docRef = doc(db, 'subscriptions', userId);
  await updateDoc(docRef, {
    status,
    updatedAt: new Date().toISOString(),
  });
};

// Utility for testing Firestore connection (can be removed in production)
export const testFirestoreConnection = async () => {
  try {
    // Try to get a non-existent document to test connection without affecting data
    await getDoc(doc(db, '__test_collection__', '__test_doc__'));
    return true;
  } catch (error) {
    console.error("Firestore connection test failed:", error);
    return false;
  }
};

export const deleteProduct = async (productId: string) => {
  await deleteDoc(doc(db, 'products', productId));
};