export interface SalesMetric {
  id: string;
  type: 'new' | 'used';
  units: number;
  averagePrice: number;
  trend: number;
  previousUnits: number;
}

export interface MarginMetric {
  id: string;
  type: 'new' | 'used';
  grossProfit: number;
  pvr: number;
  trend: number;
  previousGrossProfit: number;
}

export interface TradeMetric {
  id: string;
  captureRate: number;
  averageHold: number;
  trend: number;
  previousCaptureRate: number;
}

export interface ClosingMetric {
  id: string;
  type: 'floor' | 'digital';
  leads: number;
  closed: number;
  rate: number;
  trend: number;
}

export interface CSIMetric {
  id: string;
  score: number;
  surveysCount: number;
  underNinety: number;
  trend: number;
}

export interface VideoMetric {
  id: string;
  created: number;
  views: number;
  ranking: number;
  trend: number;
}