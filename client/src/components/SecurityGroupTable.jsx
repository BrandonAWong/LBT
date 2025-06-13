import SearchTable from './SearchTable.jsx';

const SecurityGroupTable = ({ data }) => {
  const columns = [
      {
          title: 'Group',
          dataIndex: 'securityGroup',
          key: 'securityGroup',
          sorter: (a, b) => a.securityGroup.toLowerCase().localeCompare(b.securityGroup.toLowerCase()),
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
                 searchField="securityGroup"
                 title="Security Groups"
                 placeholder="Seach By Group" />
  )
};

export default SecurityGroupTable;
