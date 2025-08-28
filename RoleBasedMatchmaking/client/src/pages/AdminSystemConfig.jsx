// for editing constants

import SearchTable from '../components/SearchTable.jsx'
import { useState, useEffect } from 'react';
import { Button, Space, Popconfirm, message, Form, Input } from 'antd';
import { CloseCircleOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import API_BASE_URL from '../config/api.js';
import HTTP_STATUS from '../constants/httpStatus.js';

const AdminSystemConfig = () => {
  const [constants, setConstants] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('');
  const isEditing = record => record.name === editingKey;

  const columns = [
      {
        title: 'Key',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        ellipsis: true              
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        ellipsis: true,
        render: (_, record) => (
          !isEditing(record) ? (
            <p>{record.value}</p>
          ) : (
            <>
              <Form.Item
                name="value"
                className="ant-table-cell"
                rules={[{ required: true, message: 'Value is required' }]}
                style={{width: '80%'}}>
                  <Input />
              </Form.Item>
              <Form.Item name="name" hidden>
                  <Input />
              </Form.Item>
            </>
          )
        )
      },
      {
        title: 'Actions',
        key: 'actions',
        width: '90px',
        render: (_, record) => (
          !isEditing(record) ? (
            <Button shape="circle"
                    icon={<EditOutlined />}
                    color="primary"
                    variant="outlined"
                    onClick={() => edit(record)} 
                    disabled={editingKey !== ''} />
          ) : (
            <Space>
              <Button 
                shape="circle"
                icon={<SaveOutlined />}
                color="green"
                variant="outlined"
                onClick={() => saveRow(record.name)} />
              <Popconfirm 
                title="Cancel Edit"
                description="Are you sure to cancel editing?"
                onConfirm={() => cancelEdit()}
                okText="Yes"
                cancelText="No">
                  <Button 
                    shape="circle"
                    icon={<CloseCircleOutlined />}
                    color="danger"
                    variant="outlined" />
              </Popconfirm>
            </Space>
          )
        )
      }
  ];

  const edit = record => {
    form.setFieldsValue({
      name: record.name,
      value: record.value,
    });
    setEditingKey(record.name);
  }

  const cancelEdit = () => {
    setEditingKey('');
  }

  const saveRow = async (key) => {
    try {
      await form.validateFields();
      const data = form.getFieldsValue();
      const response = await fetch(`${API_BASE_URL}/constants/${key}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === HTTP_STATUS.NO_CONTENT) {
        messageApi.open({ type: 'success', content: 'Success' });
        setEditingKey('');
        setConstants(prev =>
          prev.map(item =>
            item.name === key ? { ...item, value: data.value } : item
          )
        );
      }
      else {
        throw new Error(`Response status: ${response.status}`);
      }
    }
    catch (error) {
      if (typeof(error.message) === 'string')
        messageApi.open({ type: 'error', content: error.message });
    }
  }

  useEffect(() => {
    async function getSystemConstants() {
      try {
        const response = await fetch(`${API_BASE_URL}/constants`)

        if (response.ok) {
          setConstants(await response.json());
        }
        else {
          throw new Error(`Response status: ${response.status}`);
        }
      } 
      catch (error) {
          messageApi.open({ type: 'error', content: error.message });
      }
    }

    getSystemConstants();
  }, []);

  return (
    <>
      {contextHolder}
      <Form form={form} component={false}>
        <SearchTable title="System Variables"
                    columns={columns}
                    data={constants}
                    searchField="name" />
      </Form>
    </>
  );
};

export default AdminSystemConfig;