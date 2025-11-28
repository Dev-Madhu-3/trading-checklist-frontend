import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const UserDropdown = ({ mobile = false }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative ml-3">
      <div>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center text-sm rounded-full focus:outline-none"
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg">
            <span className="text-sm">MU</span>
          </div>
          {!mobile && (
            <span className="ml-2 text-slate-700 dark:text-slate-300 font-medium hidden lg:block">MADHU UPPALA</span>
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-1 bg-white/90 dark:bg-dark-800/90 backdrop-blur-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 ${
              mobile ? 'left-0 right-auto' : ''
            }`}
          >
            <div className="px-4 py-3 border-b border-slate-200 dark:border-dark-700">
              <p className="text-sm font-medium text-slate-900 dark:text-white">MADHU UPPALA</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">madhu@example.com</p>
            </div>
            <div className="py-1">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-700"
                onClick={() => setDropdownOpen(false)}
              >
                Your Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-700"
                onClick={() => setDropdownOpen(false)}
              >
                Settings
              </Link>
            </div>
            <div className="py-1 border-t border-slate-200 dark:border-dark-700">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-dark-700"
                onClick={() => {
                  setDropdownOpen(false);
                  // Handle logout
                }}
              >
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;