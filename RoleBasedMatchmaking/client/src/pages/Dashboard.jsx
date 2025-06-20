import { useState, useEffect, useRef } from 'react';
import { Spin, message, FloatButton, Tour, List, Card } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import JobTitleTable from '../components/JobTitleTable.jsx';
import GroupsTable from '../components/GroupsTable.jsx';
import EllipseDetails from '../components/EllipseDetails.jsx';
import API_BASE_URL from '../config/api.js';
import './Dashboard.css';

const Dashboard = () => {
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');

  const [groups, setGroups] = useState([]);
  const [commonGroups, setCommonGroups] = useState([]);

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
          const response = await fetch(`${API_BASE_URL}/active-directory/titles/${encodeURIComponent(selectedTitle)}/groups`);

          if (response.ok) {
            const data = await response.json();
              
            const transformed = Object.entries(data).map(([key, value]) => ({
              group: key,
              count: value
            }));

            setGroups(transformed);
            
            const maxGroupMembers = Math.max(...transformed.map((v, _) => v.count));
            setCommonGroups(transformed.filter(t => t.count == maxGroupMembers));
          }
          else {
            throw new Error(`Response status: ${response.status}`);
          }

          // ellipse data
          const response2 = await fetch(`${API_BASE_URL}/role-pipeline/ellipse/${encodeURIComponent(selectedTitle)}/details`);

          if (response2.status === 200) {
            const data = await response2.json();

            const transformed = Object.entries(data).map(([key, value], index) => ({
              key: index,
              label: key,
              children:   typeof value === 'boolean'
                ? value ? 'Yes' : 'No'
                : value === null
                ? 'N/A'
                : value
            }));

            setEllipseItems(transformed);
          }
          else {
            if (response2.status != 204) {
              throw new Error(`Response status: ${response2.status}`);
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
                flex: 0.7
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
                flex: 0.8
            }}
            className="flex-col">
            <Card size="default"
                  title="Common Groups">
              <List dataSource={commonGroups}
                    bordered
                    renderItem={(item) => <List.Item>{item.group}</List.Item>} />
            </Card>
        </div>

        <div style={{
                flex: 1
            }}
            className="flex-col">
            <EllipseDetails items={ellipseItems} />
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
