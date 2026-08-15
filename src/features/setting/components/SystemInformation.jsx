import { Clock, Database, SettingsIcon, ShieldCheck } from 'lucide-react'
import React from 'react'

function SystemInformation() {
  return (
    <div>
         {/* ================= SYSTEM INFORMATION ================= */}
      <div className="mt-5 rounded-lg border border-gray-200 bg-white p-5">

        <h2 className="mb-4 text-base font-bold text-gray-900">
          System Information
        </h2>

        <div className="grid grid-cols-1 divide-y divide-gray-100 rounded-lg border border-gray-100 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-5">

          <div className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-700">
              <SettingsIcon size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Application Version
              </p>

              <p className="text-sm font-semibold">
                v1.2.5
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-600">
              <Database size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Database Version
              </p>

              <p className="text-sm font-semibold">
                MySQL 8.0.32
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-700">
              <span className="font-bold">php</span>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                PHP Version
              </p>

              <p className="text-sm font-semibold">
                8.2.6
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-700">
              <Clock size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Server Time
              </p>

              <p className="text-sm font-semibold">
                May 28, 2024 11:45 AM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
              <ShieldCheck size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                System Status
              </p>

              <span className="mt-1 inline-block rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
                Healthy
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SystemInformation