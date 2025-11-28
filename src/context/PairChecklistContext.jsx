import { createContext, useState, useEffect } from 'react';

export const PairChecklistContext = createContext();

export const PairChecklistProvider = ({ children }) => {
  const [pairs, setPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState(null);
  const [statuses] = useState([
    { id: 'watching', name: 'Watching', color: 'bg-blue-500' },
    { id: 'active', name: 'Active', color: 'bg-emerald-500' },
    { id: 'closed', name: 'Closed', color: 'bg-slate-500' },
    { id: 'canceled', name: 'Canceled', color: 'bg-red-500' }
  ]);

  // Initialize with some default pairs
  useEffect(() => {
    const savedPairs = localStorage.getItem('pairChecklists');
    if (savedPairs) {
      setPairs(JSON.parse(savedPairs));
    } else {
      setPairs([
        {
          id: generateUniqueId('EUR/USD'),
          name: 'EUR/USD',
          status: 'watching',
          checklist: {
            weekly: { trend: false, aoi: false, ema: false, psychological: false, rejection: false, candlestick: false, pattern: false },
            daily: { trend: false, aoi: false, ema: false, psychological: false, rejection: false, candlestick: false, pattern: false },
            fourHour: { trend: false, aoi: false, ema: false, psychological: false, rejection: false, candlestick: false, pattern: false },
            lowerTimeframes: { trend: false, ema: false, pattern: false },
            entry: { sos: false, engulfing: false },
            stopLoss: '',
            takeProfit: ''
          },
          lastUpdated: new Date().toISOString()
        },
        {
          id: generateUniqueId('GBP/USD'),
          name: 'GBP/USD',
          status: 'active',
          checklist: {
            weekly: { trend: true, aoi: false, ema: true, psychological: false, rejection: true, candlestick: false, pattern: false },
            daily: { trend: true, aoi: true, ema: false, psychological: true, rejection: false, candlestick: true, pattern: false },
            fourHour: { trend: false, aoi: false, ema: false, psychological: false, rejection: false, candlestick: false, pattern: false },
            lowerTimeframes: { trend: false, ema: false, pattern: false },
            entry: { sos: false, engulfing: true },
            stopLoss: '1.2500',
            takeProfit: '1.2700'
          },
          lastUpdated: new Date().toISOString()
        },
        {
          id: generateUniqueId('EUR/USD'),
          name: 'EUR/USD',
          status: 'closed',
          checklist: {
            weekly: { trend: true, aoi: true, ema: true, psychological: true, rejection: true, candlestick: true, pattern: true },
            daily: { trend: true, aoi: true, ema: true, psychological: true, rejection: true, candlestick: true, pattern: true },
            fourHour: { trend: true, aoi: true, ema: true, psychological: true, rejection: true, candlestick: true, pattern: true },
            lowerTimeframes: { trend: true, ema: true, pattern: true },
            entry: { sos: true, engulfing: true },
            stopLoss: '1.0800',
            takeProfit: '1.1000'
          },
          lastUpdated: new Date().toISOString()
        }
      ]);
    }
  }, []);

  useEffect(() => {
    if (pairs.length > 0) {
      localStorage.setItem('pairChecklists', JSON.stringify(pairs));
    }
  }, [pairs]);

  // Generate a unique ID using timestamp and random string
  const generateUniqueId = (pairName) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${pairName.toLowerCase().replace('/', '-')}-${timestamp}-${randomString}`;
  };

  const updatePairChecklist = (pairId, timeframe, condition, value) => {
    setPairs(prevPairs => 
      prevPairs.map(pair => {
        if (pair.id === pairId) {
          return {
            ...pair,
            checklist: {
              ...pair.checklist,
              [timeframe]: {
                ...pair.checklist[timeframe],
                [condition]: value
              }
            },
            lastUpdated: new Date().toISOString()
          };
        }
        return pair;
      })
    );
  };

  const updatePairStatus = (pairId, status) => {
    setPairs(prevPairs => 
      prevPairs.map(pair => {
        if (pair.id === pairId) {
          return {
            ...pair,
            status,
            lastUpdated: new Date().toISOString()
          };
        }
        return pair;
      })
    );
  };

  const addNewPair = (pairName) => {
    const newPair = {
      id: generateUniqueId(pairName),
      name: pairName,
      status: 'watching',
      checklist: {
        weekly: { trend: false, aoi: false, ema: false, psychological: false, rejection: false, candlestick: false, pattern: false },
        daily: { trend: false, aoi: false, ema: false, psychological: false, rejection: false, candlestick: false, pattern: false },
        fourHour: { trend: false, aoi: false, ema: false, psychological: false, rejection: false, candlestick: false, pattern: false },
        lowerTimeframes: { trend: false, ema: false, pattern: false },
        entry: { sos: false, engulfing: false },
        stopLoss: '',
        takeProfit: ''
      },
      lastUpdated: new Date().toISOString()
    };
    
    setPairs(prevPairs => [...prevPairs, newPair]);
    return newPair;
  };

  const duplicatePair = (pairId) => {
    const pairToDuplicate = pairs.find(pair => pair.id === pairId);
    if (pairToDuplicate && (pairToDuplicate.status === 'closed' || pairToDuplicate.status === 'canceled')) {
      const duplicatedPair = {
        ...pairToDuplicate,
        id: generateUniqueId(pairToDuplicate.name),
        status: 'watching', // Reset status to watching
        lastUpdated: new Date().toISOString()
      };
      
      setPairs(prevPairs => [...prevPairs, duplicatedPair]);
      return duplicatedPair;
    }
    return null;
  };

  const deletePair = (pairId) => {
    setPairs(prevPairs => prevPairs.filter(pair => pair.id !== pairId));
  };

  const calculatePairScore = (pair) => {
    const { checklist } = pair;
    
    const weeklyScore = 
      (checklist.weekly.trend ? 10 : 0) +
      (checklist.weekly.aoi ? 10 : 0) +
      (checklist.weekly.ema ? 5 : 0) +
      (checklist.weekly.psychological ? 5 : 0) +
      (checklist.weekly.rejection ? 10 : 0) +
      (checklist.weekly.candlestick ? 10 : 0) +
      (checklist.weekly.pattern ? 10 : 0);
    
    const dailyScore = 
      (checklist.daily.trend ? 10 : 0) +
      (checklist.daily.aoi ? 10 : 0) +
      (checklist.daily.ema ? 5 : 0) +
      (checklist.daily.psychological ? 5 : 0) +
      (checklist.daily.rejection ? 10 : 0) +
      (checklist.daily.candlestick ? 10 : 0) +
      (checklist.daily.pattern ? 10 : 0);
    
    const fourHourScore = 
      (checklist.fourHour.trend ? 5 : 0) +
      (checklist.fourHour.aoi ? 5 : 0) +
      (checklist.fourHour.ema ? 5 : 0) +
      (checklist.fourHour.psychological ? 5 : 0) +
      (checklist.fourHour.rejection ? 10 : 0) +
      (checklist.fourHour.candlestick ? 5 : 0) +
      (checklist.fourHour.pattern ? 10 : 0);
    
    const lowerTimeframesScore = 
      (checklist.lowerTimeframes.trend ? 5 : 0) +
      (checklist.lowerTimeframes.ema ? 5 : 0) +
      (checklist.lowerTimeframes.pattern ? 5 : 0);
    
    const entryScore = 
      (checklist.entry.sos ? 10 : 0) +
      (checklist.entry.engulfing ? 10 : 0);
    
    const maxPossibleScore = 120;
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

  return (
    <PairChecklistContext.Provider value={{
      pairs,
      selectedPair,
      setSelectedPair,
      statuses,
      updatePairChecklist,
      updatePairStatus,
      addNewPair,
      duplicatePair,
      deletePair,
      calculatePairScore
    }}>
      {children}
    </PairChecklistContext.Provider>
  );
};