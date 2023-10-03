import styles from './Loading.module.css';

const Loading = ({ width }) => {
  return (
    <svg viewBox='0 0 100 100' width={width} className={styles.svg}>
      <circle cx='50' cy='50' r='45' className={styles.circle} />
    </svg>
  );
}

export default Loading;
