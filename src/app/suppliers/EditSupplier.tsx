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
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { updateSupplier } from "@/services/suppliers";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
  name: z.string(),
  ruc: z.string(),
  contact: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  paymentTerms: z.string(),
  note: z.string(),
  active: z.boolean(),
});
type Supplier = z.infer<typeof schema>;

interface EditSupplierProps {
  item: Supplier;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSupplierUpdated: (supplier: Supplier) => void;
}

export default function EditSupplier({
  item,
  open,
  setOpen,
  onSupplierUpdated,
}: EditSupplierProps) {
  const isMobile = useIsMobile();

  const form = useForm<Supplier>({
    resolver: zodResolver(schema),
    defaultValues: { ...item },
  });

  React.useEffect(() => {
    form.reset(item);
  }, [item]);

  function onSubmit(values: Supplier) {
    try {
      updateSupplier(values.id, values).then((res) => {
        onSupplierUpdated(res.data ?? values);
        console.log(res.data);
      });
      alert("Proveedor actualizado correctamente");
      setOpen(false);
    } catch (error) {
      console.error("Error al crear el proveedor", error);
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
                  Editar Proveedor
                </DrawerTitle>
                <DrawerDescription className="sr-only" />
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

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="ruc"
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="ruc">RUC</Label>
                      <Input id="ruc" {...field} />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="contact">Contacto</Label>
                      <Input id="contact" {...field} />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" type="tel" {...field} />
                    </div>
                  )}
                />
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...field} />
                      </div>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="address">Dirección</Label>
                        <Input id="address" {...field} />
                      </div>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" {...field} />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="country">País</Label>
                      <Input id="country" {...field} />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="paymentTerms">Término de pago</Label>
                      <Input id="paymentTerms" {...field} />
                    </div>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="note">Notas</Label>
                    <Textarea id="note" {...field} />
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
