import { Link, useNavigate } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

import styles from './TableRow.module.css';
import EventStatusIndicator from '../../ui/EventStatusIndicator';

function TableRow({ event }) {
  const navigate = useNavigate();
  const localFormatDate = formatDate(event.dates.start.localDate);

  const { classifications, dates, _embedded: { venues } = {} } = event;
  const eventStatus = dates?.status?.code;

  function handleRowClick() {
    navigate(`/events/${event.id}`);
  }

  return (
    <tr className={styles.tableRow} onClick={handleRowClick}>
      <th scope="row">{event.name}</th>
      <td>
        {classifications?.[0]?.genre?.name} - {classifications?.[0]?.subGenre?.name}
      </td>
      <td>
        <EventStatusIndicator status={eventStatus} />
      </td>
      <td>{localFormatDate}</td>
      <td>{venues?.[0]?.country?.name}</td>
      <td>
        <strong>{venues?.[0]?.name}</strong>
        <br /> {venues?.[0]?.city?.name} - {venues?.[0]?.state?.name}
      </td>
      <td>
        <Link to={`events/${event.id}`}>{'>'}</Link>
      </td>
    </tr>
  );
}

export default TableRow;
