import { useState } from "react";
import { X } from "lucide-react";

const specSuggestions = {
  cpu: ["I3", "I5", "I7"],
  ram: ["4G", "8G", "16G"],
  storage: ["SSD-128", "SSD-256", "SSD-512"],
};

export default function EditOrderSpecsModal({ order, isPending, error, onClose, onSubmit }) {
  const [cpuGen, setCpuGen] = useState(order.cpu_gen ?? "");
  const [ram, setRam] = useState(order.ram ?? "");
  const [storage, setStorage] = useState(order.storage ?? "");

  function submit(event) {
    event.preventDefault();
    onSubmit({
      cpu_gen: cpuGen.trim() || null,
      ram: ram.trim() || null,
      storage: storage.trim() || null,
    });
  }

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <form onSubmit={submit} role="dialog" aria-modal="true" aria-labelledby="edit-order-specs-title" className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 id="edit-order-specs-title" className="font-semibold text-gray-900">Edit computer specs</h2>
            <p className="mt-1 text-sm text-gray-500">Order #{order.id} · {order.customer?.name ?? order.customer_name ?? "Customer"}</p>
          </div>
          <button type="button" onClick={onClose} disabled={isPending} aria-label="Close" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"><X size={19} /></button>
        </header>
        <div className="grid gap-4 p-5 sm:grid-cols-3">
          <div>
            <label htmlFor="edit-order-cpu" className="mb-1 block text-sm font-medium text-gray-700">CPU / Generation</label>
            <input id="edit-order-cpu" list="edit-order-cpu-options" maxLength="50" value={cpuGen} onChange={(event) => setCpuGen(event.target.value)} disabled={isPending} placeholder="I5-3" className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm" />
            <datalist id="edit-order-cpu-options">{specSuggestions.cpu.map((value) => <option key={value} value={value} />)}</datalist>
          </div>
          <div>
            <label htmlFor="edit-order-ram" className="mb-1 block text-sm font-medium text-gray-700">RAM</label>
            <input id="edit-order-ram" list="edit-order-ram-options" maxLength="50" value={ram} onChange={(event) => setRam(event.target.value)} disabled={isPending} placeholder="8G" className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm" />
            <datalist id="edit-order-ram-options">{specSuggestions.ram.map((value) => <option key={value} value={value} />)}</datalist>
          </div>
          <div>
            <label htmlFor="edit-order-storage" className="mb-1 block text-sm font-medium text-gray-700">Storage</label>
            <input id="edit-order-storage" list="edit-order-storage-options" maxLength="50" value={storage} onChange={(event) => setStorage(event.target.value)} disabled={isPending} placeholder="SSD-128" className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm" />
            <datalist id="edit-order-storage-options">{specSuggestions.storage.map((value) => <option key={value} value={value} />)}</datalist>
          </div>
          {error && <p role="alert" className="text-sm text-red-600 sm:col-span-3">{error}</p>}
        </div>
        <footer className="flex justify-end gap-3 border-t border-gray-200 px-5 py-4">
          <button type="button" onClick={onClose} disabled={isPending} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 disabled:opacity-50">Close</button>
          <button type="submit" disabled={isPending} className="rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900 disabled:opacity-50">{isPending ? "Saving..." : "Save specs"}</button>
        </footer>
      </form>
    </div>
  );
}
