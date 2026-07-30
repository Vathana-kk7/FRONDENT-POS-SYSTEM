import {
  PackageSearch,
  ShoppingCart,
  Users,
  DollarSign,
} from "lucide-react";

export const ProductsCards = [
  {
    id: 1,
    title: "Total Products",
    value: 1200,
    growth: "8.5%",
    color: "bg-blue-600",
    icon: PackageSearch,
  },
  {
    id: 2,
    title: "Low Stock",
    value: 356,
    growth: "5.2%",
    color: "bg-green-600",
    icon: ShoppingCart,
  },
  {
    id: 3,
    title: "Out of Stock",
    value: 90,
    growth: "12%",
    color: "bg-purple-600",
    icon: Users,
  },
  {
    id: 4,
    title: "Total Value",
    value: "$25,000",
    growth: "15%",
    color: "bg-orange-500",
    icon: DollarSign,
  },
];