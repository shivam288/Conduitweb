import ArticleListItem from '../ArticleListItem/ArticleListItem';

const ArticleList = ({ articles }) => {
  return (
    <div className='mb-3'>
      {articles.map(article => <ArticleListItem article={article} key={article.slug} />)}
    </div>
  );
}

export default ArticleList;
