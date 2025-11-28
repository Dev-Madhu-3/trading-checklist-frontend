import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ChecklistContext } from '../../context/ChecklistContext';

// Currency pairs grouped by category
const currencyPairs = {
  major: [
  { value: 'EUR/USD', label: 'EUR/USD' },
  { value: 'GBP/USD', label: 'GBP/USD' },
  { value: 'USD/JPY', label: 'USD/JPY' },
  { value: 'USD/CHF', label: 'USD/CHF' },
  { value: 'AUD/USD', label: 'AUD/USD' },
  { value: 'USD/CAD', label: 'USD/CAD' },
  { value: 'NZD/USD', label: 'NZD/USD' }
],
  minor: [
  { value: 'EUR/GBP', label: 'EUR/GBP' },
  { value: 'EUR/JPY', label: 'EUR/JPY' },
  { value: 'EUR/CHF', label: 'EUR/CHF' },
  { value: 'EUR/AUD', label: 'EUR/AUD' },
  { value: 'EUR/CAD', label: 'EUR/CAD' },
  { value: 'EUR/NZD', label: 'EUR/NZD' },
  { value: 'GBP/JPY', label: 'GBP/JPY' },
  { value: 'GBP/CHF', label: 'GBP/CHF' },
  { value: 'GBP/AUD', label: 'GBP/AUD' },
  { value: 'GBP/CAD', label: 'GBP/CAD' },
  { value: 'GBP/NZD', label: 'GBP/NZD' },
  { value: 'AUD/JPY', label: 'AUD/JPY' },
  { value: 'AUD/CHF', label: 'AUD/CHF' },
  { value: 'AUD/CAD', label: 'AUD/CAD' },
  { value: 'AUD/NZD', label: 'AUD/NZD' },
  { value: 'NZD/JPY', label: 'NZD/JPY' },
  { value: 'NZD/CHF', label: 'NZD/CHF' },
  { value: 'NZD/CAD', label: 'NZD/CAD' },
  { value: 'CHF/JPY', label: 'CHF/JPY' },
  { value: 'CAD/JPY', label: 'CAD/JPY' },
  { value: 'CAD/CHF', label: 'CAD/CHF' }
]
,
  exotic: [
  { value: 'AUD/SGD', label: 'AUD/SGD' },
  { value: 'CHF/SGD', label: 'CHF/SGD' },
  { value: 'EUR/CZK', label: 'EUR/CZK' },
  { value: 'EUR/HUF', label: 'EUR/HUF' },
  { value: 'EUR/MXN', label: 'EUR/MXN' },
  { value: 'EUR/NOK', label: 'EUR/NOK' },
  { value: 'EUR/PLN', label: 'EUR/PLN' },
  { value: 'EUR/SEK', label: 'EUR/SEK' },
  { value: 'EUR/SGD', label: 'EUR/SGD' },
  { value: 'EUR/TRY', label: 'EUR/TRY' },
  { value: 'EUR/ZAR', label: 'EUR/ZAR' },
  { value: 'GBP/MXN', label: 'GBP/MXN' },
  { value: 'GBP/NOK', label: 'GBP/NOK' },
  { value: 'GBP/SEK', label: 'GBP/SEK' },
  { value: 'GBP/SGD', label: 'GBP/SGD' },
  { value: 'GBP/TRY', label: 'GBP/TRY' },
  { value: 'NOK/JPY', label: 'NOK/JPY' },
  { value: 'NOK/SEK', label: 'NOK/SEK' },
  { value: 'SEK/JPY', label: 'SEK/JPY' },
  { value: 'SGD/JPY', label: 'SGD/JPY' },
  { value: 'USD/CNH', label: 'USD/CNH' },
  { value: 'USD/CZK', label: 'USD/CZK' },
  { value: 'USD/HUF', label: 'USD/HUF' },
  { value: 'USD/MXN', label: 'USD/MXN' },
  { value: 'USD/NOK', label: 'USD/NOK' },
  { value: 'USD/PLN', label: 'USD/PLN' },
  { value: 'USD/RUB', label: 'USD/RUB' },
  { value: 'USD/SEK', label: 'USD/SEK' },
  { value: 'USD/SGD', label: 'USD/SGD' },
  { value: 'USD/THB', label: 'USD/THB' },
  { value: 'USD/TRY', label: 'USD/TRY' },
  { value: 'USD/ZAR', label: 'USD/ZAR' },
  { value: 'ZAR/JPY', label: 'ZAR/JPY' }
  ],
  metals: [
  { value: 'XAU/USD', label: 'XAU/USD' },
  { value: 'XAG/USD', label: 'XAG/USD' },
  { value: 'XAU/AUD', label: 'XAU/AUD' },
  { value: 'XAU/EUR', label: 'XAU/EUR' },
  { value: 'XAU/GBP', label: 'XAU/GBP' },
  { value: 'XAU/JPY', label: 'XAU/JPY' },
  { value: 'XAU/CHF', label: 'XAU/CHF' },
  { value: 'XAG/AUD', label: 'XAG/AUD' },
  { value: 'XAG/EUR', label: 'XAG/EUR' },
  { value: 'XPT/USD', label: 'XPT/USD' },
  { value: 'XPD/USD', label: 'XPD/USD' }
]


};

const SaveTradeModal = ({ isOpen, onClose }) => {
  const { saveToJournal, calculateScores } = useContext(ChecklistContext);
  const [formData, setFormData] = useState({
    pair: 'EUR/USD',
    direction: 'LONG',
    accountBalance: '10000',
    stopLoss: '',
    takeProfit: '',
    entryPrice: '',
    riskPercentage: '2',
    notes: '',
    chartImage: null
  });

  const scores = calculateScores();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDirectionChange = (direction) => {
    setFormData(prev => ({
      ...prev,
      direction
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          chartImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save the form data along with the checklist data
    saveToJournal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 opacity-75 dark:bg-black dark:opacity-80"></div>
        </div>

        <div className="inline-block align-bottom bg-white dark:bg-dark-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-white">Save Trade</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-lg p-4">
              <p className="text-emerald-800 dark:text-emerald-300 font-semibold">Confluence Score: {scores.total}%</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Currency Pair *
                </label>
                <div className="relative">
                  <select
                    name="pair"
                    value={formData.pair}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <optgroup label="Major Pairs" className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {currencyPairs.major.map(pair => (
                        <option key={pair.value} value={pair.value}>{pair.label}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Minor Pairs" className="font-semibold text-blue-600 dark:text-blue-400">
                      {currencyPairs.minor.map(pair => (
                        <option key={pair.value} value={pair.value}>{pair.label}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Exotic Pairs" className="font-semibold text-purple-600 dark:text-purple-400">
                      {currencyPairs.exotic.map(pair => (
                        <option key={pair.value} value={pair.value}>{pair.label}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Metals" className="font-semibold text-pink-600 dark:text-pink-400">
                      {currencyPairs.metals.map(pair => (
                        <option key={pair.value} value={pair.value}>{pair.label}</option>
                      ))}
                    </optgroup>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Direction *
                </label>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => handleDirectionChange('LONG')}
                    className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                      formData.direction === 'LONG'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-dark-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-600'
                    }`}
                  >
                    LONG
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDirectionChange('SHORT')}
                    className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                      formData.direction === 'SHORT'
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-100 dark:bg-dark-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-600'
                    }`}
                  >
                    SHORT
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Account Balance (USD) *
              </label>
              <input
                type="text"
                name="accountBalance"
                value={formData.accountBalance}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                  Stop Loss Price *
                </label>
                <input
                  type="text"
                  name="stopLoss"
                  value={formData.stopLoss}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-red-300 dark:border-red-600/50 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">
                  Take Profit Price *
                </label>
                <input
                  type="text"
                  name="takeProfit"
                  value={formData.takeProfit}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-emerald-300 dark:border-emerald-600/50 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Entry Price *
                </label>
                <input
                  type="text"
                  name="entryPrice"
                  value={formData.entryPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Risk Percentage (%) *
                </label>
                <input
                  type="text"
                  name="riskPercentage"
                  value={formData.riskPercentage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4">
              <h4 className="text-emerald-800 dark:text-emerald-300 font-bold mb-3">Calculated Lot Size</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Stop Loss Distance:</span>
                  <span className="text-slate-900 dark:text-white font-medium">50.0 pips</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Risk Amount:</span>
                  <span className="text-slate-900 dark:text-white font-medium">$200.00</span>
                </div>
                <div className="border-t border-emerald-200 dark:border-emerald-800/30 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-emerald-800 dark:text-emerald-300 font-bold">Lot Size:</span>
                    <span className="text-emerald-800 dark:text-emerald-300 font-bold text-xl">0.40 lots</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Add your trade notes here..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Chart Image (Before Trade) *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-slate-300 dark:border-dark-600 rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-slate-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-slate-600 dark:text-slate-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white dark:bg-dark-800 rounded-md font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-dark-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 dark:border-dark-600 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-dark-700 hover:bg-slate-50 dark:hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Save Trade
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SaveTradeModal;