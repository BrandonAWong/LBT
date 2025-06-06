import SearchTable from './SearchTable.jsx';
import { Button } from 'antd';

const JobTitleTable = ({ setSelectedTitle }) => {
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
        dataIndex: 'userCount',
        key: 'userCount',
        sorter: (a, b) => a.userCount - b.userCount,
        ellipsis: true,
        width: 105
      }
  ];

  const _data = [{key: 1, jobTitle: 'Manager', userCount: 15}, 
    {key: 2, jobTitle: 'Intern', userCount: 4},
    {key: 3, jobTitle: 'brandon', userCount: 1},
  {key: 4, jobTitle: 'Intern', userCount: 4},
{key: 5, jobTitle: 'Intern', userCount: 4},
{key: 6, jobTitle: 'Intern', userCount: 4},
{key: 7, jobTitle: 'Intern', userCount: 4},
{key: 8, jobTitle: 'Intern', userCount: 4},
{key: 9, jobTitle: 'Intern', userCount: 4},
{key: 10, jobTitle: 'Intern', userCount: 4},
{key: 11, jobTitle: 'Intern', userCount: 4},];

  return (
    <SearchTable columns={columns} 
                 data={_data} 
                 searchField="jobTitle"
                 title="Job Titles" 
                 placeholder="Search By Job Title" />
  )
}

export default JobTitleTable;
