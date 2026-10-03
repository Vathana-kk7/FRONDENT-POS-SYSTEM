import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function SupplierPagination({ currentPage, lastPage, onChange, disabled = false }) {
  return (
    <Stack spacing={2} sx={{ alignItems: "center" }}>
      <Pagination
        count={lastPage}
        page={currentPage}
        onChange={onChange}
        shape="rounded"
        color="primary"
        disabled={disabled}
      />
    </Stack>
  );
}