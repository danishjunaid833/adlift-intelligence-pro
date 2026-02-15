
import React from 'react';
import { DiagnosticResult } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface AnalysisDashboardProps {
  analysis: DiagnosticResult;
  originalCopy: string;
  platform: string;
  videoData?: string;
}

const ScoreCard: React.FC<{ title: string, score: number, explanation: string, icon: string }> = ({ title, score, explanation, icon }) => {
  const getScoreColor = (s: number) => {
    if (s >= 8) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (s >= 6) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
            <i className={`fas ${icon}`}></i>
          </div>
          <h4 className="font-bold text-slate-800">{title}</h4>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getScoreColor(score)}`}>
          {score}/10
        </div>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed flex-grow">{explanation}</p>
    </div>
  );
};

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ analysis, originalCopy, platform, videoData }) => {
  const radarData = [
    { subject: 'Focus', A: analysis.focus.score, fullMark: 10 },
    { subject: 'Memorability', A: analysis.memorability.score, fullMark: 10 },
    { subject: 'Branding', A: analysis.branding.score, fullMark: 10 },
    { subject: 'Emotion', A: analysis.emotion.score, fullMark: 10 },
    { subject: 'Pacing', A: analysis.pacing.score, fullMark: 10 },
    { subject: 'Overlays', A: analysis.overlays.score, fullMark: 10 },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {platform} Diagnostic
              </span>
              <span className="text-slate-400 text-xs">v1.1 Multimodal Internal Agent</span>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Creative Diagnostic <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Report</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Recall</p>
                <p className={`text-sm font-bold ${analysis.brandLift.recallStrength === 'High' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {analysis.brandLift.recallStrength}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Association</p>
                <p className={`text-sm font-bold ${analysis.brandLift.messageAssociation === 'High' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {analysis.brandLift.messageAssociation}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Generic Risk</p>
                <p className={`text-sm font-bold ${analysis.brandLift.genericRisk === 'Low' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {analysis.brandLift.genericRisk}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Performance</p>
                <p className="text-sm font-bold text-slate-800">
                  {analysis.brandLift.performanceType}
                </p>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed border-l-4 border-indigo-200 pl-4 py-1 italic">
              "{analysis.brandLift.reasoning}"
            </p>
          </div>
          
          <div className="w-full md:w-1/3 h-[280px] flex items-center justify-center bg-slate-50 rounded-3xl p-4">
             <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} hide />
                <Radar name="Ad Impact" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScoreCard title="Focus" score={analysis.focus.score} explanation={analysis.focus.explanation} icon="fa-bullseye" />
        <ScoreCard title="Memorability" score={analysis.memorability.score} explanation={analysis.memorability.explanation} icon="fa-brain" />
        <ScoreCard title="Branding" score={analysis.branding.score} explanation={analysis.branding.explanation} icon="fa-tag" />
        <ScoreCard title="Emotion" score={analysis.emotion.score} explanation={analysis.emotion.explanation} icon="fa-heart" />
        <ScoreCard title="Pacing" score={analysis.pacing.score} explanation={analysis.pacing.explanation} icon="fa-tachometer-alt" />
        <ScoreCard title="Overlays" score={analysis.overlays.score} explanation={analysis.overlays.explanation} icon="fa-closed-captioning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <i className="fas fa-magic text-indigo-500 mr-3"></i>
              Improvement Recommendations
            </h3>
            
            <div className="space-y-6">
              <section>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Structural Improvements</h5>
                <p className="text-slate-700 text-sm leading-relaxed">{analysis.recommendations.structural}</p>
              </section>
              
              <section>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Emotional Amplification</h5>
                <p className="text-slate-700 text-sm leading-relaxed">{analysis.recommendations.emotional}</p>
              </section>

              <section>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Brand Embedding</h5>
                <p className="text-slate-700 text-sm leading-relaxed">{analysis.recommendations.branding}</p>
              </section>

              <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                <h5 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">Revised Hook Prototype</h5>
                <p className="text-indigo-900 font-bold text-lg leading-snug italic">
                  "{analysis.recommendations.revisedHook}"
                </p>
                <p className="text-indigo-400 text-xs mt-3">Refinement optimized for {platform} dynamics.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <i className="fas fa-file-alt text-indigo-400 mr-3"></i>
              Original Source
            </h3>
            {videoData && (
              <div className="mb-6 rounded-2xl overflow-hidden border border-slate-700 bg-black">
                <video src={`data:video/mp4;base64,${videoData}`} className="w-full max-h-48 object-contain" controls />
              </div>
            )}
            <div className="bg-slate-800/50 rounded-2xl p-6 font-mono text-sm text-slate-300 leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto">
              {originalCopy || "No text copy provided."}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bg-slate-800 px-3 py-1 rounded-md text-[10px] text-slate-400 uppercase tracking-widest font-bold">Raw Input</span>
              <span className="bg-slate-800 px-3 py-1 rounded-md text-[10px] text-slate-400 uppercase tracking-widest font-bold">{platform}</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Platform Refinements</h3>
             <p className="text-sm text-slate-600 leading-relaxed">
               {analysis.recommendations.platformSpecific}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
