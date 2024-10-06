import { Link, useParams } from 'react-router-dom';
import { useDetails } from './useDetails';

import styles from './EventDetails.module.css';
import StatusInfo from '../../ui/StatusInfo';
import EventStatusIndicator from '../../ui/EventStatusIndicator';

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
          <figure className={styles.eventImage}>
            <img
              src={
                eventDetails.images?.[0]?.url ||
                'https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg'
              }
              alt={eventDetails.name || 'Event Image'}
            />
          </figure>
          <h2 className={styles.eventName}>{eventDetails?.name}</h2>

          <div className={styles.eventClassification}>
            <p>
              {eventDetails.classifications?.[0]?.segment?.name} - {eventDetails.classifications?.[0]?.genre?.name}
            </p>
          </div>

          <div className={styles.eventDateLocation}>
            <p>
              <strong>{eventDetails.dates?.start?.localDate}</strong>
            </p>
            <p>
              {eventDetails._embedded?.venues?.[0]?.name}, {eventDetails._embedded?.venues?.[0]?.city?.name},{' '}
              {eventDetails._embedded?.venues?.[0]?.state?.name},{' '}
              {eventDetails._embedded?.venues?.[0]?.country?.countryCode}
            </p>
          </div>

          <div className={styles.eventDescription}>
            <h3>Description</h3>
            <p>{eventDetails.info || 'No description available.'}</p>
          </div>

          <div className={styles.eventTicketInfo}>
            <h3>Ticket Information</h3>
            <EventStatusIndicator status={eventDetails.dates?.status?.code} />
            <p>
              {eventDetails.ticketLimit
                ? `Ticket Limit: ${eventDetails.ticketLimit.info}`
                : 'No ticket limit information available.'}
            </p>
          </div>

          <div className={styles.eventSeatmap}>
            <h3>Seatmap</h3>
            <figure>
              <img
                src={
                  eventDetails.seatmap?.staticUrl ||
                  'https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg'
                }
                alt="Seatmap"
              />
            </figure>
          </div>

          <div className={styles.eventDetailsNav}>
            <Link to={-1}>Back</Link>

            <a href={eventDetails.url || '#'} target="_blank" rel="noopener noreferrer">
              Official Event Page {'>'}
            </a>
          </div>
        </article>
      )}
    </>
  );
}

export default EventDetails;
