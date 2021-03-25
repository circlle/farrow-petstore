import React from 'react'
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

function My() {
  let history = useHistory();
  const onLogin = () => {
    history.push(`/login`);
  };
  return (
    <Button variant={"contained"} color={"primary"} onClick={onLogin}>
      登录
    </Button>
  );
}

export default My;
