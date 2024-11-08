import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isClosed(closingHours: string | null): boolean {
  if (!closingHours) return true;
  const currentTime = new Date();
  const [closingHour, closingMinutes] = closingHours.split(":").map(Number);

  const closingTime = new Date();
  closingTime.setHours(closingHour, closingMinutes, 0);

  return currentTime > closingTime;
}

export function createEnum<T extends string>(arr: T[]): { [K in T]: K } {
  return arr.reduce(
    (acc, curr) => {
      acc[curr] = curr;
      return acc;
    },
    {} as { [K in T]: K },
  );
}
