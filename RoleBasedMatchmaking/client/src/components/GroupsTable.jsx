import SearchTable from './SearchTable.jsx';

const GroupsTable = ({ data }) => {
  const columns = [
      {
          title: 'Group',
          dataIndex: 'group',
          key: 'group',
          sorter: (a, b) => a.group.toLowerCase().localeCompare(b.group.toLowerCase()),
          ellipsis: true,
      },
      {
        title: 'User Count',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        ellipsis: true,
        width: 105
      },
  ];

  return (
    <SearchTable columns={columns} 
                 data={data}
                 searchField="group"
                 title="Groups"
                 placeholder="Seach By Group" />
  )
};

export default GroupsTable;
