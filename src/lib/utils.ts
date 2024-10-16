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
