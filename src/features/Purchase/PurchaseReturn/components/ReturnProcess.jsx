import React from "react";
import { Check } from "lucide-react";

function ReturnProcess() {
  const steps = [
    {
      title: "Return Created",
      date: "May 31, 2024 10:30 AM",
      completed: true,
    },
    {
      title: "Submitted",
      date: "May 31, 2024 10:45 AM",
      completed: true,
    },
    {
      title: "Approved",
      date: "May 31, 2024 11:15 AM",
      completed: true,
    },
    {
      title: "Refunded",
      date: "Pending",
      completed: false,
    },
  ];

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Title */}
      <h2 className="mb-4 text-sm font-semibold text-gray-800">
        Return Process
      </h2>

      {/* Process */}
      <div className="flex items-start w-full">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            {/* Step */}
            <div className="flex items-start gap-2 min-w-fit">
              {/* Circle */}
              {step.completed ? (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                  <Check size={16} strokeWidth={3} />
                </div>
              ) : (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-gray-400 bg-white" />
              )}

              {/* Text */}
              <div className="pt-0.5">
                <p className="text-[11px] font-semibold text-gray-700">
                  {step.title}
                </p>

                <p
                  className={`text-[9px] ${
                    step.completed
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  {step.date}
                </p>
              </div>
            </div>

            {/* Line */}
            {index < steps.length - 1 && (
              <div
                className={`mt-3 mx-4 h-[1px] flex-1 min-w-[50px] ${
                  steps[index + 1].completed
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ReturnProcess;