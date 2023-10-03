import { useContext, useEffect, useState } from 'react';
import Banner from '../../components/Banner/Banner';
import NavTabs from '../../components/NavTabs/NavTabs';
import Loading from '../../components/Loading/Loading';
import { getArticles, getArticlesByFavorite, getArticlesFeed } from '../../services/articleApi';
import ArticleList from '../../components/ArticleList/ArticleList';
import { getTags } from '../../services/tagApi';
import TagList from '../../components/TagList/TagList';
import { tabs as mainTabs } from './tabs';
import Pagination from '../../components/Pagination/Pagination';
import NoArticlesFound from '../../components/NoArticlesFound/NoArticlesFound';
import UserContext from '../../components/UserContext/UserContext';

const Home = () => {

  const [activeTab, setActiveTab] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [offset, setOffset] = useState(0);
  const [tabs, setTabs] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.isSignedIn) {
      setTabs(mainTabs);
    }
    else {
      setTabs(mainTabs.filter(x => x.id !== 1 && x.id !== 3));
    }
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
    if (activeTab === 1 && user.isSignedIn) {
      (async () => {
        const response = await getArticlesFeed(offset);
        setArticles(response);
        setIsLoading(false);
      })();
    }
    if (activeTab === 2) {
      (async () => {
        const response = await getArticles(offset);
        setArticles(response);
        setIsLoading(false);
      })();
    }
    else if (activeTab === 3 && user.isSignedIn) {
      (async () => {
        const response = await getArticlesByFavorite(user.username, offset);
        setArticles(response);
        setIsLoading(false);
      })();
    }
  }, [offset, activeTab, user]);

  useEffect(() => {
    (async () => {
      const response = await getTags();
      setTags(response);
    })();
  }, []);

  return (
    <>
      <Banner />
      <div className='container mt-2'>
        <div className='row'>
          <div className='col-md-9'>
            <NavTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {isLoading &&
              <div className='text-center mt-5 mb-5'>
                <Loading width={120} />
              </div>}
            {(articles.length === 0 && !isLoading) &&
              <NoArticlesFound />}
            {(articles.length > 0 && !isLoading) &&
              <ArticleList articles={articles} offset={offset} setOffset={setOffset} />}
            <Pagination offset={offset} setOffset={setOffset} />
          </div>
          <div className='col-md-3 mb-4'>
            <div className='card border-success mt-4'>
              <div className='card-body p-2'>
                <div className='card-title'>Popular Tags</div>
                <TagList tags={tags.slice(0, 10)} justifyContent='start' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
