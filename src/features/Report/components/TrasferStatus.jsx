import React from 'react';
import useDashboard from '../hook/useDashboard';
import PieChartWithCenterLabel from './PieChart';

function TrasferStatus() {
  const { data } = useDashboard();

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="border border-gray-200 rounded-lg p-5 shadow-lg ">
      <h1 className="font-medium text-gray-800">
        Sale Payment Method
      </h1>

      <div className="mt-5 flex items-center gap-3 w-[475px] mb-12">
        
        {/* Chart */}
        <div className="w-[237.5px] h-[237.5px] flex items-center justify-center">
          <PieChartWithCenterLabel
            data={data}
            centerLabel={total}
          />
        </div>

        {/* Legend */}
        <div className="w-[237.5px] flex flex-col gap-5">
          {data.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="text-sm text-gray-700">
                  {item.label}
                </span>
              </div>

              <span className="text-sm font-semibold text-gray-800 pe-10">
                {item.value}%
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default TrasferStatus;