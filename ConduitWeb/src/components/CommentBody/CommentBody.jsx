import { useContext, useState } from 'react';
import UserContext from '../UserContext/UserContext';
import AddComment from '../AddComment/AddComment';
import CommentList from '../CommentList/CommentList';

const CommentBody = ({ slug }) => {

  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);

  return (
    <div className='container py-4 w-50'>
      {user.isSignedIn && <AddComment slug={slug} comments={comments} setComments={setComments} />}
      <CommentList slug={slug} comments={comments} setComments={setComments} />
    </div>
  );
}

export default CommentBody;
