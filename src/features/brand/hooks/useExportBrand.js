import { useMutation } from "@tanstack/react-query";
import BrandService from "../service/BrandService";
import { showToast } from "../../../utils/toast";

export function useExportBrand() {
    const mutation = useMutation({
        mutationFn: ({ type, filters }) =>
            BrandService.export(type, filters),

        onSuccess: async (response, variables) => {
            try {
                // 1. Create Blob
                const blob = new Blob(
                    [response.data],
                    {
                        type:
                            response.headers?.["content-type"] ||
                            "application/octet-stream",
                    }
                );

                // 2. Create download URL
                const url = window.URL.createObjectURL(blob);

                // 3. Create download link
                const link = document.createElement("a");

                link.href = url;

                link.download =
                    variables.type === "excel"
                        ? "brands.xlsx"
                        : "brands.pdf";

                document.body.appendChild(link);

                // 4. Start browser download
                link.click();

                // 5. Remove link
                link.remove();

                // 6. Release URL
                window.URL.revokeObjectURL(url);

                // 7. Wait a little before showing Toast
                await new Promise((resolve) =>
                    setTimeout(resolve, 500)
                );

                // 8. NOW show success toast
                showToast(
                    "ទាញយកទិន្នន័យ Brand ជា Excel បានជោគជ័យ!",
                    "success"
                );

            } catch (error) {
                console.error("Download Error:", error);

                showToast(
                    "មានបញ្ហាក្នុងការរក្សាទុក File!",
                    "error"
                );
            }
        },

        onError: (error) => {
            console.error("Export Brand Error:", error);

            showToast(
                error?.response?.data?.message ||
                "មានបញ្ហាក្នុងការទាញយកទិន្នន័យ!",
                "error"
            );
        },
    });

    return {
        exportBrand: mutation.mutate,
        isExporting: mutation.isPending,
    };
}