import { ChangeEvent } from 'react';
import '../styles/components/SearchBar.css';

type SearchBarComponentProps = {
    onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBarComponent = ({ onSearch }: SearchBarComponentProps) => (
    <div className="search-bar">
        <input
            type="text"
            placeholder="Buscar por nombre"
            onChange={onSearch}
            className="search-input"
        />
    </div>
);

export default SearchBarComponent;
