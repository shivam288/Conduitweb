import { useState, useContext } from 'react';
import { favoriteArticle, unfavoriteArticle } from '../../services/articleApi';
import UserContext from '../../components/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

const FavoriteButton = ({ slug, favorited, favoritesCount }) => {

  const [isFavorite, setIsFavorite] = useState(favorited);
  const [count, setCount] = useState(favoritesCount);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFavorite = async slug => {
    if (!user.isSignedIn) {
      navigate('/signin');
      return;
    }
    try {
      setIsFavorite(true);
      await favoriteArticle(encodeURIComponent(slug))
      setCount(count + 1);
    }
    catch {
      setIsFavorite(false);
      alert('Something went wrong!');
    }
  }

  const handleUnfavorite = async slug => {
    if (!user.isSignedIn) {
      navigate('/signin');
      return;
    }
    try {
      setIsFavorite(false);
      await unfavoriteArticle(encodeURIComponent(slug));
      setCount(count - 1);
    }
    catch {
      setIsFavorite(true);
      alert('Something went wrong!');
    }
  }

  return (
    <>
      {!isFavorite &&
        <button
          className='btn btn-outline-success btn-sm float-end d-flex'
          onClick={() => handleFavorite(slug)}
        >
          <i className="bi bi-heart me-1"></i>Favourite {count}
        </button>}
      {isFavorite &&
        <button
          className='btn btn-success btn-sm float-end d-flex'
          onClick={() => handleUnfavorite(slug)}
        >
          <i className="bi bi-heart me-1"></i>Favourite {count}
        </button>}
    </>
  );
}

export default FavoriteButton;
