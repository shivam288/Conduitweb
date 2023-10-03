import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext/UserContext';
import NavLinkItem from '../NavLinkItem/NavLinkItem';
import { removeUser } from '../../util/localStorageUtil';

const Navbar = () => {

  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavbarCollapse = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  }

  const handleSignout = e => {
    e.preventDefault();
    removeUser(setUser);
    navigate('/');
  }

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark sticky-top'>
      <div className="container-fluid">
        <Link to='/' className='navbar-brand mb-0 h1'>Conduit</Link>
        <button className='navbar-toggler' type='button' onClick={handleNavbarCollapse}>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className={`${isNavbarCollapsed ? 'collapse' : ''} navbar-collapse`}>
          <ul className='navbar-nav ms-auto'>
            <NavLinkItem to='/' text='Home' />
            {!user.isSignedIn &&
              <>
                <NavLinkItem to='/signin' text='Sign In' />
                <NavLinkItem to='/signup' text='Sign Up' />
              </>}
            {user.isSignedIn &&
              <>
                <NavLinkItem to='/article/new' text='New Article' />
                <NavLinkItem to='/settings' text='Settings' />
                <NavLinkItem to={`/@${encodeURIComponent(user.username)}`} text={user.email} />
                <li>
                  <Link to='/signout' className='nav-link' onClick={handleSignout}>Sign out</Link>
                </li>
              </>}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
