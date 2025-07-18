"use client";

import React, { useEffect, useState } from "react";

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const today = new Date();
  const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const startDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(year, month, i));
  }

  const isPast = (date: Date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return d < todayZero;
  };

  const isToday = (date: Date) => date.toDateString() === todayZero.toDateString();

  const handleSelectDate = (date: Date) => {
    if (!isPast(date)) setSelectedDate(date);
  };

  const prevMonth = () => {
    if (year < today.getFullYear() || (year === today.getFullYear() && month <= today.getMonth())) return;
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={prevMonth}
          disabled={year < today.getFullYear() || (year === today.getFullYear() && month === today.getMonth())}
          className="text-xl font-bold px-3 py-1 rounded hover:bg-gray-100 text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed"
        >←</button>
        <div className="text-xl font-bold text-blue-600">{monthNames[month]} {year}</div>
        <button
          onClick={nextMonth}
          className="text-xl font-bold px-3 py-1 rounded text-blue-600 hover:bg-gray-100"
        >→</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-4">
        {dayNames.map((day) => (
          <div key={day} className="text-sm font-semibold text-gray-500 py-2">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} className="h-10" />
        ))}
        {dates.map((date) => {
          const past = isPast(date);
          const todayFlag = isToday(date);
          const selected = selectedDate && date.toDateString() === selectedDate.toDateString();
          return (
            <button
              key={date.toISOString()}
              disabled={past}
              onClick={() => handleSelectDate(date)}
              className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition relative
                ${todayFlag ? "bg-red-500 text-white" : ""}
                ${past ? "text-gray-300 cursor-not-allowed" : "hover:bg-blue-50 cursor-pointer"}
                ${selected ? "bg-blue-600 text-white" : ""}
                ${!selected && !todayFlag && !past ? "text-gray-700" : ""}`}
            >{date.getDate()}</button>
          );
        })}
      </div>
    </div>
  );
}
