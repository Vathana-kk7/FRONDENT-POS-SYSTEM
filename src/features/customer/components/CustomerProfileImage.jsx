import { ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getCustomerImageUrl } from "../utils/customerImage";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp"];

export default function CustomerProfileImage({
  image,
  file,
  onChange,
  disabled = false,
}) {
  const inputRef = useRef(null);
  const [filePreview, setFilePreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setFilePreview("");
      setError("");
      if (inputRef.current) inputRef.current.value = "";
      return undefined;
    }

    const previewUrl = URL.createObjectURL(file);
    setFilePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [file]);
  const preview = filePreview || getCustomerImageUrl(image);

  return (
    <div className="flex items-center gap-4">
      {preview ? (
        <img
          src={preview}
          alt="Customer profile"
          className="h-16 w-16 rounded-full border border-gray-200 object-cover"
          onError={(event) => { event.currentTarget.src = "/Images/people.png"; }}
        />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <ImagePlus size={24} />
        </div>
      )}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Profile Photo
        </label>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/bmp"
          disabled={disabled}
          onChange={(event) => {
            const selectedFile = event.target.files?.[0] ?? null;
            if (selectedFile && !ALLOWED_IMAGE_TYPES.includes(selectedFile.type)) {
              setError("Choose a JPEG, PNG, WebP, GIF, or BMP image.");
              event.target.value = "";
              return;
            }
            if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
              setError("The image must be 5 MB or smaller.");
              event.target.value = "";
              return;
            }
            setError("");
            onChange(selectedFile);
          }}
          className="mt-1 block w-full max-w-xs text-xs text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-medium file:text-blue-800 hover:file:bg-blue-100 disabled:opacity-50"
        />
        {error && <p role="alert" className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
