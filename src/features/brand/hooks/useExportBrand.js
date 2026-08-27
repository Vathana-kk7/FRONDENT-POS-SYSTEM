import { useMutation } from "@tanstack/react-query";
import BrandService from "../service/BrandService";

export function useExportBrand() {

    const mutation = useMutation({
        mutationFn: ({ type, filters }) =>
            BrandService.exportBrands(
                type,
                filters
            ),
    });

    return {
        exportBrand: mutation.mutateAsync,
        isExporting: mutation.isPending,
    };
}