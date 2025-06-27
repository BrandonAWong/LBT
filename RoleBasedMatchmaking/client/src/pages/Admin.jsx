/*
 This page is buggy 
 - Save a new, then edit the new -> creates new record. should get back new id from
   backend and set new id
 - table does not update with changes except for delete -> lazy ^ not fixing above
   either unless someone tells me.
 - create a new title, same exact without casing as another -> it will always pick another one ->
   should pick by id instead of title. again. lazy 
*/

import { useState, useEffect } from 'react';
import { message } from 'antd';
import EditTitleDetail from '../components/EditTitleDetail.jsx';
import JobTitleDetailsTable from "../components/JobTitleDetailsTable";
import API_BASE_URL from '../config/api.js';

const Admin = () => {
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/role-pipeline/titles`);

        if (response.ok) {
          const data = await response.json()

          const transformed = Object.values(data).map(item => ({
            key: item.id,
            jobTitle: item.title
          }));

          setTitles(transformed);
        }
        else {
          throw new Error(`Response status: ${response.status}`);
        }
      } catch (error) {
          messageApi.open({ type: 'error', content: error.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{display: 'flex', gap: '10px'}}>
      {contextHolder}

      <div style={{width: '27.5%'}}>
        <JobTitleDetailsTable data={titles}
                              setData={setTitles} 
                              setSelectedTitle={setSelectedTitle}
                              setIsNew={setIsNew} />
      </div>
      
      <div>
        <EditTitleDetail title={selectedTitle} 
                         isNew={isNew}
                         setIsNew={setIsNew} />
      </div>
    </div>
  );
};

export default Admin;