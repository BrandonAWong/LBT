import { Layout } from 'antd';
import Dashboard from './pages/Dashboard';
const { Header, Content } = Layout;

function App() {
  const headerVh = 5

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
          height: `${headerVh}vh`
        }}
      >
      </Header>

      <Content>
        <div style={{
              padding: 24,
              minHeight: `${100 - headerVh}vh`,
            }}
        >
          <Dashboard />
        </div>
      </Content>
    </Layout>
  )
}

export default App;
