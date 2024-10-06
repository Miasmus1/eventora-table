import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

import styles from './TableRow.module.css';

function TableRow({ event }) {
  const localFormatDate = formatDate(event.dates.start.localDate);

  const { classifications, dates, _embedded: { venues } = {} } = event;

  const eventStatus = dates.status.code.toUpperCase();

  return (
    <tr className={styles.tableRow}>
      <th scope="row">{event.name}</th>
      <td>
        {classifications?.[0]?.genre?.name} - {classifications?.[0]?.subGenre?.name}
      </td>
      <td>
        <span
          className={`${styles.statusIndicator}  ${
            eventStatus === 'OFFSALE' ? styles.red : eventStatus === 'RESCHEDULED' ? styles.orange : ''
          }`}
        ></span>{' '}
        {eventStatus}
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
