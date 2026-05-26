import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search meals like Arrabiata, Chicken, Vegan...'
}: SearchBarProps) => (
  <label className="relative block">
    <span className="sr-only">Search recipes</span>
    <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-600" />
    <input
      className="input-field pl-12"
      type="search"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      autoComplete="off"
    />
  </label>
);
