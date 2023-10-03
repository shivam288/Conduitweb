const NavTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <ul className='nav nav-tabs'>
      {tabs.map(tab => (
        <li key={tab.id} className='nav-item'>
          <button
            className={`nav-link link-success ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}>
            {tab.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NavTabs;
