import React, { useCallback, useEffect, useRef } from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import useGallery from "../../hooks/useGallery";

type GalleryItemType = {
  id: number;
  data: string;
  background: string;
};
const rawGalleryList: GalleryItemType[] = [
  { id: 1, data: "hello1", background: "#3580ff" },
  { id: 2, data: "hello2", background: "#ff6243" },
  { id: 3, data: "hello3", background: "#f9f9f9" },
  { id: 4, data: "hello4", background: "red" },
];
const fixGalleryList = (list: GalleryItemType[]): GalleryItemType[] => {
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
      opacity: "0.6",
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
  const galleryList = fixGalleryList(rawGalleryList);

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

const GalleryItem = ({ item: gallery }: { item: GalleryItemType }) => {
  return (
    <div
      className="gallery"
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: gallery.background,
      }}
      key={gallery.id}
    >
      <span>{gallery.data}</span>
    </div>
  );
};

export default Carousel;
