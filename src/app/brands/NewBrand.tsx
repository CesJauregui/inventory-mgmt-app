"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { createBrand } from "@/services/brands";

const formSchema = z.object({
  name: z.string(),
});

type Brand = z.infer<typeof formSchema>;

interface NewBrandProps {
  onBrandCreated: (brand: Brand) => void;
}

export function NewBrand({ onBrandCreated }: NewBrandProps) {
  const form = useForm<Brand>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: Brand) {
    try {
      createBrand(values).then((res) => {
        onBrandCreated(res.data ?? values);
        alert("Marca creada correctamente");
      });
      form.reset();
    } catch (error) {
      console.error("Error al crear la marca", error);
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex px-7 space-x-4 md:space-x-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex">
              <FormLabel className="sm:w-50 w-20">Nueva Marca:</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Agregar</Button>
      </form>
    </Form>
  );
}
