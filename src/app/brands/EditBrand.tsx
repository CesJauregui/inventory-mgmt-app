"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { updateBrand } from "@/services/brands";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
  name: z.string(),
});
type Brand = z.infer<typeof schema>;

interface EditBrandProps {
  item: Brand;
  open: boolean;
  setOpen: (open: boolean) => void;
  onBrandUpdated: (brand: Brand) => void;
}

export default function EditBrand({
  item,
  open,
  setOpen,
  onBrandUpdated,
}: EditBrandProps) {
  const isMobile = useIsMobile();

  //1. Define your form.
  const form = useForm<Brand>({
    resolver: zodResolver(schema),
    defaultValues: item,
  });

  function onSubmit(values: Brand) {
    try {
      updateBrand(values.id, values).then((res) => {
        onBrandUpdated(res.data ?? values);
        console.log(res.data);
      });
      alert("Marca actualizada correctamente");
      setOpen(false);
    } catch (error) {
      console.error("Error al crear la marca", error);
    }
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <DrawerHeader className="gap-1">
                <DrawerTitle className="text-lg font-bold">
                  Editar Marca
                </DrawerTitle>
                <DrawerDescription className="sr-only"></DrawerDescription>
              </DrawerHeader>
              <Separator />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" {...field} />
                  </div>
                )}
              />

              <DrawerFooter>
                <Button type="submit">Guardar</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
