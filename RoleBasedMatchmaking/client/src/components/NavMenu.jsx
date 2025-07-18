import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import BASE_PATH from '../config/BasePath.js';

const navItems = [
  {
    label: 'Dashboard',
    key: 'dashboard',
  },
  { 
    label: 'Form',
    key: 'form',
  },
  {
    label: 'Admin',
    key: 'admin',
    children: [
      { label: 'Job Title Details', key: 'admin/title-details' },
      { label: 'Form Distribution Groups', key: 'admin/form' }
    ]
  },
]

const NavMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

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