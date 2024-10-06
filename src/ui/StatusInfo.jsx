import styles from './StatusInfo.module.css';

function StatusInfo({ info }) {
  return <p className={styles.status}>{info}</p>;
}

export default StatusInfo;
