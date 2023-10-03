import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../components/UserContext/UserContext';
import { deleteArticle } from '../../services/articleApi';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import FollowButton from '../FollowButton/FollowButton';

const ArticleButtons = ({ article, setIsLoading }) => {

  const { user } = useContext(UserContext);
  const navigate = useNavigate('/');

  const handleArticleDelete = async slug => {
    setIsLoading(true);
    try {
      await deleteArticle(encodeURIComponent(slug));
      navigate('/');
      return;
    }
    catch {
      alert('Can not Delete Article');
    }
    setIsLoading(false);
  }

  return (
    <div className='ms-5'>
      {user.username !== article.author.username && <FollowButton profile={article.author} />}
      {user.username === article.author.username &&
        <button
          className='btn btn-sm btn-outline-danger ms-2'
          onClick={() => handleArticleDelete(article.slug)}
        >
          <i className='bi bi-trash'></i> Delete
        </button>}
      <span className='ms-2'>
        <FavoriteButton slug={article.slug} favorited={article.favorited} favoritesCount={article.favoritesCount} />
      </span>
    </div>
  );
}

export default ArticleButtons;
