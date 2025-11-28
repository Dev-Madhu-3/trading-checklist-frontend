import { useState } from 'react';
import { motion } from 'framer-motion';

const JournalEntry = ({ entry }) => {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(entry.date);
  const formattedDate = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Mock data - in a real app, this would come from the entry
  const tradeData = {
    pair: 'EUR/USD',
    direction: 'LONG',
    entryPrice: '1.0850',
    stopLoss: '1.0800',
    takeProfit: '1.0950',
    result: 'WIN',
    profit: '$200.00',
    notes: 'Good trade setup with strong confluence across multiple timeframes.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a72306a?auto=format&fit=crop&w=500&q=80'
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-white to-slate-50 dark:from-dark-800 dark:to-dark-900 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-dark-700"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Trade Entry</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">{formattedDate}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">Pair:</span>
              <span className="font-medium text-slate-900 dark:text-white">{tradeData.pair}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">Direction:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                tradeData.direction === 'LONG' 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {tradeData.direction}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">Result:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                tradeData.result === 'WIN' 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                  : tradeData.result === 'LOSS'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {tradeData.result}
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-slate-100 dark:bg-dark-700 rounded-lg p-4 text-center">
            <div className="text-sm text-slate-600 dark:text-slate-400">WEEKLY</div>
            <div className="text-xl font-bold text-emerald-600">{entry.scores?.weekly || 0}%</div>
          </div>
          <div className="bg-slate-100 dark:bg-dark-700 rounded-lg p-4 text-center">
            <div className="text-sm text-slate-600 dark:text-slate-400">DAILY</div>
            <div className="text-xl font-bold text-emerald-600">{entry.scores?.daily || 0}%</div>
          </div>
          <div className="bg-slate-100 dark:bg-dark-700 rounded-lg p-4 text-center">
            <div className="text-sm text-slate-600 dark:text-slate-400">4H</div>
            <div className="text-xl font-bold text-emerald-600">{entry.scores?.fourHour || 0}%</div>
          </div>
          <div className="bg-slate-100 dark:bg-dark-700 rounded-lg p-4 text-center">
            <div className="text-sm text-slate-600 dark:text-slate-400">2H, 1H, 30m</div>
            <div className="text-xl font-bold text-emerald-600">{entry.scores?.lowerTimeframes || 0}%</div>
          </div>
          <div className="bg-slate-100 dark:bg-dark-700 rounded-lg p-4 text-center">
            <div className="text-sm text-slate-600 dark:text-slate-400">ENTRY</div>
            <div className="text-xl font-bold text-emerald-600">{entry.scores?.entry || 0}%</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-6">
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Stop Loss</div>
              <div className="font-medium text-slate-900 dark:text-white">{tradeData.stopLoss}</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Take Profit</div>
              <div className="font-medium text-slate-900 dark:text-white">{tradeData.takeProfit}</div>
            </div>
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Profit/Loss</div>
              <div className={`font-medium ${
                tradeData.result === 'WIN' 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : tradeData.result === 'LOSS'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-yellow-600 dark:text-yellow-400'
              }`}>
                {tradeData.profit}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg px-4 py-2 text-white font-bold">
            {entry.scores?.total || 0}%
          </div>
        </div>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
        >
          {expanded ? 'Show Less' : 'Show Details'}
          <svg
            className={`ml-1 h-5 w-5 transform ${expanded ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-slate-200 dark:border-dark-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Trade Notes</h4>
                <p className="text-slate-600 dark:text-slate-400">{tradeData.notes}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Chart Image</h4>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={tradeData.image} 
                    alt="Trade Chart" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default JournalEntry;