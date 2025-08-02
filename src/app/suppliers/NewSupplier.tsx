"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupplier } from "@/services/suppliers";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
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

type Supplier = z.infer<typeof formSchema>;

interface NewSupplierProps {
  onSupplierCreated: (supplier: Supplier) => void;
}

export function NewSupplier({ onSupplierCreated }: NewSupplierProps) {
  const form = useForm<Supplier>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ruc: "",
      contact: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      country: "",
      paymentTerms: "",
      note: "",
      active: true,
    },
  });

  function onSubmit(values: Supplier) {
    try {
      createSupplier(values).then((res) => {
        onSupplierCreated(res.data ?? values);
      });
      alert("Proveedor creado correctamente");
      form.reset();
    } catch (error) {
      console.error("Error al crear proveedor", error);
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <div className="flex flex-col gap-3">
                <Label htmlFor="note">Notas</Label>
                <Textarea id="note" className="resize-none" {...field} />
              </div>
            )}
          />
        </div>
        <Button type="submit">Registrar</Button>
      </form>
    </Form>
  );
}
