import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-orange-500 px-6 py-4">
            <h1 className="text-3xl font-bold text-white">About Me</h1>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
              <div className="w-32 h-32 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <span className="text-4xl font-bold text-orange-500 dark:text-orange-400">AM</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Arjun Maurya</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">B.Tech CSE 2nd Year</p>
                <p className="text-gray-600 dark:text-gray-300">Lovely Professional University</p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About This Project</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  This Grammar Checker application is built using modern web technologies including React, Tailwind CSS, and the Gemini AI API. It provides instant feedback on grammar, spelling, and writing style, helping users improve their writing skills.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Real-time grammar checking</li>
                  <li>Detailed error explanations</li>
                  <li>Suggestions for improvements</li>
                  <li>Dark mode support</li>
                  <li>Responsive design</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Feel free to reach out for any questions or suggestions!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About; 