import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

const ArticleMeta = ({ username, createdAt }) => {
  return (
    <div className='d-flex flex-column align-items-start justify-content-center'>
      <Link to={`/@${encodeURIComponent(username)}`} className='link-success text-decoration-none fs-6'>{username}</Link>
      <p className='small text-secondary mb-0'>{DateTime.fromISO(createdAt).toFormat('LLL yy, dd')}</p>
    </div>
  );
}

export default ArticleMeta;
