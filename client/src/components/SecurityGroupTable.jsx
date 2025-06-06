import SearchTable from './SearchTable.jsx';

const SecurityGroupTable = () => {
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
        dataIndex: 'userCount',
        key: 'userCount',
        sorter: (a, b) => a.userCount - b.userCount,
        ellipsis: true,
        width: 105
      },
  ];

  return (
    <SearchTable columns={columns} 
                 data={[{key: 1, securityGroup: 'OKTA - Verification', userCount: 5}]}
                 searchField="securityGroup"
                 title="Security Groups"
                 placeholder="Seach By Group" />
  )
};

export default SecurityGroupTable;
