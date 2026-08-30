import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function CategoryPagination({currentPage,lastPage,onChange}) {
  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={lastPage}
        page={currentPage}
        onChange={onChange}
        shape="rounded"
        color="primary"
      />
    </Stack>
  );
}