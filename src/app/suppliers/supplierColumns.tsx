import { type ColumnDef } from "@tanstack/react-table";
import { type GenericItem } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { deleteSupplier } from "@/services/suppliers";
import EditSupplier from "./EditSupplier";

function EditSupplierDrawer({
  item,
  trigger,
  handleSupplierUpdated,
}: {
  item: any;
  trigger: React.ReactNode;
  handleSupplierUpdated: (supplier: any) => void;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <span className="text-start w-full" onClick={() => setOpen(true)}>
        {trigger}
      </span>
      {open && (
        <EditSupplier
          item={item}
          open={open}
          setOpen={setOpen}
          onSupplierUpdated={handleSupplierUpdated}
        />
      )}
    </>
  );
}

export function supplierColumns(
  handleSupplierUpdated: (supplier: any) => void,
  handleSupplierDeleted: (id: number) => void
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
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "ruc",
      header: "RUC",
      cell: ({ row }) => row.original.ruc,
    },
    {
      accessorKey: "phone",
      header: "Teléfono",
      cell: ({ row }) => row.original.phone,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email,
    },
    {
      accessorKey: "paymentTerms",
      header: "Término de pago",
      cell: ({ row }) => row.original.paymentTerms,
    },
    {
      accessorKey: "active",
      header: "Estado",
      cell: ({ row }) =>
        row.original.active == true ? "Habilitado" : "Deshabilitado",
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <div>
            <EditSupplierDrawer
              item={row.original}
              trigger={
                <Button variant="default" className="text-start">
                  <PencilIcon />
                </Button>
              }
              handleSupplierUpdated={handleSupplierUpdated}
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              deleteSupplier(row.original.id);
              handleSupplierDeleted(row.original.id);
            }}
          >
            <Trash2Icon />
          </Button>
        </div>
      ),
    },
  ];
}
