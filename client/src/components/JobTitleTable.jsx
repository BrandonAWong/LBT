import { useState } from 'react';
import { Table, Card, Input, Space, Button } from 'antd'
const { Search } = Input;

const JobTitleTable = () => {
  const [loading, setLoading] = useState(false);


  const columns = [
      {
          title: 'Job Title',
          dataIndex: 'jobTitle',
          key: 'jobTitle',
          render: text => <a>{text}</a>
      },
      {
        title: 'User Count',
        dataIndex: 'userCount',
        key: 'userCount'
      },
      {
        title: 'Action',
        key: 'action',
        width: 120,
        render: (_, record) => (
          <Space size="middle">
            <Button>View {record.jobTitle}s</Button>
          </Space>
        )
      }
  ];

  const data = [{key: 1, jobTitle: 'Manager', userCount: 15}, 
    {key: 2, jobTitle: 'Intern', userCount: 4},
    {key: 3, jobTitle: 'brandon', userCount: 1}];

  const onSearch = (value, setLoading) => {
    if (!value) {
      return;
    }

    // perform AD Search
    setLoading(true);
    console.log(value);
    // turn loading off
  }

  return (
    <Card size="default"
          title={<Search placeholder="Search for a job title" 
                         enterButton
                         loading={loading}
                         size="large" 
                         onSearch={(val) => onSearch(val, setLoading)} />}>
      
      <Table columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }}></Table>
    </Card>
  )
}

export default JobTitleTable;
