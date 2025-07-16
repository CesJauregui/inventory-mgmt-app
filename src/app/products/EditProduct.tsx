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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { getCategories } from "@/services/categories";
import { updateProduct } from "@/services/products";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
  codeSKU: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  brand: z.string(),
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
    defaultValues: {
      ...item,
      category: item.category || { id: 0, name: "" },
    },
  });

  const [categories, setCategories] = React.useState<any[]>([]);

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

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const options = categories.map((category) => ({
    id: category.id,
    value: category.name,
    label: category.name,
  }));

  //dummy
  const brands = [
    { value: "faber-castel", label: "Faber Castel" },
    { value: "alpha", label: "Alpha" },
    { value: "artesco", label: "Artesco" },
  ];

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
                  Código SKU: {item.codeSKU}
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
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="category">Categoría</Label>
                  <Controller
                    name="category"
                    control={form.control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        value={field.value?.id?.toString() || ""}
                        onValueChange={(selectedId) => {
                          const selectedCategory = categories.find(
                            (cat) => cat.id.toString() === selectedId
                          );
                          field.onChange(selectedCategory);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccione una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="brand">Marca</Label>
                  <Controller
                    name="brand"
                    control={form.control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccione una marca" />
                        </SelectTrigger>
                        <SelectContent id="brand">
                          {brands.map((option) => (
                            <SelectItem key={option.value} value={option.label}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
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
