import React from "react";
import {
  createStyles,
  InputBase,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    search: {
      position: "relative",
      boxShadow: theme.shadows[4],
      borderRadius: theme.shape.borderRadius,
      marginLeft: 0,
      width: "100%",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      width: "100%",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: "100%",
    },
  })
);

function Search() {
  const classes = useStyles();
  return (
    <Toolbar disableGutters className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon color={"primary"} />
        </div>
        <InputBase
          placeholder={"Search..."}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </Toolbar>
  );
}

export default Search;
