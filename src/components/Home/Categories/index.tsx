import React, { useEffect, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import Category from "./Category";
import {
  Category as CategoryInterface,
  api as CategoryApi,
} from "@server-api/category";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
  })
);

function Categories() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar()
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  useEffect(() => {
    CategoryApi.getCategoryList({ limit: 5 })
      .then((data) => {
        setCategories(data.list);
      })
      .catch((err) => {
        enqueueSnackbar("fetch categories info failed", {variant: "error"})
      });
  }, []);
  return (
    <div className={classes.root}>
      {
        categories.map(category => {
          return <Category key={category.id} item={category} />
        })
      }
    </div>
  );
}

export default Categories;
