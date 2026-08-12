import React from "react";
import { Check } from "lucide-react";

function ApproveCart() {
  const approvalSteps = [
    {
      title: "Requested",
      date: "May 28, 2024 09:15 AM",
      user: "Segun Oloto",
      completed: true,
    },
    {
      title: "Submitted",
      date: "May 28, 2024 09:20 AM",
      user: "Segun Oloto",
      completed: true,
    },
    {
      title: "Approved",
      date: "May 28, 2024 10:30 AM",
      user: "John Michael",
      completed: true,
    },
    {
      title: "Transferred",
      date: "Pending",
      user: "",
      completed: false,
    },
    {
      title: "Received",
      date: "Pending",
      user: "",
      completed: false,
    },
  ];

  return (
    <div className="w-[500px] rounded-lg border h-auto border-gray-200 bg-white p-5 mt-5 shadow-sm hover:scale-x-104 transition-all">
      {/* Title */}
      <h2 className="mb-5 text-sm font-semibold text-gray-800">
        Approval Information
      </h2>

      {/* Timeline */}
      <div className="relative">
        {approvalSteps.map((step, index) => (
          <div key={step.title} className="relative flex ">
            
            {/* Vertical line */}
            {index !== approvalSteps.length - 1 && (
              <div
                className={`absolute left-[10px] top-[20px] h-[48px] w-[1px] ${
                  step.completed
                    ? "bg-green-400"
                    : "bg-gray-300"
                }`}
              />
            )}

            {/* Circle */}
            <div className="relative z-10 flex w-6 shrink-0 justify-center">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  step.completed
                    ? "border-green-500 bg-green-500"
                    : "border-gray-400 bg-white"
                }`}
              >
                {step.completed && (
                  <Check
                    size={12}
                    strokeWidth={3}
                    className="text-white"
                  />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="ml-3 flex flex-1 justify-between pb-4">
              <div>
                <p className="text-xs font-semibold text-gray-800">
                  {step.title}
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  {step.date}
                </p>
              </div>

              {step.user && (
                <p className="text-[11px] font-semibold text-indigo-900">
                  {step.user}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApproveCart;