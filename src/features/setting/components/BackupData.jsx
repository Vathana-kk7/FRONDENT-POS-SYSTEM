import React from 'react'
import { Download, RotateCcw } from 'lucide-react'

function BackupData() {
  return (
    <div>
      {/* ================= BACKUP ================= */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">

        <h2 className="mb-5 text-base font-bold text-gray-900">
          Backup & Data
        </h2>

        <div className="flex items-center justify-between border-b border-gray-100 py-3">
          <span className="text-sm font-semibold">
            Last Backup
          </span>

          <span className="text-xs text-gray-500">
            May 27, 2024 10:30 PM
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-100 py-3">
          <span className="text-sm font-semibold">
            Backup Frequency
          </span>

          <select className="rounded-md border border-gray-200 px-3 py-2 text-sm">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>

        <div className="flex items-center justify-between border-b border-gray-100 py-3">
          <div>
            <p className="text-sm font-semibold">
              Backup Now
            </p>

            <p className="text-xs text-gray-400">
              Create a manual backup
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-md border border-purple-500 px-3 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-50">
            <Download size={15} />
            Backup Now
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-semibold">
              Restore Data
            </p>

            <p className="text-xs text-gray-400">
              Restore from a previous backup
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-md border border-red-400 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50">
            <RotateCcw size={15} />
            Restore
          </button>
        </div>

      </div>
    </div>
  )
}

export default BackupData