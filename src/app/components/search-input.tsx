"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchQuery } from "@/hooks/use-search-query";
import { Search } from "lucide-react";

interface SearchInputProps {
	onSubmit: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSubmit }) => {
	const { query, setQuery } = useSearchQuery();

	return (
		<div className="flex justify-center items-center">
			<Input
				placeholder="Search"
				className="rounded-r-none border-r-transparent"
				value={query || ""}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && onSubmit(query || "")}
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
