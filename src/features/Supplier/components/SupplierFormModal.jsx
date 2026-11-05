import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const inputClass = "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100";

function getImageUrl(image) {
  if (!image || typeof image !== "string") return "";
  if (/^(https?:)?\/\//i.test(image) || /^(data|blob):/i.test(image)) return image;
  const backendOrigin = new URL(
    import.meta.env.VITE_API_URL || "/api",
    window.location.origin
  ).origin;
  return new URL(`/storage/${image.replace(/^\/+/, "").replace(/^storage\//i, "")}`, backendOrigin).toString();
}

export default function SupplierFormModal({ mode, supplier, onClose, onSubmit, isPending = false }) {
  const readOnly = mode === "view";
  const [khqrPreview, setKhqrPreview] = useState("");
  const [hasNewKhqr, setHasNewKhqr] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      contact_person: "",
      email: "",
      phone: "",
      address: "",
      status: "Active",
      bank_name: "",
      account_name: "",
      account_number: "",
      bakong_account_id: "",
      khqr_image: null,
    },
  });

  useEffect(() => {
    setHasNewKhqr(false);
    setKhqrPreview(getImageUrl(supplier?.khqr_image));
    reset({
      name: supplier?.name ?? "",
      contact_person: supplier?.contact_person ?? "",
      email: supplier?.email ?? "",
      phone: supplier?.phone ?? "",
      address: supplier?.address ?? "",
      status: supplier?.status ?? "Active",
      bank_name: supplier?.bank_name ?? "",
      account_name: supplier?.account_name ?? "",
      account_number: supplier?.account_number ?? "",
      bakong_account_id: supplier?.bakong_account_id ?? "",
      khqr_image: null,
    });
  }, [supplier, reset]);

  useEffect(() => () => {
    if (khqrPreview.startsWith("blob:")) URL.revokeObjectURL(khqrPreview);
  }, [khqrPreview]);

  const submit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "khqr_image") {
        const file = value?.[0];
        if (file) formData.append(key, file);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    const saved = await onSubmit(formData);
    if (saved !== false) onClose();
  };

  const title = mode === "create" ? "Add Supplier" : mode === "edit" ? "Edit Supplier" : "Supplier Details";
  const khqrImageInput = register("khqr_image", {
    validate: (files) =>
      !files?.[0] || files[0].type.startsWith("image/") || "Choose an image file.",
  });
  const fields = [
    ["name", "Supplier Name", true, "e.g. ABC Trading Co."],
    ["contact_person", "Contact Person", false, "e.g. Dara Sok"],
    ["email", "Email", false, "e.g. supplier@example.com"],
    ["phone", "Phone", true, "e.g. +855 12 345 678"],
    ["address", "Address", false, "e.g. Phnom Penh, Cambodia"],
    ["bank_name", "Bank Name", false, "e.g. ABA Bank"],
    ["account_name", "Account Name", false, "Account holder name"],
    ["account_number", "Account Number", false, "Bank account number"],
    ["bakong_account_id", "Bakong ID", false, "e.g. name@bank"],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form onSubmit={handleSubmit(submit)} className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">Supplier details and contact information</p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} disabled={isPending} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50">
            <X size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map(([name, label, required, placeholder]) => (
            <label key={name} className="text-sm font-medium text-gray-700">
              {label}{required && <span className="text-red-600"> *</span>}
              <input
                {...register(name, {
                  required: required ? `${label} is required.` : false,
                  ...(name === "email" ? { pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email." } } : {}),
                })}
                type={name === "email" ? "email" : "text"}
                placeholder={placeholder}
                readOnly={readOnly}
                disabled={isPending}
                className={inputClass}
              />
              {errors[name] && <span className="mt-1 block text-xs text-red-600">{errors[name].message}</span>}
            </label>
          ))}
          <label className="text-sm font-medium text-gray-700">
            KHQR Image
            <input
              {...khqrImageInput}
              type="file"
              accept="image/*"
              disabled={readOnly || isPending}
              onChange={(event) => {
                khqrImageInput.onChange(event);
                const file = event.target.files?.[0];
                setHasNewKhqr(Boolean(file));
                setKhqrPreview(file ? URL.createObjectURL(file) : getImageUrl(supplier?.khqr_image));
              }}
              className={inputClass}
            />
            {khqrPreview && (
              <img src={khqrPreview} alt="Supplier KHQR code" className="mt-2 h-28 w-28 rounded border object-contain" />
            )}
            {errors.khqr_image && <span className="mt-1 block text-xs text-red-600">{errors.khqr_image.message}</span>}
          </label>
          <label className="text-sm font-medium text-gray-700">
            Status
            <select {...register("status")} disabled={readOnly || isPending} className={inputClass}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={isPending} className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
            {readOnly ? "Close" : "Cancel"}
          </button>
          {!readOnly && (
            <button type="submit" disabled={isPending || (mode === "edit" && !isDirty && !hasNewKhqr)} className="rounded-lg bg-blue-800 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">
              {isPending ? "Saving..." : mode === "create" ? "Create Supplier" : "Save Changes"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
