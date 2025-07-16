import { Separator } from "@/components/ui/separator";
import ListCategories from "./ListCategories";
import { NewCategory } from "./NewCategory";

export default function ProductsPage() {
  return (
    <>
      <NewCategory />
      <Separator />
      <ListCategories />
    </>
  );
}
