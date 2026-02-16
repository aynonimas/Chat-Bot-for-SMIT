import React from 'react';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    // Minimalist background to represent the "Blank Website" or simple landing page
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center text-gray-400 font-light">
      
      {/* Background content to show it's a website */}
      <div className="text-center space-y-4 p-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 opacity-20 select-none">
          SAYLANI WELFARE
        </h1>
        <p className="text-xl uppercase tracking-widest opacity-30 select-none">
          Student Volunteer Portal
        </p>
      </div>

      {/* The actual task: The Side Icon Chat Bot */}
      <ChatWidget />
    </div>
  );
}

export default App;
