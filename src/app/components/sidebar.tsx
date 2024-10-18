"use client";

import type { CarwashLocation } from "@/types/locations.types";
import { CarFront } from "lucide-react";
import { LocationButton } from "./location-button";

interface SidebarProps {
	locations: CarwashLocation[];
}

export const Sidebar: React.FC<SidebarProps> = ({ locations }) => {
	return (
		<div className="min-w-96 flex flex-col text-gray-200 pt-6 px-4 gap-4">
			<div className="flex gap-1 justify-center items-center">
				<CarFront />
				<h1 className="font-semibold text-xl text-center">Carwash App</h1>
			</div>
			<div className="flex flex-col gap-2">
				{locations.length ? (
					locations.map((l) => <LocationButton key={l.id} location={l} />)
				) : (
					<div className="text-center text-gray-400">No locations found</div>
				)}
			</div>
		</div>
	);
};
