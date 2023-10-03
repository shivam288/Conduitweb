import { useEffect, useState } from 'react';
import { deleteComment, getComments } from '../../services/articleApi';
import Loading from '../Loading/Loading';
import CommentListItem from '../CommentListItem/CommentListItem';

const CommentList = ({ slug, comments, setComments }) => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getComments(encodeURIComponent(slug));
      response.reverse();
      setComments(response);
      setIsLoading(false);
    })();
  }, [slug, setComments]);

  const handleCommentDelete = async commentId => {
    try {
      setComments(comments.filter(x => x.commentId !== commentId));
      await deleteComment(encodeURIComponent(slug), commentId);
    }
    catch {
      alert('Can not delete comment');
    }
  }

  if (isLoading) {
    return (
      <div className='text-center mt-5'>
        <Loading width={100} />
      </div>
    );
  }

  return (
    <ul className='px-0'>
      {comments.length > 0 && comments.map(comment => (
        <CommentListItem
          key={comment.commentId}
          comment={comment}
          handleCommentDelete={handleCommentDelete}
        />
      ))}
    </ul>
  );
}

export default CommentList;
