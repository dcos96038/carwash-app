"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";

interface SearchInputProps {
	onSubmit: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSubmit }) => {
	const [query, setQuery] = useQueryState("q", parseAsString);

	return (
		<div className="flex justify-center items-center">
			<Input
				placeholder="Search"
				className="rounded-r-none border-r-transparent"
				value={query || ""}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<Button
				onClick={() => onSubmit(query || "")}
				variant={"secondary"}
				size={"icon"}
				className="rounded-l-none"
			>
				<Search size={16} />
			</Button>
		</div>
	);
};
