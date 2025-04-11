import React, { Dispatch, SetStateAction } from "react";
import "./SearchForm.css";

interface SearchFormProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  locationFilter: string;
  setLocationFilter: Dispatch<SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  search,
  setSearch,
  locationFilter,
  setLocationFilter,
  onSubmit,
}) => {
  return (
    <section className="search-section">
      <h2 className="title-form">Emprego dos sonhos</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por cargo"
        />
        <input
          type="text"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          placeholder="Buscar por localização"
        />
        <button type="submit">Buscar</button>
      </form>
    </section>
  );
};

export default SearchForm;
