import { type ColumnDef } from "@tanstack/react-table";
import { type GenericItem } from "@/components/data-table";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

import EditProduct from "./EditProduct";
import React from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { deleteProduct } from "@/services/products";

function EditProductDrawer({
  item,
  trigger,
  handleProductUpdated,
}: {
  item: any;
  trigger: React.ReactNode;
  handleProductUpdated: (product: any) => void;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <span className="text-start w-full" onClick={() => setOpen(true)}>
        {trigger}
      </span>
      {open && (
        <EditProduct
          item={item}
          open={open}
          setOpen={setOpen}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </>
  );
}

export function productColumns(
  handleProductUpdated: (product: any) => void,
  handleProductDeleted: (id: number) => void
): ColumnDef<GenericItem>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "codeSKU",
      header: "Código SKU",
      cell: ({ row }) => row.original.codeSKU,
    },
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "price",
      header: "Precio",
      cell: ({ row }) => `$${row.original.price}`,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => row.original.stock,
    },
    {
      accessorKey: "category",
      header: "Categoría",
      cell: ({ row }) => row.original.category,
    },
    {
      accessorKey: "brand",
      header: "Marca",
      cell: ({ row }) => row.original.brand,
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <div>
            <EditProductDrawer
              item={row.original}
              trigger={
                <Button variant="default" className="text-start">
                  <PencilIcon />
                </Button>
              }
              handleProductUpdated={handleProductUpdated}
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              deleteProduct(row.original.id);
              handleProductDeleted(row.original.id);
            }}
          >
            <Trash2Icon />
          </Button>
        </div>
      ),
    },
  ];
}
