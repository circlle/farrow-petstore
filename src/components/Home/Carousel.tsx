import React, { useCallback, useEffect, useRef, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import { MaskPet, api as PetApi } from "@server-api/pet";
import useGallery from "../../hooks/useGallery";

const fixGalleryList = (list: MaskPet[]): MaskPet[] => {
  if (list.length === 0) return [];
  if (list.length === 1) return list;
  return [
    { ...list[list.length - 1], id: -1 },
    ...list,
    { ...list[0], id: -2 },
  ];
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: "20vh",
      padding: theme.spacing(2),
    },
    galleryWrapper: {
      height: "100%",
      backgroundColor: "transparent",
      display: "flex",
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[2],
      overflow: "hidden",
    },
    galleryItem: {
      height: "100%",
      width: "100%",
      flexShrink: 0,
    },
  })
);
function Carousel() {
  const classes = useStyles();
  const [pets, setPets] = useState<MaskPet[]>([]);
  useEffect(() => {
    PetApi.getPetList({
      pageIndex: 0,
      pageSize: 5,
      categoryId: null,
      status: null,
    })
      .then((data) => {
        setPets(data.list);
      })
      .catch((err) => {
        console.log("fetch carousel pet fail");
      });
  }, []);

  const galleryList = fixGalleryList(pets);

  const { currentIndex, setIndex } = useGallery({
    start: 1,
    count: galleryList.length,
  });

  const transitionRef = useRef(true);
  const translateX = "-" + currentIndex * 100 + "%";
  const stopTransition = () => (transitionRef.current = false);
  const recoverTransition = () => (transitionRef.current = true);

  const setIndexWithoutTransitionAfterDelay = useCallback(
    (index: number, delay: number = 500) => {
      setTimeout(() => {
        stopTransition();
        setIndex(index);
        recoverTransition();
      }, delay);
    },
    [setIndex]
  );

  useEffect(() => {
    if (currentIndex === galleryList.length - 1) {
      setIndexWithoutTransitionAfterDelay(1);
    }
  }, [currentIndex, galleryList.length, setIndexWithoutTransitionAfterDelay]);

  useEffect(() => {
    if (currentIndex === 0) {
      setIndexWithoutTransitionAfterDelay(galleryList.length - 2);
    }
  }, [currentIndex, galleryList.length, setIndexWithoutTransitionAfterDelay]);

  return (
    <div className={classes.root}>
      <div className={classes.galleryWrapper}>
        {galleryList.map((gallery) => {
          return (
            <div
              key={gallery.id}
              className={classes.galleryItem}
              style={{
                transition: transitionRef.current ? "all 0.5s" : "0s",
                transform: `translateX(${translateX})`,
              }}
            >
              <GalleryItem item={gallery} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const GalleryItem = ({ item: gallery }: { item: MaskPet }) => {
  const imageUrl = gallery.photos[0]?.url;
  return (
    <div
      className="gallery"
      style={{
        height: "100%",
        width: "100%",
      }}
      key={gallery.id}
    >
      {imageUrl ? (
        <img
          style={{
            height: "100%",
            width: "100%",
          }}
          src={imageUrl}
        />
      ) : (
        <div>
          <span>{gallery.name}</span>
        </div>
      )}
    </div>
  );
};

export default Carousel;
