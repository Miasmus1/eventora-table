import { useParams } from 'react-router-dom';
import { useDetails } from './useDetails';

import styles from './EventDetails.module.css';
import StatusInfo from '../../ui/StatusInfo';

function EventDetails() {
  const { id } = useParams();
  const { eventDetails, isLoading, error } = useDetails(id);
  const noEvents = !isLoading && !eventDetails;

  let fallbackEl;
  if (isLoading) {
    fallbackEl = <StatusInfo info={'Loading...'} />;
  } else if (noEvents) {
    fallbackEl = <StatusInfo info={'No event has been found!'} />;
  } else if (error) {
    fallbackEl = <StatusInfo info={error.message} />;
  }

  return (
    <>
      {fallbackEl}
      {eventDetails && (
        <article className={styles.eventDetailsContainer}>
          <figure>
            <img src={eventDetails.images[0].url} />
          </figure>
          <h2>{eventDetails.name}</h2>

          <div>
            <p>
              {eventDetails.classifications[0].segment.name} - {eventDetails.classifications[0].genre.name}
            </p>
          </div>

          <div>
            <p>
              <strong>{eventDetails.dates.start.localDate}</strong>
            </p>
            <p>
              {eventDetails._embedded.venues[0].name}, {eventDetails._embedded.venues[0].city.name},{' '}
              {eventDetails._embedded.venues[0].state.name}, {eventDetails._embedded.venues[0].country.countryCode}
            </p>

            <p>{eventDetails.dates.status.code.toUpperCase()}</p>
          </div>

          <div>
            <h3>Seatmap</h3>
            <figure>
              <img src={eventDetails.seatmap?.staticUrl} />
            </figure>
          </div>
        </article>
      )}
    </>
  );
}

export default EventDetails;
