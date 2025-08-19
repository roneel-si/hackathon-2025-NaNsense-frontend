import React from 'react';
import { createRoot } from 'react-dom/client';
import TriviaQuiz from './components/TriviaQuiz';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🏆 Sports Trivia Quiz Widget 🏆
          </h1>
          <p className="text-lg text-gray-600">
            Test the embeddable trivia quiz widget below
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Widget Demo */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Widget Preview
              </h2>
              <TriviaQuiz />
            </div>
          </div>
          
          {/* Instructions */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                How to Embed
              </h2>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">1. Include the script:</h3>
                  <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`<script src="https://your-domain.com/widget.js"></script>`}
                  </pre>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">2. Add container:</h3>
                  <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`<div id="trivia-widget"></div>`}
                  </pre>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">3. Initialize:</h3>
                  <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`<script>
  new TriviaQuizWidget('trivia-widget', {
    timeLimit: 30,
    theme: 'light'
  });
</script>`}
                  </pre>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Or use data attributes:</h3>
                  <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`<div data-trivia-widget 
     data-time-limit="30" 
     data-theme="light">
</div>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
