import { CalendarDays, ChevronDown } from 'lucide-react'
import React from 'react'

function GeneralSettings() {
  return (
    <div>{/* ================= GENERAL SETTINGS ================= */}
          <div className="rounded-lg border border-gray-200 bg-white p-5">

            <h2 className="mb-5 text-base font-bold text-gray-900">
              General Settings
            </h2>

            {/* Store Name */}
            <div className="mb-4">
              <label className="mb-2 block text-xs font-semibold">
                Store Name
              </label>

              <input
                type="text"
                defaultValue="Top Most Systems Ltd"
                className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none transition-all focus:border-purple-500"
              />
            </div>

            {/* Currency */}
            <div className="mb-4">
              <label className="mb-2 block text-xs font-semibold">
                Currency
              </label>

              <div className="relative">
                <select className="h-10 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:border-purple-500">
                  <option>USD - US Dollar</option>
                  <option>KHR - Cambodian Riel</option>
                  <option>EUR - Euro</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-3 text-gray-500"
                />
              </div>
            </div>

            {/* Date / Time */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Date Format
                </label>

                <div className="relative">
                  <input
                    type="text"
                    defaultValue="May 28, 2024 (Wed)"
                    className="h-10 w-full rounded-md border border-gray-200 px-3 pr-9 text-sm outline-none focus:border-purple-500"
                  />

                  <CalendarDays
                    size={16}
                    className="absolute right-3 top-3 text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Time Format
                </label>

                <div className="relative">
                  <select className="h-10 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:border-purple-500">
                    <option>12 Hour (02:30 PM)</option>
                    <option>24 Hour (14:30)</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-3 text-gray-500"
                  />
                </div>
              </div>

            </div>

            {/* Language / Timezone */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Language
                </label>

                <select className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:border-purple-500">
                  <option>English</option>
                  <option>Khmer</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Timezone
                </label>

                <select className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:border-purple-500">
                  <option>(UTC+01:00) West Africa Time</option>
                  <option>(UTC+07:00) Bangkok, Hanoi, Phnom Penh</option>
                </select>
              </div>

            </div>
          </div></div>
  )
}

export default GeneralSettings