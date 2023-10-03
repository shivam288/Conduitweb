import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getArticlesByAuthor, getArticlesByFavorite } from '../../services/articleApi';
import { getProfile } from '../../services/profileApi';
import { tabs } from '../Profile/tabs';
import UserContext from '../../components/UserContext/UserContext';
import Loading from '../../components/Loading/Loading';
import ArticleList from '../../components/ArticleList/ArticleList';
import NavTabs from '../../components/NavTabs/NavTabs';
import Pagination from '../../components/Pagination/Pagination';
import NoArticlesFound from '../../components/NoArticlesFound/NoArticlesFound';
import FollowButton from '../../components/FollowButton/FollowButton';

const Profile = () => {

  const location = useLocation();
  const [profile, setProfile] = useState({});
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const [offset, setOffset] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const response = await getProfile(location.pathname.slice(2));
      setProfile(response);
    })();
  }, [location.pathname]);

  useEffect(() => {
    if (Object.keys(profile).length !== 0) {
      setIsLoading(true)
      if (activeTab === 1) {
        (async () => {
          const response = await getArticlesByAuthor(profile.username, offset);
          setArticles(response);
          setIsLoading(false);
        })();
      }
      else if (activeTab === 2) {
        (async () => {
          const response = await getArticlesByFavorite(profile.username, offset);
          setArticles(response);
          setIsLoading(false);
        })();
      }
    }
  }, [offset, profile, activeTab]);

  return (
    <>
      <div className='bg-dark text-white pt-2 pb-3 d-flex flex-column align-items-center justify-content-center'>
        <h3>{profile.username}</h3>
        <p>{profile.bio}</p>
        <div className='w-75 d-flex align-items-center justify-content-end'>
          {user.username !== profile.username && <FollowButton profile={profile} />}
          {user.username === profile.username &&
            <Link to='/settings' className='btn btn-sm btn-outline-light'>
              <i className="bi bi-gear"></i> Edit Profile
            </Link>}
        </div>
      </div>
      <div className='container mt-2'>
        <div className='row'>
          <div className='col-md-9'>
            <NavTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {isLoading &&
              <div className='text-center my-5'>
                <Loading width={120} />
              </div>}
            {(!isLoading && articles.length === 0) &&
              <NoArticlesFound />}
            {(articles.length > 0 && !isLoading) &&
              <ArticleList articles={articles} />}
            <Pagination offset={offset} setOffset={setOffset} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
