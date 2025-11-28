import { useContext } from 'react';
import { ChecklistContext } from '../../context/ChecklistContext';

const ConfluenceSummary = ({ scores }) => {
  if (!scores) {
    // Fallback to calculating scores if not provided
    const { calculateScores } = useContext(ChecklistContext);
    scores = calculateScores();
  }

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 dark:from-dark-800 dark:to-dark-900 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-dark-700">
      <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">Confluence Summary</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
        <div className="bg-slate-100 dark:bg-dark-700 rounded-xl p-6 text-center">
          <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">WEEKLY</div>
          <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{scores.weekly}%</div>
        </div>
        <div className="bg-slate-100 dark:bg-dark-700 rounded-xl p-6 text-center">
          <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">DAILY</div>
          <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{scores.daily}%</div>
        </div>
        <div className="bg-slate-100 dark:bg-dark-700 rounded-xl p-6 text-center">
          <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">4H</div>
          <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{scores.fourHour}%</div>
        </div>
        <div className="bg-slate-100 dark:bg-dark-700 rounded-xl p-6 text-center">
          <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">2H, 1H, 30m</div>
          <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{scores.lowerTimeframes}%</div>
        </div>
        <div className="bg-slate-100 dark:bg-dark-700 rounded-xl p-6 text-center">
          <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">ENTRY SIGNAL</div>
          <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{scores.entry}%</div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-400/50 rounded-2xl p-10 text-center">
        <div className="text-slate-900 dark:text-white text-xl font-bold mb-4">Total Overall Score</div>
        <div className={`text-8xl font-bold ${
          scores.total < 50 ? 'text-red-500' : 
          scores.total < 75 ? 'text-yellow-500' : 'text-emerald-500'
        }`}>
          {scores.total}%
        </div>
        <div className="mt-4 text-slate-900 dark:text-white font-bold">
          {scores.total < 50 ? 'Weak Setup' : 
           scores.total < 75 ? 'Moderate Setup' : 'Strong Setup'}
        </div>
      </div>
    </div>
  );
};

export default ConfluenceSummary;