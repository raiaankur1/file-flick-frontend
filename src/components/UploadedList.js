import React, { Fragment , useContext, useEffect, useState} from 'react'
import { List, Button, Empty } from 'antd'
import {DeleteOutlined} from '@ant-design/icons'
import { AuthContext } from '../context/auth/AuthState'
import axios from 'axios'

  
const UploadedList = () => {
  const {user,token} = useContext(AuthContext);
  const [list, setList] = useState([])

useEffect(() => {
  getItems();
}, [])

const getItems = async () => {
  const config = {
    headers: {
      "Authorization": "Token "+token,
    },
  };
  try {
    const res = await axios.get("https://file-flick.up.railway.app/FMS/recent/",config);
    setList(res.data.uploads);
    console.log(res.data.uploads)
  } catch (err) {
    console.log(err.response);
  }
};

const deleteItem = async (id) => {
  const formData = new FormData()
  formData.append("uid", id.uid)
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + token,
    },
  };
  try {
    console.log({uid:id})
    
    await axios.delete("https://file-flick.up.railway.app/FMS/delete", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + token,
      },
      data: formData
    });
    
    // await axios.delete("https://file-flick.up.railway.app/FMS/delete",formData, config);
    setList([...list.filter((item) => item.url !== "URL object ("+id.uid+")")])
  } catch (err) {
    console.log(err);
  }
};



  const onclick = (e)=>{
    console.log(e.target.value.slice(12,48))
    deleteItem({uid:e.target.value.slice(12,48)})
  }
  return ( 
    <List
      header={<div>Previosly Uploaded Files</div>}
 
      bordered
      dataSource={list}
      renderItem={(item,key) => (
        <Fragment>{list.length ? <List.Item actions={[<Button value ={item.url} onClick={onclick} danger icon={<DeleteOutlined onClick={e=> e.stopPropagation() }/>}></Button> ]}>
       <List.Item.Meta
         
          title={item.filename}
          description={item.file}
        /> 
        </List.Item> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}</Fragment>
      )}
    />
  )
}

export default UploadedList