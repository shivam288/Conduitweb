import { DateTime } from 'luxon';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext/UserContext';

const CommentListItem = ({ comment, handleCommentDelete }) => {

  const { user } = useContext(UserContext);

  return (
    <li className='list-unstyled mb-2'>
      <div className='card'>
        <div className='card-body'>
          <p className='card-text'>{comment.body}</p>
        </div>
        <div className='card-footer bg-secondary bg-opacity-10 py-1'>
          <Link to='/' className='p-0 m-0 small text-success text-decoration-none'>
            {comment.author.username}
          </Link>
          <span className='small text-secondary ms-3'>
            {DateTime.fromISO(comment.createdAt).toFormat('LLLL yy, dd')}
          </span>
          {(user && comment.author.username === user.username) &&
            <button
              className='btn btn-sm btn-danger float-end my-0 py-0'
              onClick={() => handleCommentDelete(comment.commentId)}
            >
              <i className="bi bi-trash"></i>
            </button>}
        </div>
      </div>
    </li>
  );
}

export default CommentListItem;
