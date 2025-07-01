import { DataTable } from "@/components/data-table";
import data from "../../assets/data.json";
import { NewProduct } from "./NewProduct";
import { productColumns } from "./productColumns";

export default function ListProducts() {
  return (
    <DataTable
      data={data}
      columns={productColumns}
      sectionName="producto"
      formModal={<NewProduct />}
    />
  );
}
