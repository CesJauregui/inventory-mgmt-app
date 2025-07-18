import { DataTable } from "@/components/data-table";
import { categoryColumns } from "./CategoryColumns";

export default function ListCategories({
  category,
  onCategoryUpdated,
  onCategoryDeleted,
}: {
  category: any[];
  onCategoryUpdated: (cat: any) => void;
  onCategoryDeleted: (id: number) => void;
}) {
  return (
    <DataTable
      data={category}
      columns={categoryColumns(onCategoryUpdated, onCategoryDeleted)}
      sectionName="categoría"
      formModal={""}
      children={""}
    />
  );
}
