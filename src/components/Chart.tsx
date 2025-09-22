import React from 'react';

interface ChartProps {
  type: 'bar' | 'line' | 'pie';
  data: Array<{ label: string; value: number; color?: string }>;
  height?: number;
}

export default function Chart({ type, data, height = 200 }: ChartProps) {
  if (type === 'bar') {
    const maxValue = Math.max(...data.map(item => item.value));
    
    return (
      <div className="space-y-3" style={{ height }}>
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-20 text-sm text-gray-600 text-right">{item.label}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
              <div
                className={`h-4 rounded-full ${item.color || 'bg-blue-500'}`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
            <div className="w-16 text-sm text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'pie') {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="grid grid-cols-2 gap-4 w-full">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded ${item.color || 'bg-blue-500'}`} />
              <div className="text-sm">
                <div className="text-gray-900">{item.label}</div>
                <div className="text-gray-500">{((item.value / total) * 100).toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Line chart (simplified representation)
  return (
    <div className="space-y-2" style={{ height }}>
      <div className="text-sm text-gray-600 mb-4">Trend Analysis</div>
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-700">{item.label}</span>
          <span className="text-sm font-medium text-gray-900">{item.value}</span>
        </div>
      ))}
    </div>
  );
}