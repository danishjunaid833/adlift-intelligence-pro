
import React, { useState } from 'react';
import { AdInput, DiagnosticResult } from './types';
import { analyzeAdCopy } from './services/geminiService';
import { Header } from './components/Header';
import { AdForm } from './components/AdForm';
import { AnalysisDashboard } from './components/AnalysisDashboard';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<DiagnosticResult | null>(null);
  const [inputData, setInputData] = useState<AdInput | null>(null);

  const handleAnalyze = async (data: AdInput) => {
    setLoading(true);
    setError(null);
    setInputData(data);
    try {
      const result = await analyzeAdCopy(data);
      setAnalysis(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError("Analysis failed. Please try again later. Ensure the video isn't too large or corrupted.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setInputData(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {!analysis && !loading && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Evaluate Your Creative Impact</h2>
              <p className="text-slate-500">Input your ad copy or upload a video for a rigorous diagnostic analysis using multimodal brand effectiveness frameworks.</p>
            </div>
            <AdForm onAnalyze={handleAnalyze} isLoading={loading} />
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h3 className="text-2xl font-semibold text-indigo-700 animate-pulse">Analyzing Effectiveness...</h3>
            <p className="text-slate-500 mt-2 text-center max-w-md italic">Running creative diagnostics across memory cues, emotional resonance, visual pacing, and brand lift potential.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 flex items-center">
            <i className="fas fa-exclamation-triangle mr-3 text-xl"></i>
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        {analysis && !loading && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button 
              onClick={handleReset}
              className="group flex items-center text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <i className="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
              Back to Input
            </button>
            
            <AnalysisDashboard 
              analysis={analysis} 
              originalCopy={inputData?.adCopy || ""}
              platform={inputData?.platform || ""}
              videoData={inputData?.videoData?.data}
            />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-400 text-sm mt-auto">
        <p>&copy; 2024 AdLift Intelligence Pro. Powered by Gemini 3 Pro Multimodal Reasoning.</p>
      </footer>
    </div>
  );
};
