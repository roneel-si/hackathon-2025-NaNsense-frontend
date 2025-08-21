import React from 'react';
import { createRoot } from 'react-dom/client';
import TriviaQuiz from './components/TriviaQuiz';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-fluid-md px-fluid-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-fluid-lg">
          <h1 className="text-fluid-4xl font-bold text-gray-800 mb-fluid-sm">
            🏆 Sports Trivia Quiz Widget 🏆
          </h1>
          <p className="text-fluid-lg text-gray-600">
            Test the embeddable trivia quiz widget below
          </p>
        </div>
        
        <div className="flex flex-col xl:flex-row gap-fluid-lg">
          {/* Widget Demo */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-lg p-fluid-md">
              <h2 className="text-fluid-2xl font-bold text-gray-800 mb-fluid-sm">
                Widget Preview
              </h2>
              <TriviaQuiz config={{
                apiUrl: 'https://sportziq-apis.onrender.com/trivia/generate-sports-trivia',
                timeLimit: 25,
                onComplete: (score, total) => {
                  console.log(`Quiz completed! Score: ${score}/${total}`);
                }
              }} />
            </div>
          </div>
          
          {/* Instructions */}
          <div className="xl:w-80 xl:flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-fluid-md">
              <h2 className="text-fluid-2xl font-bold text-gray-800 mb-fluid-sm">
                How to Embed
              </h2>
              <div className="space-y-fluid-sm text-fluid-sm">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-fluid-xs">1. Include the script:</h3>
                  <pre className="bg-gray-100 p-fluid-xs rounded text-fluid-xs overflow-x-auto">
{`<script src="https://your-domain.com/widget.js"></script>`}
                  </pre>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-fluid-xs">2. Add container:</h3>
                  <pre className="bg-gray-100 p-fluid-xs rounded text-fluid-xs overflow-x-auto">
{`<div id="trivia-widget"></div>`}
                  </pre>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-fluid-xs">3. Initialize:</h3>
                  <pre className="bg-gray-100 p-fluid-xs rounded text-fluid-xs overflow-x-auto">
{`<script>
  new TriviaQuizWidget('trivia-widget', {
    timeLimit: 30,
    theme: 'light'
  });
</script>`}
                  </pre>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-fluid-xs">Or use data attributes:</h3>
                  <pre className="bg-gray-100 p-fluid-xs rounded text-fluid-xs overflow-x-auto">
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
