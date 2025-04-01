
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Objectives', path: '/objectives' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold text-primary md:text-2xl">
              <span className="text-secondary">Digital</span> Boda
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="px-3 py-2 text-dark hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Authentication Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link to="/login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary-light hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary text-white hover:bg-primary-dark">
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-dark" />
              ) : (
                <Menu className="h-6 w-6 text-dark" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 transform transition-transform duration-300 lg:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-16 px-4">
          <div className="flex flex-col space-y-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="py-3 text-lg font-medium text-dark border-b border-gray-100 hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
            
            <div className="flex flex-col space-y-3 pt-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-primary text-primary">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-primary text-white">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
