import React from "react";
import Header from "./Header";
import Carousel from "./Carousel";
import Categories from "./Categories";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    header: {},
    search: {},
    carousel: {},
    category: {},
    marginTopHalf: {
      marginTop: ".5rem",
    },
    root: {
      background: "#f9f9f9",
    },
  })
);

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={`${classes.header}`}>
        <Header />
      </div>
      <div className={`${classes.carousel} ${classes.marginTopHalf}`}>
        <Carousel />
      </div>
      <div className={`${classes.category}`}>
        <Categories />
      </div>
    </div>
  );
}

export default Home;
