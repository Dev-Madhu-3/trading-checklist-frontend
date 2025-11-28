import { createContext, useState, useEffect } from 'react';

export const ChecklistContext = createContext();

export const ChecklistProvider = ({ children }) => {
  const [checklistData, setChecklistData] = useState({
    weekly: { 
      trend: false, 
      aoi: false, 
      ema: false, 
      psychological: false, 
      rejection: false, 
      candlestick: false, 
      pattern: false 
    },
    daily: { 
      trend: false, 
      aoi: false, 
      ema: false, 
      psychological: false, 
      rejection: false, 
      candlestick: false, 
      pattern: false 
    },
    fourHour: { 
      trend: false, 
      aoi: false, 
      ema: false, 
      psychological: false, 
      rejection: false, 
      candlestick: false, 
      pattern: false 
    },
    lowerTimeframes: { 
      trend: false, 
      ema: false, 
      pattern: false 
    },
    entry: { 
      sos: false, 
      engulfing: false 
    },
    stopLoss: '',
    takeProfit: ''
  });

  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveToJournal = () => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...checklistData,
      scores: calculateScores()
    };
    
    const updatedEntries = [...journalEntries, newEntry];
    setJournalEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  };

  const calculateScores = () => {
    // Calculate weekly score
    const weeklyScore = 
      (checklistData.weekly.trend ? 10 : 0) +
      (checklistData.weekly.aoi ? 10 : 0) +
      (checklistData.weekly.ema ? 5 : 0) +
      (checklistData.weekly.psychological ? 5 : 0) +
      (checklistData.weekly.rejection ? 10 : 0) +
      (checklistData.weekly.candlestick ? 10 : 0) +
      (checklistData.weekly.pattern ? 10 : 0);
    
    // Calculate daily score
    const dailyScore = 
      (checklistData.daily.trend ? 10 : 0) +
      (checklistData.daily.aoi ? 10 : 0) +
      (checklistData.daily.ema ? 5 : 0) +
      (checklistData.daily.psychological ? 5 : 0) +
      (checklistData.daily.rejection ? 10 : 0) +
      (checklistData.daily.candlestick ? 10 : 0) +
      (checklistData.daily.pattern ? 10 : 0);
    
    // Calculate 4H score
    const fourHourScore = 
      (checklistData.fourHour.trend ? 5 : 0) +
      (checklistData.fourHour.aoi ? 5 : 0) +
      (checklistData.fourHour.ema ? 5 : 0) +
      (checklistData.fourHour.psychological ? 5 : 0) +
      (checklistData.fourHour.rejection ? 10 : 0) +
      (checklistData.fourHour.candlestick ? 5 : 0) +
      (checklistData.fourHour.pattern ? 10 : 0);
    
    // Calculate lower timeframes score
    const lowerTimeframesScore = 
      (checklistData.lowerTimeframes.trend ? 5 : 0) +
      (checklistData.lowerTimeframes.ema ? 5 : 0) +
      (checklistData.lowerTimeframes.pattern ? 5 : 0);
    
    // Calculate entry signal score
    const entryScore = 
      (checklistData.entry.sos ? 10 : 0) +
      (checklistData.entry.engulfing ? 10 : 0);
    
    // Calculate total score
    const maxPossibleScore = 120; // Maximum possible score across all timeframes
    const totalScore = Math.round(((weeklyScore + dailyScore + fourHourScore + lowerTimeframesScore + entryScore) / maxPossibleScore) * 100);
    
    return {
      weekly: weeklyScore,
      daily: dailyScore,
      fourHour: fourHourScore,
      lowerTimeframes: lowerTimeframesScore,
      entry: entryScore,
      total: totalScore
    };
  };

  const updateChecklist = (timeframe, condition, value) => {
    setChecklistData(prev => ({
      ...prev,
      [timeframe]: {
        ...prev[timeframe],
        [condition]: value
      }
    }));
  };

  return (
    <ChecklistContext.Provider value={{
      checklistData,
      updateChecklist,
      saveToJournal,
      journalEntries,
      calculateScores
    }}>
      {children}
    </ChecklistContext.Provider>
  );
};