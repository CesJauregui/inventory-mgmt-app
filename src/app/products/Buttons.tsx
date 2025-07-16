import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconPlus } from "@tabler/icons-react";

export default function Buttons({
  onSelect,
}: {
  onSelect: (type: "producto" | "categoria" | "marca") => void;
}) {
  const options = [
    { value: "producto", label: "Producto" },
    { value: "categoria", label: "Categoría" },
    { value: "marca", label: "Marca" },
  ];
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <IconPlus />
        <SelectValue placeholder="Agregar..." />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            Agregar {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
