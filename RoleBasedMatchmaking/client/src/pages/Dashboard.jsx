import { useState, useEffect, useRef } from 'react';
import { Spin, message, FloatButton, Tour, List, Card } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import JobTitleTable from '../components/JobTitleTable.jsx';
import GroupsTable from '../components/GroupsTable.jsx';
import CardDetails from '../components/CardDetails.jsx';
import API_BASE_URL from '../config/api.js';
import './Dashboard.css';

const Dashboard = () => {
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');

  const [groups, setGroups] = useState([]);
  const [commonSecGroups, setCommonSecGroups] = useState([]);
  const [commonDistGroups, setCommonDistGroups] = useState([]);

  const [ellipseItems, setEllipseItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [openTour, setOpenTour] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const jobTitleTable = useRef(null);
  const tourSteps = [
    {
      title: 'Search',
      description: 'Enter a job title here',
      placement: 'left',
      target: () => jobTitleTable.current,
    },
    {
      title: 'Select',
      description: 'Pick a job title and watch as the data populates',
      placement: 'right',
      target: () => jobTitleTable.current,
    },
    {
      title: 'Matrix',
      description: 'Click "Generate Matrix" to generate an Excel job matrix of jobs and AD groups',
      placement: 'right',
      target: () => jobTitleTable.current,
    }
  ]

  // on load
  useEffect(() => {
    async function getTitles() {
      try {
        const response = await fetch(`${API_BASE_URL}/active-directory/titles`)
        
        if (response.ok) {
          const data = await response.json()

          const transformed = Object.entries(data).map(([key, value]) => ({
            jobTitle: key,
            count: value
          }));

          setTitles(transformed);
        }
        else {
          throw new Error(`Response status: ${response.status}`);
        }
      } catch (error) {
          messageApi.open({ type: 'error', content: error.message });
        }
        finally {
          setLoading(false);
        }
    }

    getTitles();
  }, [])

  // job title is selected
  useEffect(() => {
    async function fetchData() {
      if (selectedTitle) {
        setLoading(true);
        try {
          // AD Groups call
          const response = await fetch(`${API_BASE_URL}/active-directory/titles/${encodeURIComponent(selectedTitle)}/groups?raw=true`);

          if (response.ok) {
            const data = await response.json();

            // prob ebtter way of doing this stupid thing BUT IGTG
            const secGroups = Object.entries(data)
              .filter(([key, value]) => key.includes("OU=Domain - Security Groups"))
              .map(([key, value]) => ({
                group: key.split(',')[0].replace('CN=', ''),
                count: value
              }));

            const distGroups = Object.entries(data)
              .filter(([key, value]) => key.includes("OU=Domain - Distribution Groups"))
              .map(([key, value]) => ({
                group: key.split(',')[0].replace('CN=', ''),
                count: value
              }));

            const transformed = Object.entries(data).map(([key, value]) => ({
              group: key.split(',')[0].replace('CN=', ''),
              count: value
            }));

            setGroups(transformed);

            const maxGroupMembers = Math.max(...transformed.map((v, _) => v.count));
            setCommonSecGroups(secGroups.filter(t => t.count == maxGroupMembers));
            setCommonDistGroups(distGroups.filter(t => t.count == maxGroupMembers));
          }
          else {
            throw new Error(`Response status: ${response.status}`);
          }

          // details data
          const detailsResponse = await fetch(`${API_BASE_URL}/role-pipeline/titles/${encodeURIComponent(selectedTitle)}`);

          if (detailsResponse.status === 200) {
            const data = await detailsResponse.json();

            const transformed = Object.entries(data).map(([key, value], index) => ({
              key: index,
              label: key,
              children: typeof value === 'boolean'
                ? value ? 'Yes' : 'No'
                : value
            }));

            setEllipseItems(transformed);
          }
          else {
            if (detailsResponse.status != 204) {
              throw new Error(`Response status: ${detailsResponse.status}`);
            }
            
            setEllipseItems([]);
          }
        } catch (error) { 
          messageApi.open({ type: 'error', content: error.message });
        }
        finally {
          setLoading(false);
        }
      }
    }
    
    fetchData();
  }, [selectedTitle]);

  return (
    <Spin style={{
            minHeight: '100%'
          }}
          size="large"
          spinning={loading}
    >
      {contextHolder}
      <div className="flex-row">
        <div style={{
                flex: 0.8
            }}
            className="flex-col">
            <div ref={jobTitleTable}>
              <JobTitleTable data={titles} 
                             setSelectedTitle={setSelectedTitle}
                             setLoading={setLoading} />
            </div>
            <GroupsTable data={groups} />
        </div>
  
        <div style={{
                flex: 2
            }}
            className="flex-col">
            <CardDetails items={ellipseItems}
                         title="Profile Details" />

            <div className="flex-row">
              <Card size="default"
                    title="Common Security Groups"
                    style={{width: '50%'}}>
                <List dataSource={commonSecGroups}
                      bordered
                      renderItem={(item) => <List.Item>{item.group}</List.Item>}/>
              </Card>
                <Card size="default"
                    title="Common Distribution Groups"
                    style={{width: '50%'}}>
                <List dataSource={commonDistGroups}
                      bordered
                      renderItem={(item) => <List.Item>{item.group}</List.Item>}/>
              </Card>
            </div>

        </div>
      </div>

      <FloatButton icon={<QuestionCircleOutlined />} 
                   type="primary" 
                   onClick={() => setOpenTour(true)} />
      <Tour open={openTour} 
            onClose={() => setOpenTour(false)} steps={tourSteps} />
    </Spin>
  )
};

export default Dashboard;
