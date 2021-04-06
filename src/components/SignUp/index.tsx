import {
  createStyles,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import Header from "./Header";
import Content from "./Content";
import TopBar from "./TopBar";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "fixed",
      top: "100vh",
      left: 0,
      width: "100vw",
      height: "100vh",
      transition: "top .5s ease-in-out",
    },
    mask: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      // backgroundImage: `linear-gradient(#3580ff, #ff6243)`,
      // backgroundImage: `linear-gradient(#feac5e, #c779d0, #4bc0c8)`,
      // filter: "blur(30vh)",
      opacity: 0.5,
    },
    content: {
      width: "100%",
      height: "100%",
    },
    header: {
      marginTop: "5vh",
    },
  })
);

function SignUp() {
  const classes = useStyles();
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.style.top = "0vh";
    }
    return () => {
      if (rootRef.current) {
        rootRef.current.style.top = "100vh";
      }
    };
  });
  return (
    <div ref={rootRef} className={classes.root}>
      <div className={classes.mask} />
      <div className={classes.content}>
        <div>
          <TopBar />
        </div>
        <div className={classes.header}>
          <Header />
        </div>
        <div className={classes.content}>
          <Content />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
