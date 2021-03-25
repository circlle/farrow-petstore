import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: { padding: theme.spacing(1) },
    media: {},
    cardContent: {
      padding: 0,
      "&:last-child": {
        paddingBottom: 0,
      },
    },
    image: {
      width: "100%",
      height: "100%",
    },
  })
);

export type CategoryCardProps = {
  image: string;
};
function CategoryCard(props: CategoryCardProps) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} title={"hello"}>
        <img src={props.image} alt={"product"} className={classes.image} />
      </CardMedia>
      <CardContent className={classes.cardContent}>
        <Typography variant={"h6"}>Name</Typography>
        <Typography variant={"body2"}>I am description</Typography>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
