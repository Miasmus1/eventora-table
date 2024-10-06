import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './App.css';

import SearchField from './features/search-field/SearchField';
import EventsTable from './features/events-table/EventsTable';
import { EventsProvider } from './contexts/EventsContext';
import EventDetails from './features/event-details/EventDetails';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <EventsProvider>
            <Routes>
              <Route
                index
                element={
                  <>
                    <SearchField></SearchField>
                    <EventsTable></EventsTable>
                  </>
                }
              />
              <Route path="/events/:id" element={<EventDetails />} />
            </Routes>
          </EventsProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
