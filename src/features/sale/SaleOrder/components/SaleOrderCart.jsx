import { ArrowUp } from "lucide-react";
function SaleOrderCart({ card }) {
  const Icon = card.icon;

  return (
    <div className="bg-white hover:scale-x-104 transition-all w-[350px] rounded-2xl border border-gray-200 shadow-lg p-6 flex items-center gap-5">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${card.color}`}>
        <Icon color="white" size={28} />
      </div>
      <div className="flex-1">
        <h1 className="text-gray-600 font-medium">
          {card.title}
        </h1>
        <p className="text-2xl font-bold text-blue-800">
          {card.value}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <ArrowUp size={16} className="text-green-500" />
          <span className="text-sm text-green-500">
            {card.growth} This month
          </span>
        </div>
      </div>
    </div>
  );
}

export default SaleOrderCart;