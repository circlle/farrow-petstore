import {
  Chip,
  createStyles,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { MaskPet } from "@server-api/pet";
import React from "react";

const useStyle = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    petMain: {
      display: "flex",
      justifyContent: "space-between"
    }
  })
);

export type PetInfoProps = {
  pet: MaskPet;
};
function PetInfo({ pet }: PetInfoProps) {
  const classes = useStyle();
  return (
    <Paper className={classes.root}>
      <Typography className={classes.petMain} variant={"h5"} gutterBottom>
        {pet.name}
        <Status status={pet.status} />
      </Typography>
      <Typography variant={"overline"} gutterBottom>{pet.description}</Typography>
      <Typography variant={"body1"}>${pet.price}</Typography>
    </Paper>
  );
}

function Status(props: { status: MaskPet["status"] }) {
  switch (props.status) {
    case "AVAILABLE":
      return <Chip color="primary" label={props.status} />
    case "PENDING":
      return <Chip color="secondary" label={props.status} />
    case "SOLD":
      return <Chip label={props.status} />
    default:
      return <Chip label={'UNKNOWN'} />
  }
}

export default PetInfo;
