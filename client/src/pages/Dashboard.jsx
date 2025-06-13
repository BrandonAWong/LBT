import { useState, useEffect, useRef } from 'react';
import { Spin, message, FloatButton, Tour, List, Card } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import JobTitleTable from '../components/JobTitleTable.jsx';
import SecurityGroupsTable from '../components/SecurityGroupTable.jsx';
import BarChart from '../components/charts/BarChart.jsx';
import DoughnutChart from '../components/charts/DoughnutChart.jsx';
import PolarChart from '../components/charts/PolarChart.jsx';
import RadarChart from '../components/charts/RadarChart.jsx';
import './Dashboard.css';

const Dashboard = () => {
  const [titles, setTitles] = useState([]);
  const [groups, setGroups] = useState([]);
  const [commonGroups, setCommonGroups] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
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
    }
  ]

  // on load
  useEffect(() => {
    async function getTitles() {
      try {
        const response = await fetch("http://localhost:5041/api/active-directory/titles")
        
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
          // fill with good link
          const response = await fetch(`http://localhost:5041/api/active-directory/titles/${encodeURIComponent(selectedTitle)}/groups`);

          if (response.ok) {
            const data = await response.json();
              
            const transformed = Object.entries(data).map(([key, value]) => ({
              securityGroup: key,
              count: value
            }));

            setGroups(transformed);
            
            const maxGroupMembers = Math.max(...transformed.map((v, _) => v.count));
            setCommonGroups(transformed.filter(t => t.count == maxGroupMembers));
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
                             setSelectedTitle={setSelectedTitle} />
            </div>
            <SecurityGroupsTable data={groups} />
        </div>
  
        <div style={{
                flex: 2
            }}
            className="flex-col">
            <Card size="default"
                  title="Shared Groups">
              <List dataSource={commonGroups}
                    bordered
                    renderItem={(item) => <List.Item>{item.securityGroup}</List.Item>} />
            </Card>
            <BarChart data={groups.map((v, _) => v.count)}
                      labels={groups.map((v, _) => v.securityGroup)}
                      title="Group Distribution" />
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
