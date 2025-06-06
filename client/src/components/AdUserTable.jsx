import SearchTable from './SearchTable.jsx';
import { Button } from 'antd';

const JobTitleTable = ({ setSelectedTitle }) => {
  const columns = [
      {
          title: 'User ID',
          dataIndex: 'userId',
          key: 'userId',
          render: text => <Button color='primary' variant='filled' onClick={() => setSelectedTitle(text)}>{text}</Button>,
          sorter: (a, b) => a.userId.toLowerCase().localeCompare(b.userId.toLowerCase()),
          ellipsis: true
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        sorter: (a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()),
        ellipsis: true
      },
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        sorter: (a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()),
        ellipsis: true
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.toLowerCase().localeCompare(b.email.toLowerCase()),
        ellipsis: true
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        sorter: (a, b) => a.department.toLowerCase().localeCompare(b.department.toLowerCase()),
        ellipsis: true
      },
  ];

  const _data = []

  return (
    <SearchTable columns={columns} 
                 data={_data} 
                 searchField="userId"
                 title="Users" 
                 placeholder="Search By User ID" />
  )
}

export default JobTitleTable;
