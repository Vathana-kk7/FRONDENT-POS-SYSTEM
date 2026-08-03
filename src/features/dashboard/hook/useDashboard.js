import React from 'react';

function useDashboard() {
  const data = [
    {
      value: 45,
      label: 'Cash',
      color: '#3520B8',
    },
    {
      value: 30,
      label: 'Card',
      color: '#1769D5',
    },
    {
      value: 15,
      label: 'Mobile Money',
      color: '#FF9800',
    },
    {
      value: 10,
      label: 'Bank Transfer',
      color: '#12A879',
    },
  ];

  return {
    data,
  };
}

export default useDashboard;