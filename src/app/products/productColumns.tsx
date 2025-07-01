import { type ColumnDef } from "@tanstack/react-table";
import { type GenericItem } from "@/components/data-table";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

import EditProduct from "./EditProduct";
import React from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";

function EditProductDrawer({
  item,
  trigger,
}: {
  item: any;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <span className="text-start w-full" onClick={() => setOpen(true)}>
        {trigger}
      </span>
      {open && <EditProduct item={item} open={open} setOpen={setOpen} />}
    </>
  );
}
export const productColumns: ColumnDef<GenericItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
          />
        </div>
        <Button variant="destructive">
          <Trash2Icon />
        </Button>
      </div>
    ),
  },
];
