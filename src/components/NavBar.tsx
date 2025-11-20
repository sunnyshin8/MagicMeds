'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'About', path: '/' },
    { name: 'Home', path: '/home' },
    { name: 'Services', path: '/services' },
    { name: 'Articles', path: '/articles' },
    { name: 'Telehealth', path: '/telehealth' },
    { name: 'Appointments', path: '/appointments' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Clinician Portal', path: '/clinician-dashboard' },
    { name: 'Support', path: '/support' },
  ];

  const authItems = [
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/signup' },
  ];

  return (
    <nav className="bg-linear-to-r from-emerald-500 to-emerald-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Navigation and Brand on the right */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white mr-8 hover:text-emerald-100 transition-colors duration-200">
              MagicMeds
            </Link>
            <div className="hidden md:flex md:space-x-2 md:items-center">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    pathname === item.path
                      ? 'bg-white text-emerald-700 shadow-lg'
                      : 'text-white hover:bg-emerald-600/30 hover:backdrop-blur-sm hover:rounded-xl'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Auth buttons */}
              <div className="flex items-center space-x-2 ml-6 pl-6 border-l border-emerald-400/30">
                {authItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      pathname === item.path
                        ? 'bg-white text-emerald-700 shadow-lg'
                        : item.name === 'Sign Up'
                        ? 'bg-emerald-800 text-white hover:bg-white hover:text-emerald-700 border border-white hover:border-emerald-700 hover:shadow-lg'
                        : 'text-white hover:bg-white/20 border border-white/30 hover:border-white hover:rounded-xl'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;