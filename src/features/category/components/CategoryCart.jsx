
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

function CategoryCart({ card }) {
  // Safety check
  if (!card) {
    return null;
  }

  const Icon = card.icon;

  // =========================
  // Count Animation
  // =========================
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = Number(card.value) || 0;

    // If value is 0
    if (target === 0) {
      setCount(0);
      return;
    }

    const duration = 1000; // 1 second
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      // Ease-out animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      // Animation automatically stops when component unmounts
    };
  }, [card.value]);

  return (
    <div
      className="
        bg-white
        hover:scale-x-104
        transition-all
        w-full
        rounded-2xl
        border
        border-gray-200
        shadow-lg
        p-6
        flex
        items-center
        gap-5
      "
    >
      {/* Icon */}
      <div
        className={`
          w-14
          h-14
          rounded-full
          flex
          items-center
          justify-center
          ${card.color}
        `}
      >
        {Icon && (
          <Icon
            color="white"
            size={28}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h1 className="text-gray-600 font-medium">
          {card.title}
        </h1>

        {/* Animated Number */}
        <p className="text-2xl font-bold text-blue-800">
          {count}
        </p>

        <div className="flex items-center gap-1 mt-1">
          <ArrowUp
            size={16}
            className="text-green-500"
          />

          <span className="text-sm text-green-500">
            {card.growth} This month
          </span>
        </div>
      </div>
    </div>
  );
}

export default CategoryCart;
