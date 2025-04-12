import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TextEditor from './components/TextEditor';
import Results from './components/Results';
import About from './components/About';
import { checkGrammar } from './services/geminiService';
import { motion } from 'framer-motion';

function Home() {
  const [text, setText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTextChange = (newText) => {
    setText(newText);
    setCorrectedText('');
    setErrors([]);
    setError(null);
  };

  const handleCheckGrammar = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);
    setErrors([]);

    try {
      const result = await checkGrammar(text);
      console.log('Grammar check result:', result);
      if (result && result.errors) {
        setErrors(result.errors);
      }
      if (result && result.correctedText) {
        setCorrectedText(result.correctedText);
      }
    } catch (err) {
      console.error('Error checking grammar:', err);
      setError(err.message || 'An error occurred while checking grammar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Enhance Your Writing with AI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Get instant feedback on your grammar, spelling, and writing style. Perfect for students, professionals, and anyone who wants to improve their writing.
            </motion.p>
          </div>
        </div>
      </motion.div>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TextEditor
                text={text}
                onTextChange={handleTextChange}
                onCheckGrammar={handleCheckGrammar}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Results
                correctedText={correctedText}
                isLoading={isLoading}
                onRetry={handleCheckGrammar}
              />
            </motion.div>
          </div>
          
          {/* Error Messages */}
          <div className="mt-8 space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg p-4 text-red-600 dark:text-red-400">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              </motion.div>
            )}
            
            {errors && errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-orange-500 px-6 py-4">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Grammar Errors Found
                    </h3>
                    <p className="text-orange-100 mt-1">
                      {errors.length} {errors.length === 1 ? 'error' : 'errors'} found in your text
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {errors.map((error, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                <span className="text-orange-500 dark:text-orange-400 font-semibold">{index + 1}</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-700 dark:text-gray-300 font-medium">{error.message}</p>
                              <div className="mt-2 bg-white dark:bg-gray-700 rounded-md p-3">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  <span className="font-medium text-orange-500 dark:text-orange-400">Suggestion:</span> {error.suggestion}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  <span className="font-medium text-orange-500 dark:text-orange-400">Explanation:</span> {error.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <footer className="mt-12 py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                © 2024 Grammar Checker. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
