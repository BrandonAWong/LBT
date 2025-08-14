import SearchTable from '../components/SearchTable.jsx'
import { useState, useEffect } from 'react';
import { Button, Popconfirm, Space, message } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import API_BASE_URL from '../config/api.js';

const AdminForm = () => {
  const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
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
                    onClick={() => {}} 
                    disabled={true} />

            <Popconfirm title="Delete this distribution group"
                        description="Are you sure to delete this titledistribution group?"
                        onConfirm={() => deleteGroup(record)}
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

  const [distributionGroups, setDistributionGroups] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    async function getDistributionGroups() {
      try {
        const response = await fetch(`${API_BASE_URL}/role-pipeline/form-distribution-groups`)

        if (response.ok) {
          setDistributionGroups(await response.json());
        }
        else {
          throw new Error(`Response status: ${response.status}`);
        }
      } 
      catch (error) {
          messageApi.open({ type: 'error', content: error.message });
      }
    }

    getDistributionGroups();
  }, []);

  const deleteGroup = async (group) => {
    const response = await fetch(`${API_BASE_URL}/role-pipeline/form-distribution-groups/${group.id}`, { method: 'DELETE' });

    if (response.ok)
      setDistributionGroups(distributionGroups.filter(dg => dg.id != group.id))
  };

  return (
    <>
    {contextHolder}

    <SearchTable title={
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    Onboarding Form Email Distribution Groups
                    <div style={{display: 'flex', gap: '10px'}}>
                      <Button icon={<PlusCircleOutlined />}
                              type="primary"
                              onClick={() => setIsNew(true)}
                              disabled={true}>
                        New
                      </Button>
                    </div>
                  </div>
                }
                 columns={columns}
                 data={distributionGroups}
                 searchField="name" />
    </>
  );
};

export default AdminForm;