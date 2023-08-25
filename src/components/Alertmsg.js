import React, { useContext, Fragment, useEffect, useState } from "react";
import { Alert } from "antd";
import { AuthContext } from "../context/auth/AuthState";
const Alertmsg = () => {
  const { errors, removeErrors } = useContext(AuthContext);
  const [msg, setmsg] = useState(errors);
  useEffect(() => {
    setmsg(errors);
  }, [errors]);

  const onClose = () => {
    removeErrors();
  };
  return (
    <Fragment>
      {" "}
      {errors && (
        <Alert message={msg} type="error" closable onClose={onClose} />
      )}
      <br></br>
    </Fragment>
  );
};

export default Alertmsg;
