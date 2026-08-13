import { BarChart } from '@mui/x-charts/BarChart';

const dataset = [
  { location: 'Main Warehouse', transfers: 7 },
  { location: 'Lagos Warehouse', transfers: 5 },
  { location: 'Abuja Warehouse', transfers: 4 },
  { location: 'Port Harcourt Store', transfers: 2 },
  { location: 'Ibadan Store', transfers: 2 },
  { location: 'Kano Warehouse', transfers: 1 },
];

export default function TopLocationsByTransfers() {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-5 shadow-lg">
      
      <h2 className="mb-2 text-md font-semibold">
        Top Locations by Transfers
      </h2>

      <BarChart
        dataset={dataset}
        layout="horizontal"
        yAxis={[
          {
            scaleType: 'band',
            dataKey: 'location',
            tickLabelStyle: {
              fontSize: 11,
              fill: '#1e3a8a',
            },
          },
        ]}
        xAxis={[
          {
            min: 0,
            max: 8,
            tickNumber: 5,
            tickLabelStyle: {
              fontSize: 10,
              fill: '#64748b',
            },
          },
        ]}
        series={[
          {
            dataKey: 'transfers',
            label: 'Transfers',
            color: '#4f2ee8',
            barLabel: 'value',
          },
        ]}
        grid={{
          vertical: true,
        }}
        height={300}
        margin={{
          left: 0,
          right: 35,
          top: 10,
          bottom: 2,
        }}
         slotProps={{
          barLabel: {
            style: {
              fill: '#ffffff',
              fontWeight: 600,
              fontSize: 13,
            },
          },
        }}
        hideLegend
        borderRadius={0}
      />
    </div>
  );
}