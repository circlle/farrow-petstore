import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Category, api as CategoryApi } from "@server-api/category";
import { MaskPet, api as PetApi } from "@server-api/pet";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import CategoryCard from "../shared/CategoryCard";
import CategoryDetailHeader from "./CategoryDetailHeader";
import TopBar from "../shared/TopBar";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: "#f9f9f9",
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

function CategoryDetail() {
  const classes = useStyles();
  const history = useHistory();
  const { categoryId: categoryIdStr } = useParams<{
    categoryId: string | undefined;
  }>();
  const categoryId = Number(categoryIdStr) || 1;
  const [pets, setPets] = useState<MaskPet[]>([]);
  const [category, SetCategory] = useState<Category | null>(null);
  useEffect(() => {
    CategoryApi.getCategoryById({ id: categoryId }).then((data) => {
      if (data.type === "CATEGORY_NOT_FOUND") {
        console.log(data.message);
      } else if (data.type === "CATEGORY") {
        SetCategory(data.category);
      }
    });
  }, [categoryId]);
  useEffect(() => {
    PetApi.getPetList({
      pageIndex: 0,
      pageSize: 5,
      categoryId,
      status: null,
    })
      .then((data) => {
        setPets(data.list);
      })
      .catch((err) => {
        console.log("fetch category page pet fail");
      });
  }, [categoryId]);
  if (!category) return null;
  return (
    <div className={classes.root}>
      <TopBar title="category" />
      <div className={classes.header}>
        <CategoryDetailHeader category={category} />
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

export default CategoryDetail;
