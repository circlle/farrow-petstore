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
import { Category } from "@server-api/category";
import { useHistory } from "react-router";

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

export type CategoryHeaderProps = {
  category: Category;
};
function CategoryHeader(props: CategoryHeaderProps) {
  const classes = useStyles();
  const history = useHistory();
  const onLinkClick = () => {
    history.push(`/category/${props.category.id}`);
  };
  return (
    <Paper>
      <Toolbar>
        <Avatar
          className={`${classes.avatar} ${classes.orange} ${classes.small}`}
          variant={"circular"}
        >
          {(props.category.name || "").slice(0, 1)}
        </Avatar>
        <Typography className={classes.title} variant="h6" noWrap>
          {props.category.name}
        </Typography>
        <Link onClick={onLinkClick}>See All</Link>
      </Toolbar>
    </Paper>
  );
}

export default CategoryHeader;
