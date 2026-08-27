import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

function ModelBrand({ onClose,createBrand,isPending, editBrand, editingBrand = null, }) {
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //set data to input
  useEffect(() => {
    if (editingBrand) {
      setFormData({
        name: editingBrand.name || "",
        status: editingBrand.status || "active",
      });
    } else {
      setFormData({
        name: "",
        status: "active",
      });
    }
  }, [editingBrand]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingBrand) {
      await editBrand({
        id: editingBrand.id,
        data: {
          name: formData.name,
          status: formData.status,
        },
      });
    } else {
      await createBrand({
        name: formData.name,
        status: formData.status,
      });
    }

    onClose();
  } catch (error) {
    console.error(
      "Brand submit failed:",
      error.response?.data || error
    );
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-[550px] rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Add New Brand
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Create a new product brand
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg
            text-gray-500 transition
            hover:bg-red-50 hover:text-red-600 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="space-y-6 px-6 py-6">

            {/* Brand Name */}
            <div>
              <label
                htmlFor="brand-name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Brand Name
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="brand-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter brand name"
                className="
                  w-full rounded-xl border border-gray-200
                  bg-white px-4 py-3 text-sm text-gray-800
                  outline-none transition
                  placeholder:text-gray-400
                  focus:border-blue-700
                  focus:ring-2 focus:ring-blue-100
                "
                required
              />

              <p className="mt-2 text-xs text-gray-400">
                Example: Dell, HP, Lenovo, ASUS
              </p>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="brand-status"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Status
                <span className="ml-1 text-red-500">*</span>
              </label>

              <select
                id="brand-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="
                  w-full rounded-xl border border-gray-200
                  bg-white px-4 py-3 text-sm text-gray-800
                  outline-none transition cursor-pointer
                  focus:border-blue-700
                  focus:ring-2 focus:ring-blue-100
                "
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <p className="mt-2 text-xs text-gray-400">
                Inactive brands cannot be selected when creating products.
              </p>
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl border border-gray-200
                bg-white px-5 py-2.5
                text-sm font-medium text-gray-700
                transition cursor-pointer
                hover:bg-gray-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="
                rounded-xl bg-blue-800
                px-6 py-2.5
                text-sm font-semibold text-white
                shadow-sm transition
                hover:bg-blue-900
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isPending
                ? editingBrand
                  ? "Updating..."
                  : "Saving..."
                : editingBrand
                  ? "Update Brand"
                  : "Save Brand"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default ModelBrand;