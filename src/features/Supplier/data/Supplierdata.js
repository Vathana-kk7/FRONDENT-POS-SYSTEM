import { CircleSlash2, DollarSign, Pin, UsersRound } from "lucide-react";

export const SupplierCards = [
  {
    id: 1,
    title: "Total Suppliers",
    value: 0,
    color: "bg-blue-600",
    icon: UsersRound,
  },
  {
    id: 2,
    title: "Active Suppliers",
    value: 0,
    color: "bg-green-600",
    icon: Pin,
  },
  {
    id: 3,
    title: "Inactive Suppliers",
    value: 0,
    color: "bg-purple-600",
    icon: CircleSlash2,
  },
  {
    id: 4,
    title: "Total Payable",
    value: "$0.00",
    color: "bg-orange-500",
    icon: DollarSign,
  },
];
