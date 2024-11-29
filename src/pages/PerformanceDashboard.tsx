import React, { useState, useEffect } from 'react';
import { SalesOverview } from '../components/Performance/SalesOverview';
import { MarginAnalysis } from '../components/Performance/MarginAnalysis';
import { TradeMetrics } from '../components/Performance/TradeMetrics';
import { DateRangeSelector } from '../components/Filters/DateRangeSelector';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { DateRangeFilter } from '../types/analytics';
import { SalesMetric, MarginMetric, TradeMetric } from '../types/performance';

// Sample data - In a real application, this would come from an API
const salesData: SalesMetric[] = [
  {
    id: '1',
    type: 'new',
    units: 45,
    averagePrice: 32500,
    trend: 8,
    previousUnits: 42,
  },
  {
    id: '2',
    type: 'used',
    units: 68,
    averagePrice: 24800,
    trend: -3,
    previousUnits: 70,
  },
];

const marginData: MarginMetric[] = [
  {
    id: '1',
    type: 'new',
    grossProfit: 158000,
    pvr: 3511,
    trend: 5,
    previousGrossProfit: 150000,
  },
  {
    id: '2',
    type: 'used',
    grossProfit: 204000,
    pvr: 3000,
    trend: 2,
    previousGrossProfit: 200000,
  },
];

const tradeData: TradeMetric = {
  id: '1',
  captureRate: 65,
  averageHold: 2800,
  trend: 4,
  previousCaptureRate: 62,
};

export const PerformanceDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRangeFilter>('30d');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    fetchData();
  }, [dateRange]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Performance Analytics</h1>
          <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
        </div>

        {isLoading ? (
          <LoadingSpinner className="h-64" />
        ) : (
          <div className="space-y-6">
            <SalesOverview metrics={salesData} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarginAnalysis metrics={marginData} />
              <TradeMetrics metric={tradeData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};