import React, { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function DatePicker({
  value = null,
  onChange,
  placeholder = "Select date",
}) {
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : new Date()
  );

  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date()
  );

  const [isOpen, setIsOpen] = useState(false);

  const pickerRef = useRef(null);

  // Close when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Format date
  const formatDate = (date) => {
    if (!date) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // Get calendar days
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const previousMonthDays = new Date(
      year,
      month,
      0
    ).getDate();

    const days = [];

    // Previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: previousMonthDays - i,
        currentMonth: false,
      });
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        currentMonth: true,
      });
    }

    // Next month
    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        day: nextDay++,
        currentMonth: false,
      });
    }

    return days;
  };

  // Change month
  const changeMonth = (amount) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + amount,
        1
      )
    );
  };

  // Select date
  const handleSelectDate = (day, currentMonthDay) => {
    if (!currentMonthDay) return;

    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    setSelectedDate(date);

    if (onChange) {
      onChange(date);
    }

    setIsOpen(false);
  };

  // Today
  const handleToday = () => {
    const today = new Date();

    setSelectedDate(today);
    setCurrentMonth(today);

    if (onChange) {
      onChange(today);
    }

    setIsOpen(false);
  };

  // Clear
  const handleClear = () => {
    setSelectedDate(null);

    if (onChange) {
      onChange(null);
    }

    setIsOpen(false);
  };

  // Check selected
  const isSelected = (day) => {
    if (!selectedDate) return false;

    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() ===
        currentMonth.getMonth() &&
      selectedDate.getFullYear() ===
        currentMonth.getFullYear()
    );
  };

  return (
    <div
      ref={pickerRef}
      className="relative w-[260px]"
    >
      {/* Input */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full
          h-10
          px-4
          flex
          items-center
          justify-between
          rounded-full
          border
          border-gray-300
          bg-white
          text-sm
          hover:border-gray-400
          transition
          cursor-pointer
        "
      >
        <div className="flex items-center gap-3">
          <CalendarDays
            size={17}
            className="text-gray-700"
          />
            Today:
          <span
            className={
              selectedDate
                ? "text-gray-900"
                : "text-gray-400"
            }
          >
            {selectedDate
              ? formatDate(selectedDate)
              : placeholder}
          </span>
        </div>

        {isOpen ? (
          <ChevronUp size={17} />
        ) : (
          <ChevronDown size={17} />
        )}
      </button>

      {/* Calendar */}
      {isOpen && (
        <div
          className="
            absolute
            left-0
            top-12
            z-50
            w-[260px]
            rounded-xl
            border
            border-blue-100
            bg-white
            shadow-xl
            p-3
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                hover:bg-gray-100
                cursor-pointer
              "
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">
                {String(
                  currentMonth.getMonth() + 1
                ).padStart(2, "0")}
                /
                {currentMonth.getFullYear()}
              </span>
            </div>

            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                hover:bg-gray-100
                cursor-pointer
              "
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Month title */}
          <div className="mt-2 px-2">
            <p className="text-sm font-semibold">
              {monthNames[currentMonth.getMonth()]}{" "}
              {currentMonth.getFullYear()}
            </p>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 mt-3">
            {[
              "Su",
              "Mo",
              "Tu",
              "We",
              "Th",
              "Fr",
              "Sa",
            ].map((day) => (
              <div
                key={day}
                className="
                  h-7
                  flex
                  items-center
                  justify-center
                  text-xs
                  font-medium
                  text-gray-700
                "
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7">
            {getCalendarDays().map((item, index) => (
              <button
                key={index}
                type="button"
                disabled={!item.currentMonth}
                onClick={() =>
                  handleSelectDate(
                    item.day,
                    item.currentMonth
                  )
                }
                className={`
                  h-8
                  w-8
                  mx-auto
                  my-[1px]
                  flex
                  items-center
                  justify-center
                  rounded-md
                  text-xs
                  transition

                  ${
                    !item.currentMonth
                      ? "text-gray-300 cursor-default"
                      : "text-gray-800 hover:bg-blue-50 cursor-pointer"
                  }

                  ${
                    isSelected(item.day)
                      ? "bg-gray-700 text-white hover:bg-gray-700"
                      : ""
                  }
                `}
              >
                {item.day}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 px-2">
            <button
              type="button"
              onClick={handleClear}
              className="
                text-xs
                text-blue-600
                hover:text-blue-800
                cursor-pointer
              "
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleToday}
              className="
                text-xs
                text-blue-600
                hover:text-blue-800
                cursor-pointer
              "
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;