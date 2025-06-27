import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;

function App() {
  const navItems = ['Dashboard', 'Admin'].map(key => ({
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
              defaultSelectedKeys={location.pathname.replace('/AD/', '')}
              style={{ flex: 1, 
                       minWidth: 0 }}
              onClick={e => navigate(`/AD/${e.key}`)} />
      </Header>

      <Content>
        <div style={{
              padding: 24,
            }}
        >
          <Routes>
            <Route path="/AD" element={<Dashboard />} />
            <Route path="/AD/Dashboard" element={<Dashboard />} />
            <Route path="/AD/admin" element={<Admin />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  )
}

export default App;
