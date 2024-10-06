import { useRef } from 'react';
import { useEvents } from '../../contexts/EventsContext';
import SearchIcon from '../../ui/SearchIcon';
import styles from './SearchField.module.css';

function SearchField() {
  const { setSearchTerm, isLoading } = useEvents();
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const formFields = new FormData(e.target);
    const searchInput = formFields.get('search').trim();
    setSearchTerm(searchInput);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <label htmlFor="search" className="visually-hidden">
        Search
      </label>
      <input type="text" name="search" id="search" minLength="3" placeholder="Search" ref={inputRef} />
      <button disabled={isLoading} className={styles.searchIcon}>
        <SearchIcon />
      </button>
    </form>
  );
}

export default SearchField;
