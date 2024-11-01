"use client";

import { Search } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useCallback, useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

import type { Carwash } from "@/types/carwash.types";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

import { searchLocations } from "../actions";
import { LocationButton } from "./location-button";

export const SearchDrawer = () => {
  const { execute } = useAction(searchLocations, {
    onSuccess: ({ data }) => {
      if (data?.length) {
        setResults(data);
      }
    },
    onError: (error) => {
      console.error("Error fetching search results", error);
    },
  });
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<Carwash[]>([]);

  const debouncedSearchValue = useDebounceCallback(setSearchValue, 500);

  const handleSearch = useCallback(
    async (searchValue: string) => {
      execute({ query: searchValue });
    },
    [execute],
  );

  useEffect(() => {
    if (searchValue.length) {
      handleSearch(searchValue);
    } else {
      setResults([]);
    }
  }, [searchValue, handleSearch]);

  return (
    <Drawer>
      <DrawerTrigger className="group flex w-12 items-center justify-center gap-1 overflow-hidden rounded-lg bg-gray-950 p-2 transition-all duration-300 hover:w-48 hover:bg-gray-800">
        <span className="hidden truncate text-sm text-white group-hover:block">
          Search for car washes
        </span>{" "}
        <Search color="white" />
      </DrawerTrigger>
      <DrawerContent className="z-[1000] pb-20">
        <DrawerHeader>
          <DrawerTitle>Search for a car wash</DrawerTitle>
          <DrawerDescription>Find a car wash by name</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col px-4">
          <Input
            defaultValue={searchValue}
            onChange={(e) => debouncedSearchValue(e.target.value)}
            id="search"
            placeholder="Search for a car wash"
          />
        </div>

        {results.length ? (
          <div className="mt-4 flex flex-col gap-2 px-4">
            {results.map((result) => (
              <LocationButton key={result.id} location={result} />
            ))}
          </div>
        ) : (
          <div className="flex h-24 items-center justify-center">
            <span className="text-lg font-medium italic text-white">
              No results found
            </span>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
