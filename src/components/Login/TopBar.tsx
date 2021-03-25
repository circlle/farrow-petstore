import React from "react";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router";

function TopBar() {
  const history = useHistory();
  const onBack = () => {
    history.goBack();
  };
  return (
    <AppBar color={"transparent"} position={"static"} elevation={0}>
      <Toolbar>
        <IconButton edge={"start"} onClick={onBack}>
          <ArrowBack />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
