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
import { getCategories, updateCategory } from "@/services/categories";
import { updateProduct } from "@/services/products";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
  name: z.string(),
});
type Category = z.infer<typeof schema>;

interface EditCategoryProps {
  item: Category;
  open: boolean;
  setOpen: (open: boolean) => void;
  onCategoryUpdated: (category: Category) => void;
}

export default function EditCategory({
  item,
  open,
  setOpen,
  onCategoryUpdated,
}: EditCategoryProps) {
  const isMobile = useIsMobile();

  //1. Define your form.
  const form = useForm<Category>({
    resolver: zodResolver(schema),
    defaultValues: item,
  });

  function onSubmit(values: Category) {
    try {
      updateCategory(values.id, values).then((res) => {
        onCategoryUpdated(res.data ?? values);
        console.log(res.data);
      });
      alert("Categoría actualizada correctamente");
      setOpen(false);
    } catch (error) {
      console.error("Error al crear la categoría", error);
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
                  Editar Categoría
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
