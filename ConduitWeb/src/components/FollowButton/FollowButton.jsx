import { useEffect, useState, useContext } from 'react';
import { followProfile, unfollowProfile } from '../../services/profileApi';
import UserContext from '../../components/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

const FollowButton = ({ profile }) => {

  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFollowing(profile.isFollowing);
  }, [profile]);

  const handleFollow = async username => {
    if (!user.isSignedIn) {
      navigate('/signin');
      return;
    }
    try {
      setIsFollowing(true);
      await followProfile(encodeURIComponent(username));
    }
    catch {
      setIsFollowing(false);
      alert('Something went wrong!');
    }
  }

  const handleUnfollow = async username => {
    if (!user.isSignedIn) {
      navigate('/signin');
      return;
    }
    try {
      setIsFollowing(false);
      await unfollowProfile(encodeURIComponent(username));
    }
    catch {
      setIsFollowing(true);
      alert('Something went wrong!');
    }
  }

  return (
    <>
      {!isFollowing &&
        <button className='btn btn-sm btn-outline-success ms-2' onClick={() => handleFollow(profile.username)}>
          <i className='bi bi-plus-lg'></i> Follow
        </button>}
      {isFollowing &&
        <button className='btn btn-sm btn-success ms-2' onClick={() => handleUnfollow(profile.username)}>
          <i className='bi bi-check-lg'></i> Follow
        </button>}
    </>
  );
}

export default FollowButton;
