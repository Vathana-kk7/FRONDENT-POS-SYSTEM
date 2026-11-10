import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function SaleOrderPagination({ count = 1, page = 1, disabled = false, onChange }) {
  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={count}
        page={page}
        shape="rounded"
        color="primary"
        disabled={disabled}
        onChange={onChange}
      />
    </Stack>
  );
}