import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import Category from "./Category";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
  })
);

function Categories() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Category />
    </div>
  );
}

export default Categories;
