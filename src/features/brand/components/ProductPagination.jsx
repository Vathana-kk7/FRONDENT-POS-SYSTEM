import Pagination from "@mui/material/Pagination";

export default function ProductPagination({
  page,
  count,
  onChange,
}) {
  return (
    <div className="flex items-center justify-center">
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        shape="rounded"
        color="primary"
        
      />
    </div>
  );
}