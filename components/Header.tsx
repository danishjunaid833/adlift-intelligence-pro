
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-indigo-900 text-white py-6 shadow-lg">
      <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-lg">
            <i className="fas fa-chart-line text-indigo-900 text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">AdLift Intelligence <span className="text-indigo-300">Pro</span></h1>
            <p className="text-xs uppercase tracking-widest text-indigo-200 font-semibold opacity-80">Creative Effectiveness Engine</p>
          </div>
        </div>
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#" className="hover:text-indigo-300 transition-colors">Framework</a>
          <a href="#" className="hover:text-indigo-300 transition-colors">Brand Lift</a>
          <a href="#" className="hover:text-indigo-300 transition-colors">Documentation</a>
        </div>
      </div>
    </header>
  );
};
