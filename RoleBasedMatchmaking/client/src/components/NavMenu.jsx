// top nav meun

import { Menu } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import BASE_PATH from '../config/BasePath.js';

const allNavItems = [
  { 
    label: 'Form',
    key: 'form',
  },
  {
    label: 'Dashboard',
    key: 'dashboard',
  },
  {
    label: 'Admin',
    key: 'admin',
    children: [
      { label: 'Job Title Details', key: 'admin/title-details' },
      { label: 'Form Distribution Groups', key: 'admin/form' },
      { label: 'System Configuration', key: 'admin/system' },
    ]
  },
]

const NavMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navItems, setNavItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user != null && user.admin) {
      setNavItems(allNavItems);
    }
    else {
      setNavItems([allNavItems[0]]);
    }
  }, [user]);

  return (
    <Menu items={navItems}
          mode="horizontal" 
          theme="dark"
          defaultSelectedKeys={location.pathname.replace(`${BASE_PATH}/`, '')}
          style={{ flex: 1, 
                    minWidth: 0 }}
          onClick={e => navigate(`${BASE_PATH}/${e.key}`)} />
  );
}

export default NavMenu;