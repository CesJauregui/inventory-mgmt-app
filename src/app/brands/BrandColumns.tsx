import { type ColumnDef } from "@tanstack/react-table";
import { type GenericItem } from "@/components/data-table";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

import React from "react";
import { AlertCircle, PencilIcon, Trash2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EditBrand from "./EditBrand";
import { deleteBrand } from "@/services/brands";

function EditBrandDrawer({
  item,
  trigger,
  handleBrandUpdated,
}: {
  item: any;
  trigger: React.ReactNode;
  handleBrandUpdated: (Brand: any) => void;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <span className="text-start w-full" onClick={() => setOpen(true)}>
        {trigger}
      </span>
      {open && (
        <EditBrand
          item={item}
          open={open}
          setOpen={setOpen}
          onBrandUpdated={handleBrandUpdated}
        />
      )}
    </>
  );
}

export function brandColumns(
  handleBrandUpdated: (brand: any) => void,
  handleBrandDeleted: (id: number) => void
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
      header: "Código Marca",
      cell: ({ row }) => "BRN_" + row.original.id,
    },
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "products",
      header: "Cantidad de productos",
      cell: ({ row }) => row.original.total,
    },
    {
      id: "actions",
      header: () => (
        <Tooltip>
          <div className="flex flex-row items-center gap-3">
            <span>Acciones</span>
            <TooltipTrigger asChild>
              <AlertCircle className="cursor-pointer" size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <span>Marca con productos asociados no se puede eliminar.</span>
            </TooltipContent>
          </div>
        </Tooltip>
      ),
      cell: ({ row }) => (
        <div className="flex gap-2">
          <div>
            <EditBrandDrawer
              item={row.original}
              trigger={
                <Button variant="default" className="text-start">
                  <PencilIcon />
                </Button>
              }
              handleBrandUpdated={handleBrandUpdated}
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            disabled={row.original.total >= 1}
            onClick={() => {
              if (row.original.total >= 1) {
                alert(
                  "La marca está asignado a " +
                    row.original.total +
                    " producto(s)."
                );
              } else {
                deleteBrand(row.original.id);
                handleBrandDeleted(row.original.id);
              }
            }}
          >
            <Trash2Icon />
          </Button>
        </div>
      ),
    },
  ];
}
