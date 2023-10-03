import { Link } from 'react-router-dom';
import TagList from '../TagList/TagList';
import ArticleMeta from '../ArticleMeta/ArticleMeta';
import ArtclePreview from '../ArticlePreview/ArticlePreview';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

const ArticleListItem = ({ article }) => {
  return (
    <article className='p-3 border-bottom'>
      <div className='container'>
        <div className='row'>
          <div className='col-8'>
            <ArticleMeta username={article.author.username} createdAt={article.createdAt} />
          </div>
          <div className='col-4'>
            <FavoriteButton slug={article.slug} favorited={article.favorited} favoritesCount={article.favoritesCount} />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <ArtclePreview title={article.title} description={article.description} />
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <Link to={`/article/${encodeURIComponent(article.slug)}`} className='link-secondary text-decoration-none'>
              Read More...
            </Link>
          </div>
          <div className='col-6'>
            <TagList tags={article.tags} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default ArticleListItem;
