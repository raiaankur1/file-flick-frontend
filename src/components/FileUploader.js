import React, { useContext, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { AuthContext } from "../context/auth/AuthState";
import axios from "axios";
const { Dragger } = Upload;

const FileUploader = ({ url, changeUrl }) => {
  const { isAuthenticated, token } = useContext(AuthContext);
  const [defaultFileList, setDefaultFileList] = useState([]);

  
  const validator = (file) => {
    if (file.size > 5242880) {
      console.log("cancelled");
      message.error("File is too large. Please upload upto 5MB");
      return false;
    }
    console.log("upload called from validator")
    //uploader(file);
  };

  const uploader = async (options) => {

    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    
    fmData.append('file', file);
    
    if (isAuthenticated){
      console.log(file);
      const config1 = {
        headers: { 'content-type': 'FormData', 'Authorization':"Token "+token },
      };
      try {
        const res = await axios.post(
          'https://file-flick.up.railway.app/FMS/userupload',
          fmData,
          config1
        );
  
        onSuccess('Ok');
        console.log('server res: ', res);
        changeUrl(res.data.url)
      } catch (err) {
        console.log('Eroor: ', err);
        
        onError({ err });
      }
   
    }
    else{
      console.log("guest uploader called")
      const config2 = {
        headers: { 'content-type': 'FormData' },
      };
      try {
        const res = await axios.post(
          'https://file-flick.up.railway.app/FMS/guestupload',
          fmData,
          config2
        );
  
        onSuccess('Ok');
        console.log('server res: ', res);
        changeUrl(res.data.url)
      } catch (err) {
        console.log('Eroor: ', err);
        
        onError({ err });
      }
      
    }
    // const res = await axios({
    //   url: `http://127.0.0.1:8000/FMS/${
    //     isAuthenticated ? "userupload" : "guestupload"
    //   }`,
    //   method: "POST",
    //   headers: isAuthenticated ? { Authorization: "Token " + token, "Content-Type": "FormData" } : { "Content-Type": "FormData"},
    //   data: formData,
    // });
    // console.log(res.data)
    // changeUrl(res.data.url)
  };
  const props = {
    name: "file",
    customRequest:uploader,
    beforeUpload: validator,
    // onChange(info) {
    //   //uploader(info.file);
    //   const { status } = info.file;
    //   if (status !== "uploading") {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (status === "done") {
    //     message.success(`${info.file.name} file uploaded successfully.`);
    //     console.log(info);
        
    //   } else if (status === "error") {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single. Strictly prohibited from uploading company data or
        other banned files.
      </p>
    </Dragger>
  );
};
export default FileUploader;
