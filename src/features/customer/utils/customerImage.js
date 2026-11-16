export function getCustomerImageUrl(image) {
  if (!image || typeof image !== "string") return "";
  if (/^(https?:)?\/\//i.test(image) || /^(data|blob):/i.test(image)) return image;

  const backendOrigin = new URL(
    import.meta.env.VITE_API_URL || "/api",
    window.location.origin
  ).origin;
  const path = image.replace(/^\/+/, "").replace(/^storage\//i, "");
  return new URL(`/storage/${path}`, backendOrigin).toString();
}
