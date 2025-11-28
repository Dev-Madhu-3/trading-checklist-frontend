import ConditionToggle from './ConditionToggle';

const TimeframeCard = ({ title, timeframe, data, updateChecklist, conditions }) => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md overflow-hidden">
      <div className="bg-slate-100 dark:bg-dark-700 px-6 py-4 border-b border-slate-200 dark:border-dark-600">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {Object.values(data).filter(Boolean).length}/{Object.keys(data).length} conditions met
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        {conditions.map((condition, index) => (
          <ConditionToggle 
            key={index}
            name={condition.name}
            points={condition.points}
            checked={data[condition.name.toLowerCase().replace(/ /g, '_').replace(/\//g, '_').replace(/\&/g, '_and')]}
            onChange={(checked) => updateChecklist(timeframe, condition.name, checked)}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeframeCard;