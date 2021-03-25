import React from "react";
import CategoryHeader from "./CategoryHeader";
import CategoryCard from "./CategoryCard";
import { createStyles, makeStyles } from "@material-ui/core";
import cat1 from "../../../images/cat1.jpeg";
import cat2 from "../../../images/cat2.jpeg";

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(2),
    },
    cards: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    card: {
      width: "48%",
    },
  })
);
const images = [cat1, cat2];
function Category() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.header}>
        <CategoryHeader />
      </div>
      <div className={classes.cards}>
        {[0, 1].map((id) => {
          return (
            <div key={id} className={classes.card}>
              <CategoryCard image={images[id]} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
