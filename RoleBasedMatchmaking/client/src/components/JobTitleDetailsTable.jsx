// used on admin page to search for title details to modify

import SearchTable from "../components/SearchTable";
import { Button, Space, Popconfirm } from "antd";
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import API_BASE_URL from '../config/api.js';

const JobTitleDetailsTable = ({ data, setData, setSelectedTitle, setIsNew }) => {
  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      sorter: (a, b) => a.jobTitle.toLowerCase().localeCompare(b.jobTitle.toLowerCase()),
      ellipsis: true
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '90px',
      render: (_, record) => (
        <Space size="small">
          <Button shape="circle"
                  icon={<EditOutlined />}
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    setIsNew(false);
                    setSelectedTitle(record.jobTitle);
                  }} />

          <Popconfirm title="Delete this title"
                      description="Are you sure to delete this title?"
                      onConfirm={() => deleteTitle(record)}
                      okText="Yes"
                      cancelText="No">
            <Button shape="circle"
                  icon={<DeleteOutlined />}
                  color="danger"
                  variant="outlined" />
          </Popconfirm>
        </Space>
      )
    }
  ];

  const deleteTitle = async (record) => {
    setData(data.filter(d => d != record));
    await fetch(`${API_BASE_URL}/role-pipeline/titles/${record.key}`, { method: 'DELETE' });
  }

    return (
      <SearchTable columns={columns}
                   data={data}
                   pageSize={10}
                   searchField="jobTitle"
                   title={
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          Job Titles 
                          <div style={{display: 'flex', gap: '10px'}}>
                            <Button icon={<PlusCircleOutlined />}
                                    type="primary"
                                    onClick={() => setIsNew(true)}>
                              New
                            </Button>
                          </div>
                      </div>
                    } />
    );
};

export default JobTitleDetailsTable;