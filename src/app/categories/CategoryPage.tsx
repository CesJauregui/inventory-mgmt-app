import { Separator } from "@/components/ui/separator";
import ListCategories from "./ListCategories";
import { NewCategory } from "./NewCategory";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/categories";

export default function CategoryPage() {
  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategory(res.data);
    });
  }, []);

  const handleCategoryCreated = (newCategory: any) => {
    setCategory((prev) => [...prev, { ...newCategory, total: 0 }]);
  };

  const handleCategoryUpdated = (updatedCategory: any) => {
    setCategory((prev) =>
      prev.map((cat) =>
        cat.id === updatedCategory.id
          ? { ...updatedCategory, total: updatedCategory.total ?? cat.total }
          : cat
      )
    );
  };

  const handleCategoryDeleted = (id: number) => {
    setCategory((prev) => prev.filter((cat) => cat.id !== id));
  };
  return (
    <>
      <NewCategory onCategoryCreated={handleCategoryCreated} />
      <Separator />
      <ListCategories
        category={category}
        onCategoryUpdated={handleCategoryUpdated}
        onCategoryDeleted={handleCategoryDeleted}
      />
    </>
  );
}
