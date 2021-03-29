import {
  Avatar,
  createStyles,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Category } from "@server-api/category";
import React from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
    },
    wrapper: {
      height: "100%",
      width: "100%",
      paddingTop: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#f9f9f9",
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  })
);

export type CategoryDetailHeaderProps = {
  category: Category;
};
function CategoryDetailHeader(props: CategoryDetailHeaderProps) {
  const { category } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.wrapper} elevation={0}>
        <Avatar className={classes.large} src={category.image}></Avatar>
        <Typography variant={"h4"} gutterBottom>
          {category.name}
        </Typography>
        <Typography variant={"caption"}>{category.description}</Typography>
      </Paper>
    </div>
  );
}

export default CategoryDetailHeader;
