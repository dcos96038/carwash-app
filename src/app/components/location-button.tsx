import { useMap } from "@/context/use-map";

import { cn, isClosed } from "@/lib/utils";

import type { Carwash } from "@/types/carwash.types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LocationButtonProps {
  location: Carwash;
}

export const LocationButton: React.FC<LocationButtonProps> = ({ location }) => {
  const { moveMap } = useMap();

  return (
    <button
      type="button"
      key={location.id}
      className="flex w-full items-center gap-4 rounded-lg px-1 py-2 text-left transition-all duration-300 hover:bg-white hover:text-black focus:outline-none"
      onClick={() => moveMap(location.latitude, location.longitude)}
    >
      <Avatar className="size-12">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          {location.name
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-semibold italic">{location.name}</span>
        <span className="text-xs font-medium">
          {location.address.split(",")[0]}, {location.address.split(",")[1]} -{" "}
          <span
            className={cn("italic", {
              "text-red-600": isClosed(location.closingHours),
              "text-green-600": !isClosed(location.closingHours),
            })}
          >
            {isClosed(location.closingHours) ? "Cerrado" : "Abierto"}
          </span>
          <div className="text-gray-400">
            Horario: {location.openingHours} - {location.closingHours}
          </div>
        </span>
      </div>
    </button>
  );
};
