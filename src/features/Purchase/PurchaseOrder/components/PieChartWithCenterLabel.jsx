import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
  fontWeight: 500,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();

  return (
    <StyledText
      x={left + width / 2}
      y={top + height / 2}
    >
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel({
  data,
  centerLabel,
}) {
  return (
    <PieChart
      width={220}
      height={220}
      series={[
        {
          data: data.map((item) => ({
            value: item.value,
            label: item.label,
            color: item.color,
          })),
          innerRadius: 60,
          outerRadius: 110,
          paddingAngle: 1,
        },
      ]}
      hideLegend
    >
      <PieCenterLabel>
        {centerLabel}
      </PieCenterLabel>
    </PieChart>
  );
}