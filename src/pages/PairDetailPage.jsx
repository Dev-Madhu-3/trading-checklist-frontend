import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { PairChecklistContext } from '../context/PairChecklistContext';
import { ThemeContext } from '../context/ThemeContext';
import TimeframeCard from '../components/Checklist/TimeframeCard';
import ConfluenceSummary from '../components/Checklist/ConfluenceSummary';

const PairDetailPage = () => {
  const { pairId } = useParams();
  const navigate = useNavigate();
  const { pairs, updatePairChecklist, updatePairStatus, statuses, calculatePairScore } = useContext(PairChecklistContext);
  const { darkMode } = useContext(ThemeContext);
  const [pair, setPair] = useState(null);
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the pair using the unique ID from the URL
    const foundPair = pairs.find(p => p.id === pairId);
    
    if (foundPair) {
      setPair(foundPair);
      setScores(calculatePairScore(foundPair));
    } else {
      // If pair not found, redirect to pairs page
      navigate('/pairs');
    }
    
    setLoading(false);
  }, [pairId, pairs, navigate, calculatePairScore]);

  const getStatusColor = (statusId) => {
    const status = statuses.find(s => s.id === statusId);
    return status ? status.color : 'bg-slate-500';
  };

  const getStatusName = (statusId) => {
    const status = statuses.find(s => s.id === statusId);
    return status ? status.name : 'Unknown';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!pair || !scores) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-dark-800 dark:to-dark-900 rounded-2xl shadow-lg p-12 text-center border border-slate-200 dark:border-dark-700">
        <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 dark:bg-dark-700 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Pair Not Found</h3>
        <p className="mt-2 text-slate-600 dark:text-slate-400">The currency pair you're looking for doesn't exist or has been deleted.</p>
        <div className="mt-6">
          <button
            onClick={() => navigate('/pairs')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
          >
            Back to Pairs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/pairs')}
            className="p-2 rounded-lg bg-slate-100 dark:bg-dark-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{pair.name} Checklist</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Last updated: {new Date(pair.lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-600 dark:text-slate-400">Status:</span>
          <div className="relative">
            <select
              value={pair.status}
              onChange={(e) => updatePairStatus(pair.id, e.target.value)}
              className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-sm font-medium text-white ${getStatusColor(pair.status)} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
            >
              {statuses.map(status => (
                <option key={status.id} value={status.id} className="bg-white dark:bg-dark-800 text-slate-900 dark:text-white">
                  {status.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pair Info Card */}
      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-dark-800 dark:to-dark-900 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-dark-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Pair ID</div>
            <div className="text-sm font-mono text-slate-900 dark:text-white break-all">{pair.id}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Status</div>
            <div className="flex items-center justify-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(pair.status)} text-white`}>
                {getStatusName(pair.status)}
              </span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Confluence Score</div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{scores.total}%</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeframeCard 
          title="WEEKLY" 
          timeframe="weekly"
          data={pair.checklist.weekly}
          updateChecklist={(timeframe, condition, value) => updatePairChecklist(pair.id, timeframe, condition, value)}
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
          data={pair.checklist.daily}
          updateChecklist={(timeframe, condition, value) => updatePairChecklist(pair.id, timeframe, condition, value)}
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
          data={pair.checklist.fourHour}
          updateChecklist={(timeframe, condition, value) => updatePairChecklist(pair.id, timeframe, condition, value)}
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
          data={pair.checklist.lowerTimeframes}
          updateChecklist={(timeframe, condition, value) => updatePairChecklist(pair.id, timeframe, condition, value)}
          conditions={[
            { name: 'Trend', points: 5 },
            { name: 'Touching EMA', points: 5 },
            { name: 'Break & Retest / Head & Shoulders Pattern', points: 5 }
          ]}
        />
        
        <TimeframeCard 
          title="ENTRY SIGNAL" 
          timeframe="entry"
          data={pair.checklist.entry}
          updateChecklist={(timeframe, condition, value) => updatePairChecklist(pair.id, timeframe, condition, value)}
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
                Stop Loss
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-slate-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white"
                value={pair.checklist.stopLoss}
                onChange={(e) => updatePairChecklist(pair.id, 'stopLoss', 'value', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Take Profit
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-slate-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white"
                value={pair.checklist.takeProfit}
                onChange={(e) => updatePairChecklist(pair.id, 'takeProfit', 'value', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <ConfluenceSummary scores={scores} />
    </div>
  );
};

export default PairDetailPage;