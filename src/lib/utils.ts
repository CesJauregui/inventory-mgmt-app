import { clsx, type ClassValue } from "clsx";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPathLocation(): string | string[] {
  const location = useLocation();
  return location.pathname.toUpperCase().split("/");
}
