
export interface AdInput {
  platform: string;
  targetAudience: string;
  objective: string;
  adCopy: string;
  performanceData?: string;
  videoData?: {
    data: string; // base64
    mimeType: string;
  };
}

export interface MetricScore {
  score: number;
  explanation: string;
}

export interface BrandLiftEstimation {
  recallStrength: 'Low' | 'Moderate' | 'High';
  messageAssociation: 'Low' | 'Moderate' | 'High';
  genericRisk: 'Low' | 'Moderate' | 'High';
  performanceType: 'Short-term performance' | 'Balanced' | 'Brand-building';
  reasoning: string;
}

export interface Recommendations {
  structural: string;
  emotional: string;
  branding: string;
  platformSpecific: string;
  revisedHook: string;
}

export interface DiagnosticResult {
  focus: MetricScore;
  memorability: MetricScore;
  branding: MetricScore;
  emotion: MetricScore;
  pacing: MetricScore;
  overlays: MetricScore;
  brandLift: BrandLiftEstimation;
  recommendations: Recommendations;
}

export enum Platform {
  META = 'Meta',
  TIKTOK = 'TikTok',
  YOUTUBE = 'YouTube',
  DISPLAY = 'Display',
  SEARCH = 'Search',
  OTHER = 'Other'
}
