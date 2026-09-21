import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
export default function ProductPagination({currentPage,onChange,lastPage,disabled = false,}) {
  return (
    <Stack spacing={2} sx={{ alignItems: "center"}}>
      <Pagination
        count={lastPage}
        page={currentPage}
        onChange={onChange}
        disabled={disabled}
        shape="rounded"
        color="primary"
      />
    </Stack>
  );
}