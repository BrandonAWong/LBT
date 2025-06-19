import { useState, useEffect } from 'react';
import { Table, Card, Input } from 'antd'
const { Search } = Input;

const SearchTable = ({columns, data, searchField, pageSize=5, title="Search", placeholder="Search"}) => {
  const [loading, setLoading] = useState(false);
  const [displayData, setDisplayData] = useState(data);

  const filterData = (value) => {
    if (!value) {
      setDisplayData(data);
    }
    else {
        setDisplayData(data.filter(d => d[searchField].toLowerCase().includes(value.toLowerCase())));
    }
  }

  useEffect(() => {
    setDisplayData(data);
  }, [data]);

  return (
    <Card size="default"
          title={title}
    >
    <Search placeholder={placeholder}
            enterButton
            loading={loading}
            size="default" 
            onSearch={filterData}
            style={{
                marginBottom: '25px'
            }} 
    />

      <Table columns={columns} 
             dataSource={displayData} 
             pagination={{ position: ['bottomCenter'], pageSize: pageSize, showSizeChanger: false }}
             size="small" />
    </Card>
  )
}

export default SearchTable;
