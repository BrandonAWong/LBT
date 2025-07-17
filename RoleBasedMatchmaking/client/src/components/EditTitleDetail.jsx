import { useState, useEffect } from 'react';
import { Card, Skeleton, message, Form, Input, Checkbox, Button } from 'antd';
import API_BASE_URL from '../config/api.js';
import HTTP_STATUS from '../constants/httpStatus.js'

const EditTitleDetail = ({ title, isNew=false, setIsNew }) => {
  const [form] = Form.useForm()
  const [showForm, setShowForm] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
      const fetchData = async () => {
        try {      
          const response = await fetch(`${API_BASE_URL}/role-pipeline/titles/${encodeURIComponent(title)}`);

          if (response.ok) {
            const data = await response.json();

            form.setFieldsValue({
              id: data.id,
              title: data.title,
              department: data.department,
              activeDirectory: data.activeDirectory,
              email: data.email,
              phoneNumber: data.phoneNumber,
              ellipseAccess: data.ellipseAccess,
              ellipsePosition: data.ellipsePosition,
              hastus: data.hastus,
              transitMaster: data.transitMaster,
              mdt: data.mdt,
              adobeAcrobat: data.adobeAcrobat,
              docusign: data.docusign,
              officeLicense: data.officeLicense,
              zoomAccount: data.zoomAccount,
              corvu: data.corvu,
              distributionGroup: data.distributionGroup,
              securityGroup: data.securityGroup
            })

            setShowForm(true);
          }
          else {
            throw new Error(`Response status: ${response.status}`);
          }
        } 
        catch (error) {
            messageApi.open({ type: 'error', content: error.message });
        }
      }

      if (title) {
        fetchData();
      }
  }, [title]);

  useEffect(() => {
    if (isNew) {
      setShowForm(true);
      form.resetFields();
    }
  }, [isNew]);

  const validateTitle = () => {
    form.setFieldValue('title', form.getFieldValue('title').trim());
  }

  const submitForm = async () => {
    if (!form.getFieldValue('title')) {
      return;
    }

    const response = await fetch(`${API_BASE_URL}/role-pipeline/titles`, {
      method: isNew ? 'POST' : 'PUT',
      body: JSON.stringify(form.getFieldsValue()),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      messageApi.open({ type: 'success', content: 'Saved'})

      if (isNew) {
        setIsNew(false);
        form.setFieldValue('id', await response.json());
      }
      
    }
    else if (response.status === HTTP_STATUS.CONFLICT) {
      messageApi.open({ type: 'error', content: response.json().then(r => r.error)})
    }
    else {
      messageApi.open({ type: 'error', content: 'Save Failed'})
    }
  };
  
  return (
    <Card title="Job Title Details">
      {contextHolder}
      
      {showForm != true ? (
        <Skeleton paragraph={{ rows: 7, width: 875 }} />
      ) : (
        <Form form={form}
              labelCol={{ span: 5 }}
              initialValues={{
                activeDirectory: false,
                email: false,
                phoneNumber: false,
                ellipseAccess: false,
                ellipsePosition: false,
                hastus: false,
                transitMaster: false,
                mdt: false,
                adobeAcrobat: false,
                docusign: false,
                officeLicense: false,
                zoomAccount: false,
                corvu: false,
              }}>

          <Form.Item name="id" hidden preserve={true}>
            <Input />
          </Form.Item>
              
          {/* title + department */}
          <div style={{display: 'flex', gap: '15px'}}>
            <Form.Item name="title"
                       style={{width: '33%', minWidth: '430px'}}
                       rules={[{ required: true, message: 'Title is required' }]}>
              <Input onBlur={validateTitle}
                     addonBefore="Title" />
            </Form.Item>

            <Form.Item name="department"
                       style={{width: '33%', minWidth: '430px'}}>
              <Input addonBefore="Department" />
            </Form.Item>
          </div>

          {/* groups */}
          <div style={{display: 'flex', gap: '15px'}}>
            <Form.Item name="securityGroup"
                       style={{width: '33%', minWidth: '430px'}}>
              <Input addonBefore="Security Group" />
            </Form.Item>

            <Form.Item name="distributionGroup"
                       style={{width: '33%', minWidth: '430px'}}
                       >
              <Input addonBefore="Distribution Group" />
            </Form.Item>
          </div>
          
          {/* checkboxes */}
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '25px', maxWidth: '800px'}}>
            <Form.Item name="activeDirectory" valuePropName="checked">
              <Checkbox>Active Directory</Checkbox>
            </Form.Item>

            <Form.Item name="email" valuePropName="checked">
              <Checkbox>Email</Checkbox>
            </Form.Item>

            <Form.Item name="phoneNumber" valuePropName="checked">
              <Checkbox>Phone Number</Checkbox>
            </Form.Item>

            <Form.Item name="ellipseAccess" valuePropName="checked">
              <Checkbox>Ellipse Access</Checkbox>
            </Form.Item>

            <Form.Item name="ellipsePosition" valuePropName="checked">
              <Checkbox>Ellipse Position</Checkbox>
            </Form.Item>

            <Form.Item name="hastus" valuePropName="checked">
              <Checkbox>Hastus</Checkbox>
            </Form.Item>

            <Form.Item name="transitMaster" valuePropName="checked">
              <Checkbox>Transit Master</Checkbox>
            </Form.Item>

            <Form.Item name="mdt" valuePropName="checked">
              <Checkbox>MDT</Checkbox>
            </Form.Item>

            <Form.Item name="adobeAcrobat" valuePropName="checked">
              <Checkbox>Adobe Acrobat</Checkbox>
            </Form.Item>

            <Form.Item name="docusign" valuePropName="checked">
              <Checkbox>DocuSign</Checkbox>
            </Form.Item>

            <Form.Item name="officeLicense" valuePropName="checked">
              <Checkbox>Office License</Checkbox>
            </Form.Item>

            <Form.Item name="zoomAccount" valuePropName="checked">
              <Checkbox>Zoom Account</Checkbox>
            </Form.Item>

            <Form.Item name="corvu" valuePropName="checked">
              <Checkbox>CorVu</Checkbox>
            </Form.Item>
          </div>

          <Button type="primary"
                  htmlType="submit"
                  onClick={submitForm}
                  style={{float: 'right'}}>
            Save
          </Button>
        </Form>
      )}
    </Card>
  );
};

export default EditTitleDetail;