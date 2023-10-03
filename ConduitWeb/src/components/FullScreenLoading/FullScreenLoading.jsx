import Loading from '../Loading/Loading';
import styles from './FullScreenLoading.module.css';

const FullScreenLoading = ({ width }) => {
  return (
    <div className={`d-flex align-items-center justify-content-center w-100 full-height position-absolute ${styles.loading}`}>
      <Loading width={width} />
    </div>
  );
}

export default FullScreenLoading;
