import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { MaskPet } from "@server-api/pet";
import { useHistory } from "react-router";

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
  pet: MaskPet;
};
function CategoryCard(props: CategoryCardProps) {
  const classes = useStyles();
  const history = useHistory();
  const { pet } = props;
  // todo select a default pet image
  const imageUrl = pet.photos[0]?.url || "default";
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} title={"hello"}>
        <img
          src={imageUrl}
          alt={"product"}
          className={classes.image}
          onClick={() => {
            history.push(`/pet/${pet.id}`);
          }}
        />
      </CardMedia>
      <CardContent className={classes.cardContent}>
        <Typography variant={"h6"}>{pet.name}</Typography>
        <Typography variant={"body2"}>{pet.description}</Typography>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
