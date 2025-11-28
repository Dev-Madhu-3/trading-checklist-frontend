import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from '../ThemeToggle';
import UserDropdown from './UserDropdown';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

// Update the navItems array in Navbar.js
const navItems = [
  { 
    name: 'Pairs', 
    path: '/',  // This is now the home page
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
      </svg>
    ) 
  },
  { name: 'Journal', path: '/journal', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
      </svg>
    ) 
  },
  { name: 'Dashboard', path: '/dashboard', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>
    ) 
  },
];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 dark:bg-dark-900/80 border-b border-white/20 dark:border-dark-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold mr-3 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent hidden sm:block">Trading Checklist</span>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg flex items-center text-sm font-medium transition-all duration-300 ${location.pathname === item.path
                      ? 'bg-emerald-500/20 text-emerald-400 dark:text-emerald-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-dark-700/50'
                    }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <ThemeToggle />
                <UserDropdown />
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="ml-2 p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-dark-700/50 focus:outline-none"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/10 dark:bg-dark-900/80 backdrop-blur-xl border-t border-white/20 dark:border-dark-700/50"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${location.pathname === item.path
                    ? 'bg-emerald-500/20 text-emerald-400 dark:text-emerald-300'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-dark-700/50'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
              </Link>
            ))}
            <div className="border-t border-white/20 dark:border-dark-700/50 my-2 pt-2">
              <UserDropdown mobile={true} />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;