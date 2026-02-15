
import React, { useState, useRef } from 'react';
import { AdInput, Platform } from '../types';

interface AdFormProps {
  onAnalyze: (data: AdInput) => void;
  isLoading: boolean;
}

export const AdForm: React.FC<AdFormProps> = ({ onAnalyze, isLoading }) => {
  const [formData, setFormData] = useState<AdInput>({
    platform: Platform.META,
    targetAudience: '',
    objective: '',
    adCopy: '',
    performanceData: ''
  });
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        alert("Video size exceeds 20MB limit. Please upload a smaller clip for analysis.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64String = result.split(',')[1];
        setFormData(prev => ({
          ...prev,
          videoData: {
            data: base64String,
            mimeType: file.type
          }
        }));
        setVideoPreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeVideo = () => {
    setVideoPreview(null);
    setFormData(prev => ({ ...prev, videoData: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.adCopy.length < 5 && !formData.videoData) {
      alert("Please provide ad copy or a video for a meaningful analysis.");
      return;
    }
    onAnalyze(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Platform</label>
          <select 
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50"
          >
            {Object.values(Platform).map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Target Audience</label>
          <input 
            type="text"
            name="targetAudience"
            required
            placeholder="e.g., Busy urban professionals age 25-40"
            value={formData.targetAudience}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Campaign Objective</label>
        <input 
          type="text"
          name="objective"
          required
          placeholder="e.g., Brand Awareness, Lead Gen, or Product Launch Conversion"
          value={formData.objective}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Ad Copy / Video Script</label>
          <textarea 
            name="adCopy"
            rows={8}
            placeholder="Paste your ad copy or script here. Include headlines and CTA."
            value={formData.adCopy}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50 resize-none font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Video Ad Creative (Optional)</label>
          {!videoPreview ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-[216px] border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors group"
            >
              <i className="fas fa-video text-3xl text-slate-300 mb-3 group-hover:text-indigo-400 transition-colors"></i>
              <p className="text-sm text-slate-500 font-medium">Click to upload video ad</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">MP4, MOV up to 20MB</p>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleVideoUpload}
                className="hidden" 
                accept="video/*"
              />
            </div>
          ) : (
            <div className="relative w-full h-[216px] bg-black rounded-xl overflow-hidden group">
              <video 
                src={videoPreview} 
                className="w-full h-full object-contain" 
                controls 
              />
              <button 
                type="button"
                onClick={removeVideo}
                className="absolute top-2 right-2 bg-rose-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600 shadow-lg"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Performance Data (Optional)</label>
        <textarea 
          name="performanceData"
          rows={2}
          placeholder="e.g., Previous CTR was 0.8%, Hook rate was low."
          value={formData.performanceData}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50 resize-none text-sm"
        />
      </div>

      <button 
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all transform active:scale-[0.98] ${
          isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <i className="fas fa-circle-notch animate-spin mr-3"></i>
            Analyzing Multimodal Creative...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <i className="fas fa-bolt mr-3"></i>
            Run Full Diagnostic Analysis
          </span>
        )}
      </button>
    </form>
  );
};
