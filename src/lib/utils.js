import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function sleep(duration) {
  return new Promise((resolve) => {
      setTimeout(resolve, duration)
  })
}