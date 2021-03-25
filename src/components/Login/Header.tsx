import {
  Avatar,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { deepOrange, deepPurple, orange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  })
);

function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar className={`${classes.orange} ${classes.large}`}>Pet</Avatar>
      <Typography variant={"h5"} gutterBottom>
        Pet Store
      </Typography>
      <Typography variant={"caption"} gutterBottom>
        Login to unlock more content
      </Typography>
    </div>
  );
}

export default Header;
