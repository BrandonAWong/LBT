import JobTitleTable from './components/JobTitleTable.jsx';
import { Layout } from 'antd';
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
            height: '5vh'
          }}
      >

      </Header>

      <Content>
        <div
          style={{
            padding: 24,
            minHeight: '95vh'
          }}
        >
          <JobTitleTable></JobTitleTable>
        </div>
      </Content>
    </Layout>
  )
}

export default App;
