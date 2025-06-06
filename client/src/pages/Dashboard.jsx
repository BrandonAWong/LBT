import { useState, useEffect, useRef } from 'react';
import { Spin, message, FloatButton, Tour } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import AdUserTable from '../components/AdUserTable.jsx';
import JobTitleTable from '../components/JobTitleTable.jsx';
import SecurityGroupsTable from '../components/SecurityGroupTable.jsx';
import DoughnutChart from '../components/charts/DoughnutChart.jsx';
import PolarChart from '../components/charts/PolarChart.jsx';
import RadarChart from '../components/charts/RadarChart.jsx';
import './Dashboard.css';

const Dashboard = () => {
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
      const response = await fetch("api/active-directory/titles")
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
          const response = await fetch("https://goasdaogle.com")

          if (response.ok) {
            // parse date
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
            <div ref={jobTitleTable}><JobTitleTable setSelectedTitle={setSelectedTitle} ref={jobTitleTable} /></div>
            <SecurityGroupsTable />
        </div>
  
        <div className="flex-col">
            <PolarChart title="Job Title Distribution" />
            <RadarChart title="Security Group Distribution" />
        </div>
  
        <div style={{
                flex: 2
            }}
            className="flex-col">
            <AdUserTable />
        </div>
      </div>

      <FloatButton icon={<QuestionCircleOutlined />} type="primary" onClick={() => setOpenTour(true)} />
      <Tour open={openTour} onClose={() => setOpenTour(false)} steps={tourSteps} />
    </Spin>
  )
};

export default Dashboard;
