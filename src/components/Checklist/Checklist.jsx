import { useContext, useState } from 'react';
import { ChecklistContext } from '../../context/ChecklistContext';
import TimeframeCard from './TimeframeCard';
import ConfluenceSummary from './ConfluenceSummary';
import SaveTradeModal from './SaveTradeModal';

const Checklist = () => {
  const { checklistData, updateChecklist, saveToJournal } = useContext(ChecklistContext);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">The Perfect Trade</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Select the conditions that are present in each timeframe</p>
      </div> */}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeframeCard 
          title="WEEKLY" 
          timeframe="weekly"
          data={checklistData.weekly}
          updateChecklist={updateChecklist}
          conditions={[
            { name: 'Trend', points: 10 },
            { name: 'At AOI / Rejected', points: 10 },
            { name: 'Touching EMA', points: 5 },
            { name: 'Round Psychological Level', points: 5 },
            { name: 'Rejection from Previous Structure', points: 10 },
            { name: 'Candlestick Rejection from AOI', points: 10 },
            { name: 'Break & Retest / Head & Shoulders Pattern', points: 10 }
          ]}
          
        />
        
        <TimeframeCard 
          title="DAILY" 
          timeframe="daily"
          data={checklistData.daily}
          updateChecklist={updateChecklist}
          conditions={[
            { name: 'Trend', points: 10 },
            { name: 'At AOI / Rejected', points: 10 },
            { name: 'Touching EMA', points: 5 },
            { name: 'Round Psychological Level', points: 5 },
            { name: 'Rejection from Previous Structure', points: 10 },
            { name: 'Candlestick Rejection from AOI', points: 10 },
            { name: 'Break & Retest / Head & Shoulders Pattern', points: 10 }
          ]}
        />
        
        <TimeframeCard 
          title="4H" 
          timeframe="fourHour"
          data={checklistData.fourHour}
          updateChecklist={updateChecklist}
          conditions={[
            { name: 'Trend', points: 5 },
            { name: 'At AOI / Rejected', points: 5 },
            { name: 'Touching EMA', points: 5 },
            { name: 'Round Psychological Level', points: 5 },
            { name: 'Rejection from Previous Structure', points: 10 },
            { name: 'Candlestick Rejection from AOI', points: 5 },
            { name: 'Break & Retest / Head & Shoulders Pattern', points: 10 }
          ]}
        />
        
        <TimeframeCard 
          title="2H, 1H, 30m" 
          timeframe="lowerTimeframes"
          data={checklistData.lowerTimeframes}
          updateChecklist={updateChecklist}
          conditions={[
            { name: 'Trend', points: 5 },
            { name: 'Touching EMA', points: 5 },
            { name: 'Break & Retest / Head & Shoulders Pattern', points: 5 }
          ]}
        />
        
        <TimeframeCard 
          title="ENTRY SIGNAL" 
          timeframe="entry"
          data={checklistData.entry}
          updateChecklist={updateChecklist}
          conditions={[
            { name: 'SOS', points: 10 },
            { name: 'Engulfing candlestick (30m, 1H, 2H, 4H)', points: 10 }
          ]}
        />
        
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">STOP LOSS & TAKE PROFIT</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Stop Loss <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-slate-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white"
                value={checklistData.stopLoss}
                onChange={(e) => updateChecklist('stopLoss', 'value', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Take Profit <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-slate-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white"
                value={checklistData.takeProfit}
                onChange={(e) => updateChecklist('takeProfit', 'value', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <ConfluenceSummary />
      
      <div className="flex justify-center mt-8">
        <button 
          onClick={() => setSaveModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg text-white font-medium shadow-md transition duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Save Trade
        </button>
      </div>
      
      <SaveTradeModal 
        isOpen={saveModalOpen} 
        onClose={() => setSaveModalOpen(false)} 
      />
    </div>
  );
};

export default Checklist;