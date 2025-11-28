import { motion } from 'framer-motion';
import { useEffect } from 'react';

const ConditionModal = ({ 
  isOpen, 
  onClose, 
  conditionName, 
  onConfirm, 
  onCancel,
  images 
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white dark:bg-dark-800 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Does your {conditionName} look like this?
            </h3>
            <button 
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="flex-1">
                  <div className="relative group">
                    <img 
                      src={image.src} 
                      alt={`${conditionName} example ${index + 1}`} 
                      className="w-full h-64 object-cover rounded-lg border-2 border-slate-200 dark:border-dark-700 group-hover:border-emerald-400 transition-colors"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white font-medium text-lg">{image.label}</span>
                    </div>
                  </div>
                  <p className="text-center mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {image.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                onCancel();
                onClose();
              }}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              No
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Yes
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConditionModal;