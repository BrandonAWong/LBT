import SearchTable from './SearchTable.jsx';
import { Button } from 'antd';

const JobTitleTable = ({ data, setSelectedTitle }) => {
  const columns = [
      {
          title: 'Job Title',
          dataIndex: 'jobTitle',
          key: 'jobTitle',
          render: text => <Button color='primary' variant='filled' onClick={() => setSelectedTitle(text)}>{text}</Button>,
          sorter: (a, b) => a.jobTitle.toLowerCase().localeCompare(b.jobTitle.toLowerCase()),
          ellipsis: true
      },
      {
        title: 'User Count',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        ellipsis: true,
        width: 105
      }
  ];

  return (
    <SearchTable columns={columns} 
                 data={data} 
                 searchField="jobTitle"
                 title="Job Titles" 
                 placeholder="Search By Job Title" />
  )
}

export default JobTitleTable;
