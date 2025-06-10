import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAuth, signOut, User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "@/lib/firebase"; // Corrected import for `app`

interface UserData {
  role: 'user' | 'vendor';
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const [userRole, setUserRole] = useState<UserData['role'] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async (currentUser: User) => {
      try {
        const db = getFirestore(app);
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as UserData;
          setUserRole(userData.role);
        } else {
          console.warn("User document not found in Firestore.");
          setUserRole('user'); // Default to user if document not found
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
        setUserRole('user'); // Default to user on error
      }
    };

    if (user && !loading) {
      fetchUserRole(user);
    } else if (!user && !loading) {
      setUserRole(null); // Reset role if user logs out
    }
  }, [user, loading]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to home page after logout
      setIsMenuOpen(false); // Close mobile menu after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const renderAuthButtons = () => {
    if (loading) {
      return null; // Or a loading spinner
    } else if (user) {
      const dashboardPath = userRole === 'vendor' ? '/vendor' : '/dashboard';
      return (
        <div className="flex items-center gap-2">
          <Button size="sm" asChild>
            <Link to={dashboardPath}>Dashboard</Link>
          </Button>
          <Button size="sm" variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button size="sm" className="bg-herbal-primary hover:bg-herbal-primary/90" asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      );
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <img 
              src="/lovable-uploads/cab56773-7d06-44ec-9010-f4806f6577cd.png" 
              alt="Herbal Intelligence Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-montserrat text-xl font-semibold">
            Herbal<span className="text-herbal-primary">Intelligence</span>
          </span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-herbal-text-primary hover:text-herbal-primary transition-colors">
            Home
          </Link>
          <Link to="/consult" className="text-herbal-text-primary hover:text-herbal-primary transition-colors">
            AI Consultation
          </Link>
          <Link to="/identify" className="text-herbal-text-primary hover:text-herbal-primary transition-colors">
            Plant ID
          </Link>
          <Link to="/practitioners" className="text-herbal-text-primary hover:text-herbal-primary transition-colors">
            Practitioners
          </Link>
          <Link to="/store" className="text-herbal-text-primary hover:text-herbal-primary transition-colors">
            Store
          </Link>
          <Link to="/learn" className="text-herbal-text-primary hover:text-herbal-primary transition-colors">
            Learn
          </Link>
          {renderAuthButtons()}
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden absolute top-16 left-0 right-0 bg-white shadow-md p-4 transition-all duration-200 ease-in-out",
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-4">
          <Link 
            to="/" 
            className="px-4 py-2 rounded-md hover:bg-herbal-muted"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/consult" 
            className="px-4 py-2 rounded-md hover:bg-herbal-muted"
            onClick={() => setIsMenuOpen(false)}
          >
            AI Consultation
          </Link>
          <Link 
            to="/identify" 
            className="px-4 py-2 rounded-md hover:bg-herbal-muted"
            onClick={() => setIsMenuOpen(false)}
          >
            Plant ID
          </Link>
          <Link 
            to="/practitioners" 
            className="px-4 py-2 rounded-md hover:bg-herbal-muted"
            onClick={() => setIsMenuOpen(false)}
          >
            Practitioners
          </Link>
          <Link 
            to="/store" 
            className="px-4 py-2 rounded-md hover:bg-herbal-muted"
            onClick={() => setIsMenuOpen(false)}
          >
            Store
          </Link>
          <Link 
            to="/learn" 
            className="px-4 py-2 rounded-md hover:bg-herbal-muted"
            onClick={() => setIsMenuOpen(false)}
          >
            Learn
          </Link>
          <div className="flex flex-col gap-2 mt-2">
            {renderAuthButtons()}
          </div>
        </nav>
      </div>
    </header>
  );
}
