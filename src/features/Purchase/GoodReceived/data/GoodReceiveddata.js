import { Box, CalendarCheck, ClipboardList, PackageCheck, Wallet } from "lucide-react";

export const GoodReceivedCards = [
  {
    id: 1,
    title: "Total Receipts",
    value: 0,
    growth: "Based on recorded receipts",
    color: "bg-blue-600",
    icon: ClipboardList,
  },
  {
    id: 2,
    title: "Quantity Received",
    value: 0,
    growth: "Based on recorded receipts",
    color: "bg-green-600",
    icon: PackageCheck,
  },
  {
    id: 3,
    title: "Received Today",
    value: 0,
    growth: "Receipts today",
    color: "bg-purple-600",
    icon: CalendarCheck,
  },
  {
    id: 4,
    title: "Received Value",
    value: "$0.00",
    growth: "Based on recorded receipts",
    color: "bg-yellow-500",
    icon: Wallet,
  },
  {
    id: 5,
    title: "Products Received",
    value: 0,
    growth: "Based on recorded receipts",
    color: "bg-red-500",
    icon: Box,
  },
];
