import { Separator } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import ListBrands from "./ListBrands";
import { NewBrand } from "./NewBrand";
import { getBrands } from "@/services/brands";

export default function BrandPage() {
  const [brand, setBrand] = useState<any[]>([]);

  useEffect(() => {
    getBrands().then((res) => {
      setBrand(res.data);
    });
  }, []);

  const handleBrandCreated = (newBrand: any) => {
    setBrand((prev) => [...prev, { ...newBrand, total: 0 }]);
  };

  const handleBrandUpdated = (updatedBrand: any) => {
    setBrand((prev) =>
      prev.map((brand) =>
        brand.id === updatedBrand.id
          ? { ...updatedBrand, total: updatedBrand.total ?? brand.total }
          : brand
      )
    );
  };

  const handleBrandDeleted = (id: number) => {
    setBrand((prev) => prev.filter((brand) => brand.id !== id));
  };

  return (
    <>
      <NewBrand onBrandCreated={handleBrandCreated} />
      <Separator />
      <ListBrands
        brand={brand}
        onBrandUpdated={handleBrandUpdated}
        onBrandDeleted={handleBrandDeleted}
      />
    </>
  );
}
