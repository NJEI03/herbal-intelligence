
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PageBackground } from "@/components/layout/page-background";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageBackground>
      <div className="container flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-herbal-primary">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a href="/" className="btn-primary inline-block">
            Return to Home
          </a>
        </div>
      </div>
    </PageBackground>
  );
};

export default NotFound;
