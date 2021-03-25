import React from "react";
import {
  AppBar,
  createStyles,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AccountCircleOutlined, Menu as MenuIcon } from "@material-ui/icons";
import Search from "./Search";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: "1rem",
    },
    logo: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "block",
    },
    searchWrapper: {},
  })
);

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={4}>
        <AppBar position={"static"} color={"transparent"} elevation={0}>
          <Toolbar disableGutters>
            <AccountCircleOutlined
              className={classes.logo}
              color={"primary"}
              fontSize={"large"}
            />
            <Typography className={classes.title} variant="h6" noWrap>
              Dora Shop
            </Typography>
            <MenuIcon />
          </Toolbar>
        </AppBar>
        <Search />
      </Paper>
    </div>
  );
}

export default Header;
