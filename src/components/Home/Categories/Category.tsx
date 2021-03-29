import React, { useState, useEffect } from "react";
import CategoryHeader from "./CategoryHeader";
import CategoryCard from "./CategoryCard";
import { createStyles, makeStyles } from "@material-ui/core";
import {
  Category as CategoryInterface,
} from "@server-api/category";
import cat1 from "../../../images/cat1.jpeg";
import cat2 from "../../../images/cat2.jpeg";
import { MaskPet, api as PetApi } from "@server-api/pet";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2)
    },
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
export type CategoryProps = {
  item: CategoryInterface
}
function Category(props: CategoryProps) {
  const classes = useStyles();
  const [pets, setPets] = useState<MaskPet[]>([]);
  useEffect(() => {
    PetApi.getPetList({
      pageIndex: 0,
      pageSize: 5,
      categoryId: props.item.id,
      status: null,
    })
      .then((data) => {
        setPets(data.list);
      })
      .catch((err) => {
        console.log("fetch carousel pet fail");
      });
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CategoryHeader category={props.item} />
      </div>
      <div className={classes.cards}>
        {pets.map((pet) => {
          return (
            <div key={pet.id} className={classes.card}>
              <CategoryCard pet={pet} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
