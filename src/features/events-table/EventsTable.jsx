import { useSearchParams } from 'react-router-dom';
import { useEvents } from '../../contexts/EventsContext';
import StatusInfo from '../../ui/StatusInfo';
import styles from './EventsTable.module.css';
import TablePagination from './TablePagination';
import TableRow from './TableRow';
import { getNestedProp } from '../../utils/getNestedProp';
import { API_PAGE_SIZE } from '../../constants';

function EventsTable() {
  const { events, isLoading, error } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortKey = searchParams.get('sortKey') || 'name';
  const sortDirection = searchParams.get('sortDirection') || 'asc';

  const noEvents = events.length < 1;
  const emptyRowsToFill = noEvents ? API_PAGE_SIZE : API_PAGE_SIZE - events.length;

  let fallbackEl;
  if (isLoading) {
    fallbackEl = <StatusInfo info={'Loading...'} />;
  } else if (noEvents) {
    fallbackEl = <StatusInfo info={'No event has been found!'} />;
  } else if (error) {
    fallbackEl = <StatusInfo info={error.message} />;
  }

  const getSortObjKey = (key) => {
    const keyMap = {
      name: 'name',
      genre: 'classifications[0].genre.name',
      status: 'dates.status.code',
      date: 'dates.start.localDate',
      country: '_embedded.venues[0].country.name',
      address: '_embedded.venues[0].name',
    };

    return keyMap[key] || key;
  };

  const sortedEvents = [...events].sort((a, b) => {
    const objKey = getSortObjKey(sortKey);
    const order = sortDirection === 'asc' ? 1 : -1;

    const aValue = getNestedProp(a, objKey) || '';
    const bValue = getNestedProp(b, objKey) || '';

    return aValue.localeCompare(bValue) * order;
  });

  const handleSort = (key) => {
    const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    const existingParams = new URLSearchParams(searchParams);
    existingParams.set('sortKey', key);
    existingParams.set('sortDirection', newDirection);

    setSearchParams(existingParams);
  };

  const getSortIcon = (key) => {
    if (sortKey !== key) return '▼';
    return sortDirection === 'asc' ? '▲' : '▼';
  };

  return (
    <table className={styles.eventsTable}>
      <thead>
        <tr>
          <th scope="col" onClick={() => handleSort('name')}>
            Event Name {getSortIcon('name')}
          </th>
          <th scope="col" onClick={() => handleSort('genre')}>
            Genre {getSortIcon('genre')}
          </th>
          <th scope="col" onClick={() => handleSort('status')}>
            Status {getSortIcon('status')}
          </th>
          <th scope="col" onClick={() => handleSort('date')}>
            Date {getSortIcon('date')}
          </th>
          <th scope="col" onClick={() => handleSort('country')}>
            Country {getSortIcon('country')}
          </th>
          <th scope="col" onClick={() => handleSort('address')}>
            Address {getSortIcon('address')}
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {fallbackEl ? (
          <tr>
            <td colSpan={7}>{fallbackEl}</td>
          </tr>
        ) : (
          <>
            {sortedEvents.map((event) => (
              <TableRow key={event.id} event={event} />
            ))}
            {Array.from({ length: emptyRowsToFill }, (_, index) => (
              <tr key={`empty-${index}`} className={styles.emptyRow}>
                <td colSpan={7}></td>
              </tr>
            ))}
          </>
        )}
      </tbody>

      <TablePagination />
    </table>
  );
}

export default EventsTable;
