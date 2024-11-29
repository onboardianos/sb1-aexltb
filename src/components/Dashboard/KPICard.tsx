import React, { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, Download } from 'lucide-react';
import { DealershipKPI } from '../../types/analytics';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import { exportToCSV } from '../../utils/export';

interface KPICardProps {
  kpi: DealershipKPI;
  isLoading?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({ kpi, isLoading }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const getTrendIcon = () => {
    switch (kpi.trend) {
      case 'up':
        return <ArrowUpIcon className="w-4 h-4 text-green-500" />;
      case 'down':
        return <ArrowDownIcon className="w-4 h-4 text-red-500" />;
      default:
        return <MinusIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleExport = () => {
    exportToCSV([kpi], `${kpi.name.toLowerCase().replace(/\s+/g, '-')}-metrics`);
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setIsDetailsOpen(true)}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-gray-600 text-sm font-medium">{kpi.name}</h3>
          {getTrendIcon()}
        </div>
        <div className="mt-4">
          <span className="text-2xl font-bold">{kpi.value}</span>
          <div className="flex items-center mt-2">
            <span className={`text-sm ${kpi.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {kpi.change >= 0 ? '+' : ''}{kpi.change}%
            </span>
            <span className="text-gray-500 text-sm ml-2">vs previous</span>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title={`${kpi.name} Details`}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Current Value</p>
              <p className="text-lg font-semibold">{kpi.value}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Previous Value</p>
              <p className="text-lg font-semibold">{kpi.previousValue}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Change</p>
              <p className={`text-lg font-semibold ${kpi.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.change >= 0 ? '+' : ''}{kpi.change}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="text-lg font-semibold capitalize">{kpi.department}</p>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button
              variant="secondary"
              icon={Download}
              onClick={(e) => {
                e.stopPropagation();
                handleExport();
              }}
            >
              Export Data
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};