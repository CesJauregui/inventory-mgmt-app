import { DataTable } from "@/components/data-table";
import { getCategories } from "@/services/categories";
import { useEffect, useState } from "react";
import { categoryColumns } from "./CategoryColumns";

export default function ListCategories() {
  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategory(res.data);
    });
  }, []);

  const handleProductCreated = (newProduct: any) => {
    setCategory((prev) => [...prev, newProduct]);
  };

  const handleProductUpdated = (updatedProduct: any) => {
    setCategory((prev) =>
      prev.map((prod) =>
        prod.id === updatedProduct.id ? updatedProduct : prod
      )
    );
  };

  const handleProductDeleted = (id: number) => {
    setCategory((prev) => prev.filter((prod) => prod.id !== id));
  };

  return (
    <DataTable
      data={category}
      columns={categoryColumns(handleProductUpdated, handleProductDeleted)}
      sectionName="categoría"
      formModal={""}
      children={""}
    />
  );
}
