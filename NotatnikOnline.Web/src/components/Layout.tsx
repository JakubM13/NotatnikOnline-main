
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold">
            NotatnikOnline
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/public-notes" className="hover:text-gray-600 transition-colors">
              Publiczne Notatki
            </Link>
            {user && (
              <Link to="/" className="hover:text-gray-600 transition-colors">
                Moje Notatki
              </Link>
            )}
            {!loading && (
              user ? (
                <Button onClick={handleLogout} variant="secondary">
                  Wyloguj się
                </Button>
              ) : (
                <>
                  <Button asChild variant="secondary">
                    <Link to="/auth">Zaloguj się</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/auth">Zarejestruj się</Link>
                  </Button>
                </>
              )
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass animate-in">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                to="/public-notes"
                className="hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Publiczne Notatki
              </Link>
              {user && (
                <Link
                  to="/"
                  className="hover:text-gray-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Moje Notatki
                </Link>
              )}
              {!loading && (
                user ? (
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }} 
                    variant="secondary"
                    className="w-full"
                  >
                    Wyloguj się
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="secondary" className="w-full">
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        Zaloguj się
                      </Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        Zarejestruj się
                      </Link>
                    </Button>
                  </>
                )
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-20">{children}</main>

      <footer className="glass mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} NotatnikOnline. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
