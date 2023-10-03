import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getArticle } from '../../services/articleApi';
import ArticleMeta from '../../components/ArticleMeta/ArticleMeta';
import TagList from '../../components/TagList/TagList';
import Loading from '../../components/Loading/Loading';
import CommentBody from '../../components/CommentBody/CommentBody';
import ArticleButtons from '../../components/ArticleButtons/ArticleButtons';
import styles from './Article.module.css';

const Article = () => {

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});

  useEffect(() => {
    (async () => {
      const response = await getArticle(location.pathname.split('/')[2]);
      setArticle(response);
      setIsLoading(false);
    })();
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className='d-flex align-items-center justify-content-center full-height pb-5'>
        <Loading width={140} />
      </div>
    );
  }

  return (
    <>
      <article>
        <div className='py-3 container border-bottom'>
          <h1 className='mt-2'>{article.title}</h1>
          <div className='d-flex align-items-center justify-content-start'>
            <ArticleMeta username={article.author.username} createdAt={article.createdAt} />
            <ArticleButtons article={article} setIsLoading={setIsLoading} />
          </div>
        </div>
        <div className='container mt-4 border-bottom pb-4'>
          <p className={`fs-5 mb-3 ${styles.articleBody}`}>{article.body}</p>
          <TagList tags={article.tags} justifyContent='start' />
        </div>
      </article>
      <CommentBody slug={article.slug} />
    </>
  );
}

export default Article;
