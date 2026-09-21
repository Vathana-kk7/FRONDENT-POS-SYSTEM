import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

function ProductCart({ card }) {
  // =========================================================
  // Safety Check
  // =========================================================

  if (!card) {
    return null;
  }

  // =========================================================
  // Icon
  // =========================================================

  const Icon = card.icon;

  // =========================================================
  // Count Animation
  // =========================================================

  const [count, setCount] = useState(0);

  // =========================================================
  // Check Total Value Card
  // =========================================================

const isTotalValue = card.key === "total_value";

  // =========================================================
  // Number Animation
  // =========================================================

  useEffect(() => {
    // Total Value doesn't use number animation
    if (isTotalValue) {
      return;
    }

    const target =
      Number(card.value) || 0;

    // Reset if target is zero
    if (target === 0) {
      setCount(0);
      return;
    }

    const duration = 1000;
    const startTime = performance.now();

    let animationFrame;

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      // Ease Out
      const easeOut =
        1 - Math.pow(1 - progress, 3);

      setCount(
        Math.floor(easeOut * target)
      );

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };

  }, [card.value, isTotalValue]);
  return (
    <div
      className="
        bg-white
        hover:scale-105
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
        select-none
      "
    >

      {/* =====================================================
          ICON
      ===================================================== */}

      <div
        className={`
          w-14
          h-14
          rounded-full
          flex
          items-center
          justify-center
          shrink-0
          ${card.color}
        `}
      >
        <Icon
          color="white"
          size={28}
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="flex-1 min-w-0">

        {/* Title */}

        <h1 className="text-gray-600 font-medium">
          {card.title}
        </h1>

        {/* Value */}

        <p className="text-2xl font-bold text-blue-800">

          {isTotalValue
            ? `$${Number(
                card.value || 0
              ).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            : count}

        </p>

        {/* Growth */}

        <div className="flex items-center gap-1 mt-1">

          <ArrowUp
            size={16}
            className="text-green-500"
          />

          <span className="text-sm text-green-500">
            {card.growth ?? "0%"} This month
          </span>

        </div>

      </div>
    </div>
  );
}

export default ProductCart;