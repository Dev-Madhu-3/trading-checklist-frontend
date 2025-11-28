import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ChecklistContext } from '../context/ChecklistContext';
import JournalEntry from '../components/Journal/JournalEntry';

const JournalPage = () => {
  const { journalEntries } = useContext(ChecklistContext);
  const [filter, setFilter] = useState('all');
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredEntries(journalEntries);
    } else {
      // In a real app, you would filter based on actual trade results
      setFilteredEntries(journalEntries);
    }
  }, [filter, journalEntries]);

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'win', name: 'Wins' },
    { id: 'loss', name: 'Losses' },
    { id: 'breakeven', name: 'Breakeven' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Trading Journal</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">History of your saved trades</p>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                filter === f.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-700'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>
      
      {filteredEntries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-slate-50 dark:from-dark-800 dark:to-dark-900 rounded-2xl shadow-lg p-12 text-center border border-slate-200 dark:border-dark-700"
        >
          <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 dark:bg-dark-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">No journal entries yet</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Save your first trade from the checklist to see it here</p>
          <div className="mt-6">
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
            >
              Go to Checklist
            </a>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <JournalEntry entry={entry} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalPage;