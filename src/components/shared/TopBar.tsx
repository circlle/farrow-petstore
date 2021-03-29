import React from 'react'
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from 'react-router';

export type TopBarProps = {
  title: string
}

function TopBar(props: TopBarProps) {
  const history = useHistory()
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton
          edge="start"
          onClick={() => {
            history.goBack();
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">{props.title}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar
