"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CarwashLocation } from "@/types/locations.types";
import { CarFront } from "lucide-react";
import { SearchInput } from "./search-input";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { getLocationsAction } from "../actions/actions";

interface SidebarProps {
    initialLocations: CarwashLocation[];
}

export const Sidebar: React.FC<SidebarProps> = ({ initialLocations }) => {
    const [locations, setLocations] = useState<CarwashLocation[]>(initialLocations);

    const { execute, isPending } = useServerAction(getLocationsAction);

    const fetchLocations = async (query: string) => {
        const [data] = await execute({ query });
        setLocations(data || []);
    };

    const handleLocationClick = (location: CarwashLocation) => {

    };

    const isClosed = (closingHours: string | null) => {
        if (!closingHours) return true;
        const currentTime = new Date();
        const [closingHour, closingMinutes] = closingHours.split(":").map(Number);

        const closingTime = new Date();
        closingTime.setHours(closingHour, closingMinutes, 0);

        return currentTime > closingTime;
    };

    return (
        <div className="min-w-96 flex flex-col text-gray-200 pt-6 px-4 gap-4">
            <div className="flex gap-1 justify-center items-center">
                <CarFront />
                <h1 className="font-semibold text-xl text-center">Carwash App</h1>
            </div>
            <SearchInput onSubmit={fetchLocations} />
            <div className="flex flex-col gap-2">
                {isPending && (
                    <div className="text-center text-gray-400">Loading...</div>
                )}
                {locations.length && !isPending ? (
                    locations.map((m) => {
                        const closed = isClosed(m.closingHours);

                        return (
                            <button
                                key={m.id}
                                className="flex gap-4 items-center px-1 py-2 text-left w-full hover:bg-gray-700 focus:outline-none"
                                onClick={() => handleLocationClick(m)} 
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
                                        <span className={`italic ${closed ? 'text-red-600' : 'text-green-600'}`}>
                                            {closed ? "Cerrado" : "Abierto"}
                                        </span>
                                        <div className="text-gray-400">
                                            Horario: {m.openingHours} - {m.closingHours}
                                        </div>
                                    </span>
                                </div>
                            </button>
                        );
                    })
                ) : (
                    <div className="text-center text-gray-400">No locations found</div>
                )}
            </div>
        </div>
    );
};
