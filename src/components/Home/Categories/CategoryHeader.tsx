import {
  Avatar,
  createStyles,
  Link,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
      display: "block",
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
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

function CategoryHeader() {
  const classes = useStyles();
  return (
    <Paper>
      <Toolbar>
        <Avatar
          className={`${classes.avatar} ${classes.orange} ${classes.small}`}
          variant={"circular"}
        >
          C
        </Avatar>
        <Typography className={classes.title} variant="h6" noWrap>
          cats
        </Typography>
        <Link>See All</Link>
      </Toolbar>
    </Paper>
  );
}

export default CategoryHeader;
