import { DollarSign, FolderTree, PackageSearch, ShoppingCart, SquareArrowOutDownRight, SquareArrowUpRight, Users } from "lucide-react";

export const DashboardCards = [
  {
    id: 1,
    title: "Total Categories",
    value: 1200,
    growth: "8.5%",
    color: "bg-blue-600",
    icon: FolderTree,
  },
  {
    id: 2,
    title: "Active Categories",
    value: 356,
    growth: "5.2%",
    color: "bg-green-600",
    icon: SquareArrowUpRight,
  },
  {
    id: 3,
    title: "Inacive Categories",
    value: 90,
    growth: "12%",
    color: "bg-purple-600",
    icon: SquareArrowOutDownRight,
  },
  {
    id: 4,
    title: "Total Products",
    value: "$25,000",
    growth: "15%",
    color: "bg-orange-500",
    icon: DollarSign,
  },
];