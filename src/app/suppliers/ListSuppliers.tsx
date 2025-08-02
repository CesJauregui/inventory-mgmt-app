import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { getSuppliers } from "@/services/suppliers";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { supplierColumns } from "./supplierColumns";
import { NewSupplier } from "./NewSupplier";

export default function ListSuppliers() {
  const [supplier, setSupplier] = useState<any[]>([]);
  useEffect(() => {
    getSuppliers().then((res) => {
      setSupplier(res.data);
    });
  }, []);

  const handleSupplierCreated = async (newSupplier: any) => {
    setSupplier([...supplier, newSupplier]);
  };

  const handleSupplierUpdated = async (updatedSupplier: any) => {
    setSupplier((prev) =>
      prev.map((supp) =>
        supp.id === updatedSupplier.id ? updatedSupplier : supp
      )
    );
  };

  const handleSupplierDeleted = async (id: number) => {
    setSupplier((prev) => prev.filter((supp: any) => supp.id !== id));
  };

  return (
    <DataTable
      data={supplier}
      columns={supplierColumns(handleSupplierUpdated, handleSupplierDeleted)}
      sectionName="proveedor"
      formModal={<NewSupplier onSupplierCreated={handleSupplierCreated} />}
      children={
        <Button variant="outline" size="sm">
          <IconPlus />
          <span className="hidden lg:inline">Agregar proveedor</span>
        </Button>
      }
    />
  );
}
