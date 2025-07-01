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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
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
export type Product = z.infer<typeof schema>;

interface EditProductProps {
  item: Product;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function EditProduct({ item, open, setOpen }: EditProductProps) {
  const isMobile = useIsMobile();
  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4">
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
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" defaultValue={item.name} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                className="resize-none max-h-[150px]"
                defaultValue={item.description}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" defaultValue={item.stock} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="price">Precio</Label>
                <Input id="price" defaultValue={item.price} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="category">Categoria</Label>
                <Input id="category" defaultValue={item.category} />
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Guardar</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
