import { createContext, useContext, useEffect, useReducer } from 'react';
import { useSearch } from '../features/search-field/useSearch';
import { useSearchParams } from 'react-router-dom';
import { MAX_API_ELEMENT_LIMIT, MAX_API_PAGE_LIMIT } from '../constants';

const EventsContext = createContext();

const initialState = {
  events: [],
  totalPages: 0,
  totalElements: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setEvents':
      return { ...state, ...action.payload };
    case 'setLoading':
      return { ...state, isLoading: action.payload };
    case 'setError':
      return { ...state, error: action.payload };
    default:
      throw new Error('Unknown action type');
  }
}

function EventsProvider({ children }) {
  const [{ events, searchQuery, totalPages, totalElements }, dispatch] = useReducer(reducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || 'Football';

  let pageParam = searchParams.get('page');
  if (isNaN(parseInt(pageParam))) pageParam = 1;
  pageParam = pageParam <= 0 ? 1 : pageParam - 1;
  pageParam = pageParam >= MAX_API_PAGE_LIMIT ? 99 : pageParam; // API Limit page * size < 1000

  const { eventsResponse, isLoading, error } = useSearch({ searchTerm, page: pageParam });

  useEffect(() => {
    if (searchTerm) {
      const existingParams = new URLSearchParams(searchParams);
      existingParams.set('page', 1);
      setSearchParams(existingParams);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (eventsResponse && eventsResponse._embedded && eventsResponse.page.totalElements > 0) {
      const { _embedded, page } = eventsResponse;
      setEvents({
        events: _embedded.events,
        totalPages: page.totalPages,
        totalElements: Math.min(page.totalElements, MAX_API_ELEMENT_LIMIT),
      });
    }
  }, [eventsResponse, pageParam]);

  useEffect(() => {
    dispatch({ type: 'setLoading', payload: isLoading });
    dispatch({ type: 'setError', payload: error });
  }, [isLoading, error]);

  function setEvents(value) {
    dispatch({ type: 'setEvents', payload: value });
  }

  return (
    <EventsContext.Provider value={{ setEvents, events, totalPages, totalElements, searchTerm, isLoading, error }}>
      {children}
    </EventsContext.Provider>
  );
}

function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) throw new Error('EventsContext used outside of the EventsProvider');
  return context;
}

export { EventsContext, EventsProvider, useEvents };
