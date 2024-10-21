"use client";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useServerAction } from "zsa-react";
import { searchLocations } from "../actions/actions";
import type { CarwashLocation } from "@/types/locations.types";
import { LocationButton } from "./location-button";

export const SearchDrawer = () => {
	const { execute } = useServerAction(searchLocations);
	const [searchValue, setSearchValue] = useState("");
	const [results, setResults] = useState<CarwashLocation[]>([]);

	const debouncedSearchValue = useDebounceCallback(setSearchValue, 500);

	const handleSearch = useCallback(
		async (searchValue: string) => {
			const [data, error] = await execute(searchValue);

			if (error) {
				console.error("Error fetching search results", error);
				return;
			}

			setResults(data);
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
			<DrawerTrigger className="flex gap-1 items-center justify-center bg-gray-950 hover:bg-gray-800 p-2 rounded-lg w-12 hover:w-48 transition-all duration-300 overflow-hidden group">
				<span className="text-sm text-white hidden group-hover:block truncate">
					Search for car washes
				</span>{" "}
				<Search color="white" />
			</DrawerTrigger>
			<DrawerContent className="z-[1000]">
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
					<div className="flex flex-col gap-2 px-4 mt-4">
						{results.map((result) => (
							<LocationButton key={result.id} location={result} />
						))}
					</div>
				) : (
					<div className="flex items-center justify-center h-24">
						<span className="text-lg italic font-medium text-white">
							No results found
						</span>
					</div>
				)}

				<DrawerFooter className="">
					<Button onClick={() => handleSearch(searchValue)}>Submit</Button>
					<DrawerClose asChild>
						<Button variant="outline" className="w-full">
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};