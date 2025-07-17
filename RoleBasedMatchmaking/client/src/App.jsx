import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import ProvisionForm from './pages/ProvisionForm';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import BASE_PATH from './config/BasePath.js';

const { Header, Content } = Layout;

function App() {
  const navItems = ['Dashboard', 'Form', 'Admin'].map(key => ({
    key,
    label: key
  }));
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout>
      <Header 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}
      >
        <img src={`${import.meta.env.BASE_URL}/logo.png`}
            style={{ height: '80%', borderRadius: '5px' }} />

        <Menu items={navItems}
              mode="horizontal" 
              theme="dark"
              defaultSelectedKeys={location.pathname.replace(`${BASE_PATH}/`, '')}
              style={{ flex: 1, 
                       minWidth: 0 }}
              onClick={e => navigate(`${BASE_PATH}/${e.key}`)} />
      </Header>

      <Content style={{padding: '12px'}}>
          <Routes>
            <Route path={`${BASE_PATH}`} element={<Dashboard />} />
            <Route path={`${BASE_PATH}/dashboard`} element={<Dashboard />} />
            <Route path={`${BASE_PATH}/form`} element={<ProvisionForm />} />
            <Route path={`${BASE_PATH}/admin`} element={<Admin />} />
          </Routes>
      </Content>
    </Layout>
  )
}

export default App;
