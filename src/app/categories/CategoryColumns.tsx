import { type ColumnDef } from "@tanstack/react-table";
import { type GenericItem } from "@/components/data-table";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

import React from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { deleteCategory } from "@/services/categories";
import EditCategory from "./EditCategory";

function EditCategoryDrawer({
  item,
  trigger,
  handleCategoryUpdated,
}: {
  item: any;
  trigger: React.ReactNode;
  handleCategoryUpdated: (category: any) => void;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <span className="text-start w-full" onClick={() => setOpen(true)}>
        {trigger}
      </span>
      {open && (
        <EditCategory
          item={item}
          open={open}
          setOpen={setOpen}
          onCategoryUpdated={handleCategoryUpdated}
        />
      )}
    </>
  );
}

export function categoryColumns(
  handleCategoryUpdated: (category: any) => void,
  handleCategoryDeleted: (id: number) => void
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
      accessorKey: "id",
      header: "Código Categoría",
      cell: ({ row }) => "CAT_" + row.original.id,
    },
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "products",
      header: "Cantidad de productos",
      cell: ({ row }) => row.original.products,
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <div>
            <EditCategoryDrawer
              item={row.original}
              trigger={
                <Button variant="default" className="text-start">
                  <PencilIcon />
                </Button>
              }
              handleCategoryUpdated={handleCategoryUpdated}
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              deleteCategory(row.original.id);
              handleCategoryDeleted(row.original.id);
            }}
          >
            <Trash2Icon />
          </Button>
        </div>
      ),
    },
  ];
}
