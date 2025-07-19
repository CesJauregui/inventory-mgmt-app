"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createProduct } from "@/services/products";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import { getCategories } from "@/services/categories";
import { getBrands } from "@/services/brands";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  brand: z.object({
    id: z.number(),
    name: z.string(),
  }),
  image: z.string(),
});

type Product = z.infer<typeof formSchema>;

interface NewProductProps {
  onProductCreated: (product: Product) => void;
}

export function NewProduct({ onProductCreated }: NewProductProps) {
  const form = useForm<Product>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0.0,
      stock: 0,
      category: undefined,
      brand: undefined,
      image: "./src/assets/image.webp",
    },
  });

  const [categories, setCategories] = React.useState<any[]>([]);
  const [brands, setBrands] = React.useState<any[]>([]);

  function onSubmit(values: Product) {
    try {
      createProduct(values).then((res) => {
        onProductCreated(res.data ?? values);
      });
      alert("Producto creado correctamente");
      form.reset();
    } catch (error) {
      console.error("Error al crear producto", error);
    }
    console.log(values);
  }
  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    getBrands().then((res) => {
      setBrands(res.data);
    });
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Hojas bond" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Hojas blancas ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0.0"
                    type="number"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    type="number"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
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
                  value={field.value?.id?.toString() ?? ""}
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
                  value={field.value?.id?.toString() ?? ""}
                  onValueChange={(selectedId) => {
                    const selectedBrand = brands.find(
                      (bra) => bra.id.toString() === selectedId
                    );
                    field.onChange(selectedBrand);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione una marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id.toString()}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Imagen</FormLabel>
              <FormControl>
                <Input type="file" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
