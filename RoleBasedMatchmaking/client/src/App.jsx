import NavMenu from './components/NavMenu.jsx';
import RoutesConfig from './components/RoutesConfig.jsx';
import { Layout, Spin, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Suspense } from 'react';
import { useAuth } from './contexts/AuthContext.jsx';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const { user } = useAuth();

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
            style={{ height: '80%', borderRadius: '5px' }}
            alt="Logo" />

        <NavMenu />
        
        <UserOutlined style={{color: 'white', margin: 0}} />
        <Title level={5} style={{color: 'white', margin: 0}}>{user?.username}</Title>
      </Header>
      
      <Content style={{padding: '12px 24px'}}>
        <Suspense fallback={<Spin />}>
          <RoutesConfig />
        </Suspense>
      </Content>
    </Layout>
  )
}

export default App;
