import { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const UserProfile = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [userData, setUserData] = useState({
    name: 'MADHU UPPALA',
    email: 'madhu@example.com',
    tradingExperience: 'Intermediate',
    riskTolerance: 'Medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6 max-w-3xl mx-auto">
      <div className="flex items-center mb-8">
        <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-2xl font-bold mr-4">
          {userData.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Profile</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your account settings</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Trading Experience</label>
          <select
            name="tradingExperience"
            value={userData.tradingExperience}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Risk Tolerance</label>
          <select
            name="riskTolerance"
            value={userData.riskTolerance}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-dark-700">
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white">Dark Mode</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Switch between light and dark themes</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              darkMode ? 'bg-primary-600' : 'bg-slate-300 dark:bg-dark-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <div className="flex justify-end pt-4">
          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition duration-300">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;