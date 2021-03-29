import { Button, createStyles, makeStyles, Paper } from "@material-ui/core";
import { MaskPet, api as PetApi } from "@server-api/pet";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import TopBar from "../shared/TopBar";
import PetInfo from "./PetInfo";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: "#f9f9f9",
      position: "relative"
    },
    imageWrapper: {
      width: "100%",
      height: "30vh",
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: theme.shape.borderRadius * 3,
    },
    petInfo: {
      marginTop: theme.spacing(1),
    },
    buyButtonWrapper: {
      position: "fixed",
      left: 0,
      bottom: theme.spacing(1),
      width: "100%",
      textAlign: "center"
    },
    buyButton: {
      width: "96%",
    }
  })
);

function PetDetail() {
  const classes = useStyles();
  const history = useHistory();
  const [pet, setPet] = useState<MaskPet | null>(null);
  const { petId: petIdStr } = useParams<{ petId: string | undefined }>();
  const petId = Number(petIdStr);
  if (isNaN(petId) || petId <= 0) return null;

  useEffect(() => {
    PetApi.getPetById({ id: petId }).then((data) => {
      if (data.type === "PET_NOT_FOUND") {
        console.log(data.message);
      } else if (data.type === "GET_PET_BY_ID_SUCCESS") {
        setPet(data.pet);
      } else {
        console.log("unhandle error from pet detail getPetById");
      }
    });
  }, [petId]);

  if (!pet) return null;

  // todo select a default pet image
  const imageUrl = pet.photos[0]?.url || "default";
  return (
    <div className={classes.root}>
      <TopBar title="pet" />
      <div className={classes.imageWrapper}>
        <img className={classes.image} src={imageUrl} />
      </div>
      <div className={classes.petInfo}>
        <PetInfo pet={pet} />
      </div>
      <div className={classes.buyButtonWrapper}>
        <Button className={classes.buyButton} color="primary" variant="contained">
          Buy Me
        </Button>
      </div>
    </div>
  );
}

export default PetDetail;
