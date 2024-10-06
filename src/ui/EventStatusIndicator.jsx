import styles from './EventStatusIndicator.module.css';

function EventStatusIndicator({ status }) {
  console.log(status);
  return (
    <>
      <span
        className={`${styles.statusIndicator} ${
          status === 'offsale' ? styles.red : status === 'rescheduled' ? styles.orange : ''
        }`}
      ></span>
      {status.toUpperCase()}
    </>
  );
}

export default EventStatusIndicator;
