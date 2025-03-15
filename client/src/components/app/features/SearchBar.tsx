import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search..."
        className="w-full bg-transparent border border-white text-[#E0E0E0] placeholder-[#E0E0E0] px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] transition-all duration-300 ease-in-out"
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
    </div>
  );
}
