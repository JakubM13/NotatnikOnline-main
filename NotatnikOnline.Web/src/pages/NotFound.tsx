
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-4 animate-fade-down">404</h1>
        <p className="text-xl text-gray-600 mb-8 animate-fade-down" style={{ animationDelay: "150ms" }}>
          Ups! Strona, której szukasz nie istnieje.
        </p>
        <Button asChild className="animate-fade-up" style={{ animationDelay: "300ms" }}>
          <Link to="/">Wróć do strony głównej</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
