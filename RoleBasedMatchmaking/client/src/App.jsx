import { Suspense } from 'react';
import NavMenu from './components/NavMenu.jsx';
import RoutesConfig from './components/RoutesConfig.jsx';
import { Layout, Spin } from 'antd';

const { Header, Content } = Layout;

function App() {
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
