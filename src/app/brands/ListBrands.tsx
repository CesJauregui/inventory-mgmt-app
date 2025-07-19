import { DataTable } from "@/components/data-table";
import { brandColumns } from "./BrandColumns";

export default function ListBrands({
  brand,
  onBrandUpdated,
  onBrandDeleted,
}: {
  brand: any[];
  onBrandUpdated: (brand: any) => void;
  onBrandDeleted: (id: any) => void;
}) {
  return (
    <DataTable
      data={brand}
      columns={brandColumns(onBrandUpdated, onBrandDeleted)}
      sectionName="marca"
      formModal={""}
      children={""}
    />
  );
}
