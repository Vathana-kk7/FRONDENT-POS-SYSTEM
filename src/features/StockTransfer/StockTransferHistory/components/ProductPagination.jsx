import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function ProductPagination({ page = 1, count = 1, onChange }) {
  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={Math.max(1, count)}
        page={page}
        onChange={(_, value) => onChange?.(value)}
        shape="rounded"
        color="primary"
      />
    </Stack>
  );
}