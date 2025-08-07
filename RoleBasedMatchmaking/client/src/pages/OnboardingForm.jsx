import { Card, 
         DatePicker, 
         message, 
         Form, 
         Input, 
         InputNumber,
         AutoComplete, 
         Checkbox, 
         Button,
         Result } from 'antd';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import API_BASE_URL from '../config/api.js';
import HTTP_STATUS from '../constants/httpStatus.js'

const OnboardingForm = () => {
  const inputWidth = '500px';
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage();
  const [titles, setTitles] = useState([]);
  const [titleAutoComp, setTitleAutoComp] = useState([]);
  const [distributionGroups, setDistributionGroups] = useState([]);
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const equipments = [
    { label: "Cell Phone", value: "Cell Phone" },
    { label: "Laptop", value: "Laptop", disabled: selectedEquipments.includes('Desktop') },
    { label: "Desktop", value: "Desktop", disabled: selectedEquipments.includes('Laptop') },
    { label: "Radio", value: "Radio" },
    { label: "Keys", value: "Keys" },
    { label: "Badge", value: "Badge" },
  ];
  const { user } = useAuth();

  useEffect(() => {
    async function getTitles() {
      try {
        const response = await fetch(`${API_BASE_URL}/active-directory/titles`)
        
        if (response.ok) {
          const data = await response.json()

          const transformed = Object.entries(data).map(([key, value]) => ({
            value: key,
          }));

          setTitles(transformed);
        }
        else {
          throw new Error(`Response status: ${response.status}`);
        }
      } 
      catch (error) {
          messageApi.open({ type: 'error', content: error.message });
      }
    }

    getTitles();
  }, [])

  useEffect(() => {
    async function getFormDistributionGroups() {
      try {
        const response = await fetch(`${API_BASE_URL}/role-pipeline/form-distribution-groups`)

        if (response.ok) {
          const data = await response.json();
          setDistributionGroups(data.map(group => group.name));
        }
        else {
          throw new Error(`Response status: ${response.status}`);
        }
      } 
      catch (error) {
          messageApi.open({ type: 'error', content: error.message });
      }
    }

    getFormDistributionGroups();
  }, []);

  useEffect(() => {
    form.setFieldValue("openedBy", user?.name);
  }, [user]);

  const titleSelected = async (title) => {
    const detailsResponse = await fetch(`${API_BASE_URL}/role-pipeline/titles/${encodeURIComponent(title)}`);

    if (detailsResponse.status === HTTP_STATUS.OK) {
      const data = await detailsResponse.json();
      form.setFieldValue('department', data.department)
    }

    const adResponse = await fetch(`${API_BASE_URL}/active-directory/titles/${encodeURIComponent(title)}/groups`);

    if (adResponse.ok) {
      const data = await adResponse.json();

      const transformed = Object.entries(data).map(([key, value]) => ({
        group: key,
        count: value
      }));

      const maxGroupMembers = Math.max(...transformed.map((v, _) => v.count));
      const newGroups = transformed
        .filter(t => t.count === maxGroupMembers && distributionGroups.includes(t.group))
        .map(t => t.group);
      form.setFieldValue('distributionGroups', newGroups);
    }
  };

  const submitForm = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/servicenow/tickets`, {
        method: 'POST',
        body: JSON.stringify(form.getFieldsValue()),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === HTTP_STATUS.CREATED) {
        form.resetFields();
        setSelectedEquipments([]);
        setShowResult(true);
        messageApi.open({ type: 'success', content: 'Submitted' });
      }
      else {
        throw new Error(`Response status: ${response.status}`);
      }
    }
    catch (error) {
      messageApi.open({ type: 'error', content: error.message });
    }
  }

  return (
    <>
      {showResult
        ? <Result
            status="success"
            title="Employee Form successfully submitted!"
            extra={[
              <Button type="primary" onClick={() => setShowResult(false)}>Close</Button>
            ]}
            style={{marginTop: "12%"}} />
        : <Card title="New Employee IT Form"
                style={{width: '50%', margin: "auto"}}>
          {contextHolder}

          <Form form={form}
                layout="vertical"
                onFinish={submitForm}>
            <div style={{display: "flex", gap: '40px'}}>
              <Card>
                <Form.Item name="openedBy" hidden>
                  <Input />
                </Form.Item>

                <Form.Item name="startDate"
                          label="Start Date"
                          rules={[{ required: true, message: 'Start Date is required' }]}>
                  <DatePicker allowClear={false}
                              size="large"
                              format="M/D/YYYY"
                              style={{width: inputWidth}}
                              placeholder=""
                              placement="bottomRight" />
                </Form.Item>

                <Form.Item name="employeeName"
                          label="Employee Name"
                          rules={[{ required: true, message: 'Employee Name is required' }]}>
                  <Input size="large"
                        style={{width: inputWidth}} />
                </Form.Item>

                <Form.Item name="employeeId"
                          label="Employee ID"
                          rules={[
                            {
                              validator(_, value) {
                                if (!value || value.toString().length === 4) {
                                  return Promise.resolve();
                                }
                                return Promise.reject('Must be 4 digits');  
                              }
                            }
                          ]}>
                  <InputNumber size="large"
                              style={{width: inputWidth}}
                              controls={false} />
                </Form.Item>

                <Form.Item name="title"
                          label="Title"
                          rules={[{ required: true, message: 'Title is required' }]}>
                  <AutoComplete size="large"
                                style={{width: inputWidth}}
                                options={titleAutoComp}
                                onSearch={text => 
                                  setTitleAutoComp(titles.filter(t => 
                                    t.value.toLowerCase().startsWith(text.toLowerCase())))} 
                                onSelect={titleSelected}/>
                  </Form.Item>

                <Form.Item name="department"
                          label="Department"
                          rules={[{ required: true, message: 'Department is required' }]}>
                  <Input size="large"
                        style={{width: inputWidth}} />
                </Form.Item>
                <Form.Item name="ellipseClone"
                          label="Ellipse Clone (Employee Name & ID)">
                  <Input size="large"
                        style={{width: inputWidth}} />
                </Form.Item>
                <Form.Item name="equipment"
                          label="Company Equipment List">
                  <Checkbox.Group options={equipments}
                                  value={selectedEquipments}
                                  onChange={setSelectedEquipments} />
                </Form.Item>
                <Form.Item name="offices"
                          label="Offices">
                  <Checkbox.Group options={["LBTCO", "LBT1", "LBT2"]} />
                </Form.Item>
              </Card>

              <Card style={{maxHeight: "786px", overflowY: "auto"}}>
                <Form.Item name="distributionGroups"
                          label="Email Distribution Lists">
                  <Checkbox.Group options={distributionGroups}
                                  style={{ display: 'flex', flexDirection: 'column', gap: 10 }} />
                </Form.Item>
              </Card>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
              <Button type="primary" 
                      htmlType="submit"
                      size="large">
                Submit
              </Button>
            </div>
          </Form>
        </Card>
      }
    </>
  )
};

export default OnboardingForm;