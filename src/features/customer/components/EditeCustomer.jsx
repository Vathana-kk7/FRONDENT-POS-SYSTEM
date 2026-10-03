import { LoaderCircle, X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function EditeCustomer({
  selectedCustomer,
  onClose,
  editCustomer,
  isPending = false,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      group: "Standard",
      address: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (!selectedCustomer) return;

    reset({
      name: selectedCustomer.name || "",
      phone: selectedCustomer.phone || "",
      email: selectedCustomer.email || "",
      group: selectedCustomer.group || "Standard",
      address: selectedCustomer.address || "",
      status: selectedCustomer.status || "Active",
    });
  }, [selectedCustomer, reset]);

  const onSubmit = async (data) => {
    try {
      if (!selectedCustomer?.id) {
        throw new Error("Customer ID is required");
      }

      if (typeof editCustomer !== "function") {
        throw new Error("Customer update function is not provided.");
      }

      await editCustomer({
        id: selectedCustomer.id,
        data,
      });

      onClose();
    } catch (error) {
      if (error?.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        Object.entries(serverErrors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: Array.isArray(messages) ? messages[0] : messages,
          });
        });
      }

      console.error("Error updating customer:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[900px]">
        <div className="rounded-xl bg-white p-6 shadow-xl">
          <div className="flex items-start justify-between border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-xl font-medium text-gray-900">Edit Customer</h1>
              <p className="text-sm text-gray-500">
                Update the customer details below.
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

          <div className="space-y-4 py-5">
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

          <div className="mt-5 flex flex-col justify-between gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center">
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
              disabled={isPending || !isDirty}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending && <LoaderCircle size={16} className="animate-spin" />}
              {isPending ? "Updating..." : "Update Customer"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditeCustomer;
