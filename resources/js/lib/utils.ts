import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function googleMapsLink(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${address}`
}
