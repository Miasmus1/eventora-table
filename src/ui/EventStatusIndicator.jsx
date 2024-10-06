import styles from './EventStatusIndicator.module.css';

function EventStatusIndicator({ status }) {
  return (
    <div className={`styles.statusIndicator`}>
      <span
        className={`${styles.statusIndicator}  ${
          status === 'OFFSALE' ? styles.red : status === 'RESCHEDULED' ? styles.orange : ''
        }`}
      ></span>{' '}
      {status.toUpperCase()}
    </div>
  );
}

export default EventStatusIndicator;
