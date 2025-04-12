import React from 'react';
import { motion } from 'framer-motion';

const Results = ({ correctedText, isLoading, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-[500px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Results</h2>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Check Again
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : correctedText ? (
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Corrected Text</h3>
          <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-y-auto">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{correctedText}</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
          Enter some text and click "Check Grammar" to see the results
        </div>
      )}
    </motion.div>
  );
};

export default Results; 