import React from 'react';

function usePrurchaseOrder() {
 const data = [
  {
    label: "Received",
    value: 10,
    color: "#4CAF50",
  },
  {
    label: "Pending",
    value: 6,
    color: "#3B82F6",
  },
  {
    label: "Partially Received",
    value: 2,
    color: "#F59E0B",
  },
  {
    label: "Cancelled",
    value: 2,
    color: "#EF4444",
  },
];

  return {
    data,
  };
}

export default usePrurchaseOrder;