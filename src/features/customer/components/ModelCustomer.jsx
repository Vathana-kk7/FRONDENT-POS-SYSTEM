import { X, LoaderCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

function ModelCustomer({
  onClose,
  createCustomer,
  isPending = false,
  selectedCategory = null,
}) {
  const isSelecting = Boolean(selectedCategory);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: selectedCategory?.name ?? "",
      phone: selectedCategory?.phone ?? "",
      email: selectedCategory?.email ?? "",
      group: selectedCategory?.group ?? "Standard",
      address: selectedCategory?.address ?? "",
      status: selectedCategory?.status ?? "Active",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (typeof createCustomer !== "function") {
        throw new Error("Customer submit function is not provided.");
      }

      await createCustomer(data);

      // Reset the form for Save & New.
      reset({
        name: "",
        phone: "",
        email: "",
        group: "Standard",
        address: "",
        status: "Active",
      });

      // Keep the modal open when creating a new customer.
      // Close it after a successful edit.
      if (isSelecting) {
        onClose();
      }
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  const isSubmitDisabled =
    isPending || (isSelecting && !isDirty);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[900px]"
      >
        <div className="rounded-xl bg-white p-6 shadow-xl">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-xl font-medium text-gray-900">
                {isSelecting ? "Edit Customer" : "Add New Customer"}
              </h1>

              <p className="text-sm text-gray-500">
                {isSelecting
                  ? "Update the customer details"
                  : "Enter the details of the new customer"}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              aria-label="Close modal"
              className="cursor-pointer rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Form */}
          <div className="space-y-4 py-5">
            {/* Name & Phone */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Customer Name <span className="text-red-600">*</span>
                </label>

                <input
                  {...register("name", {
                    required: "Customer name is required",
                  })}
                  disabled={isPending}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                  type="text"
                  placeholder="Enter customer name"
                />

                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Phone Number <span className="text-red-600">*</span>
                </label>

                <input
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  disabled={isPending}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                  type="text"
                  placeholder="Enter phone number"
                />

                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Group */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  {...register("email")}
                  disabled={isPending}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                  type="email"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Customer Group
                </label>

                <select
                  {...register("group")}
                  disabled={isPending}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                >
                  <option value="Standard">Standard</option>
                  <option value="VIP">VIP</option>
                  <option value="Wholesale">Wholesale</option>
                </select>
              </div>
            </div>

            {/* Address & Status */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Address
                </label>

                <input
                  {...register("address")}
                  disabled={isPending}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                  type="text"
                  placeholder="Enter street address, city, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Status
                </label>

                <select
                  {...register("status")}
                  disabled={isPending}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-5 flex flex-col justify-between gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center">
            {/* Save & New */}
            <button
              type="button"
              disabled={isPending || isSelecting}
              onClick={handleSubmit(async (data) => {
                try {
                  if (typeof createCustomer !== "function") {
                    throw new Error("Customer submit function is not provided.");
                  }

                  await createCustomer(data);

                  reset({
                    name: "",
                    phone: "",
                    email: "",
                    group: "Standard",
                    address: "",
                    status: "Active",
                  });
                } catch (error) {
                  console.error("Error creating customer:", error);
                }
              })}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending && !isSelecting && (
                <LoaderCircle size={16} className="animate-spin" />
              )}
              {isPending && !isSelecting ? "Saving..." : "Save & New"}
            </button>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending && (
                  <LoaderCircle size={16} className="animate-spin" />
                )}

                {isPending
                  ? isSelecting
                    ? "Updating..."
                    : "Saving..."
                  : isSelecting
                    ? "Update Customer"
                    : "Save Customer"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ModelCustomer;