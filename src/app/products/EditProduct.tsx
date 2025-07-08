"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { updateProduct } from "@/services/products";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  category: z.string(),
  image: z.string(),
});
type Product = z.infer<typeof schema>;

interface EditProductProps {
  item: Product;
  open: boolean;
  setOpen: (open: boolean) => void;
  onProductUpdated: (product: Product) => void;
}

export default function EditProduct({
  item,
  open,
  setOpen,
  onProductUpdated,
}: EditProductProps) {
  const isMobile = useIsMobile();

  //1. Define your form.
  const form = useForm<Product>({
    resolver: zodResolver(schema),
    defaultValues: item,
  });

  React.useEffect(() => {
    form.reset(item);
  }, [item]);

  function onSubmit(values: Product) {
    try {
      updateProduct(values.id, values).then((res) => {
        onProductUpdated(res.data ?? values);
        console.log(res.data);
      });
      alert("Producto actualizado correctamente");
      setOpen(false);
    } catch (error) {
      console.error("Error al crear producto", error);
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
                  Editar Producto
                </DrawerTitle>
                <DrawerDescription>
                  Modificar información del producto
                </DrawerDescription>
                <Avatar className="w-[200px] h-auto m-auto rounded-full">
                  <AvatarImage className="" src={item.image} />
                </Avatar>
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea id="description" {...field} />
                  </div>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="price">Precio</Label>
                      <Input
                        id="price"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </div>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="category">Categoria</Label>
                    <Input id="category" {...field} />
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
