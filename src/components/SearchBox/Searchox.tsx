import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Searchox({ onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={onSearch}
    />
  );
}
