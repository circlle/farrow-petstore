import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router";

export type TopBarProps = {
  title: string;
  needBack?: boolean;
};

function TopBar({ title, needBack = true }: TopBarProps) {
  const history = useHistory();
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        {needBack && (
          <IconButton
            edge="start"
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
