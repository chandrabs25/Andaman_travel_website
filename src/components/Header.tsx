// Path: ./src/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // <--- Import Image component
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, User, Search, ShoppingCart } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, isLoading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Packages', href: '/packages' },
    { name: 'Activities', href: '/activities' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            {/* --- MODIFIED LINE --- */}
            <Link href="/" className="block"> {/* Removed text styling classes */}
              <Image
                src="/images/logo.png" // Path relative to the public folder
                alt="Reach Andaman Logo"
                width={150} // Set the desired width (adjust as needed)
                height={40} // Set the desired height (adjust as needed)
                priority // Add priority if it's above the fold for LCP
              />
            </Link>
            {/* --- END MODIFICATION --- */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-gray-600 hover:text-blue-600 ${
                  pathname === link.href ? 'font-semibold text-blue-600' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600">
              <Search size={20} />
            </button>

            {isLoading ? (
              <div className="h-5 w-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user?.role === 'vendor' && (
                  <Link href="/vendor/dashboard" className="text-gray-600 hover:text-blue-600">
                    Vendor Dashboard
                  </Link>
                )}
                <Link href="/user/dashboard" className="text-gray-600 hover:text-blue-600"> {/* Added link to user bookings/dashboard */}
                  <ShoppingCart size={20} />
                </Link>
                <Link
                  href="/user/dashboard" // Link to user profile/dashboard
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <User size={20} className="mr-1" />
                  <span>{user?.name || 'Profile'}</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/signup"
                  className="text-blue-600 hover:text-blue-800 px-4 py-2"
                >
                  Sign Up
                </Link>
                <Link
                  href="/auth/signin"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block py-2 text-gray-600 hover:text-blue-600 ${ // Added block and py-2 for better spacing/click area
                    pathname === link.href ? 'font-semibold text-blue-600' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200 space-y-2"> {/* Added space-y-2 */}
                 {/* Search Icon for Mobile */}
                 <button className="w-full text-left py-2 text-gray-600 hover:text-blue-600 flex items-center">
                   <Search size={20} className="mr-2"/> Search
                 </button>

                {isLoading ? (
                   <div className="flex items-center py-2 text-gray-600">
                     <div className="h-5 w-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin mr-2"></div>
                     Loading...
                   </div>
                ) : isAuthenticated ? (
                  <>
                    {user?.role === 'vendor' && (
                      <Link
                        href="/vendor/dashboard"
                        className="block py-2 text-gray-600 hover:text-blue-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Vendor Dashboard
                      </Link>
                    )}
                    <Link
                      href="/user/dashboard" // Link to user dashboard/bookings
                      className="block py-2 text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <Link
                      href="/user/dashboard" // Link to user profile/dashboard
                      className="block py-2 text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    {/* Add Logout Button for mobile */}
                     <button
                       onClick={() => {
                           // Add logout logic here using your useAuth hook's logout function
                           console.log("Logout clicked"); // Replace with actual logout call
                           setIsMenuOpen(false);
                       }}
                       className="block w-full text-left py-2 text-red-600 hover:text-red-800"
                    >
                       Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/signup"
                      className="block py-2 text-blue-600 font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/auth/signin"
                      className="block py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700" // Added styling for Sign In button
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;