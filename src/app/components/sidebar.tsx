"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CarwashLocation } from "@/types/locations.types";
import { CarFront } from "lucide-react";
import { useEffect, useState } from "react";
import { useServerAction } from "zsa-react";
import { getLocationsAction } from "../actions/actions";
import { cn, isClosed } from "@/lib/utils";
import { useMap } from "@/context/use-map";
import { useCoordinates } from "@/hooks/use-coordinates";
import { useSearchQuery } from "@/hooks/use-search-query";

interface SidebarProps {
	locations: CarwashLocation[];
	loading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ locations, loading }) => {
	const { moveMap } = useMap();

	return (
		<div className="min-w-96 flex flex-col text-gray-200 pt-6 px-4 gap-4">
			<div className="flex gap-1 justify-center items-center">
				<CarFront />
				<h1 className="font-semibold text-xl text-center">Carwash App</h1>
			</div>
			<div className="flex flex-col gap-2">
				{loading && <div className="text-center text-gray-400">Loading...</div>}
				{locations.length && !loading ? (
					locations.map((m) => (
						<button
							type="button"
							key={m.id}
							className="flex gap-4 items-center px-1 py-2 text-left w-full hover:bg-gray-700 focus:outline-none rounded-lg"
							onClick={() => moveMap(m.latitude, m.longitude)}
						>
							<Avatar className="size-12">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>
									{m.name
										.split(" ")
										.slice(0, 2)
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col">
								<span className="font-semibold text-sm italic">{m.name}</span>
								<span className="text-xs font-medium">
									{m.address.split(",")[0]}, {m.address.split(",")[1]} -{" "}
									<span
										className={cn("italic", {
											"text-red-600": isClosed(m.closingHours),
											"text-green-600": !isClosed(m.closingHours),
										})}
									>
										{isClosed(m.closingHours) ? "Cerrado" : "Abierto"}
									</span>
									<div className="text-gray-400">
										Horario: {m.openingHours} - {m.closingHours}
									</div>
								</span>
							</div>
						</button>
					))
				) : (
					<div className="text-center text-gray-400">No locations found</div>
				)}
			</div>
		</div>
	);
};
