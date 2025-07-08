import { DataTable } from "@/components/data-table";
import { NewProduct } from "./NewProduct";
import { productColumns } from "./productColumns";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/products";

export default function ListProducts() {
  const [product, setProduct] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then((res) => {
      setProduct(res.data);
    });
  }, []);

  const handleProductCreated = (newProduct: any) => {
    setProduct((prev) => [...prev, newProduct]);
  };

  const handleProductUpdated = (updatedProduct: any) => {
    setProduct((prev) =>
      prev.map((prod) =>
        prod.id === updatedProduct.id ? updatedProduct : prod
      )
    );
  };

  const handleProductDeleted = (id: number) => {
    setProduct((prev) => prev.filter((prod) => prod.id !== id));
  };

  return (
    <DataTable
      data={product}
      columns={productColumns(handleProductUpdated, handleProductDeleted)}
      sectionName="producto"
      formModal={<NewProduct onProductCreated={handleProductCreated} />}
    />
  );
}
