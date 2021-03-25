import { useState, useRef, useEffect } from "react";

export type UseGalleryOptions = {
  step?: number;
  start?: number;
  count: number;
};
function useGallery({
  step = 5000,
  start: startIndex = 0,
  count,
}: UseGalleryOptions) {
  const [index, setIndex] = useState(startIndex);
  const timerRef = useRef<any>(null);
  const start = () => {
    timerRef.current = setInterval(() => {
      const nextIndex = (index + 1) % count;
      setIndex(nextIndex);
    }, step);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const setPrev = () => setIndex((index + count - 1) % count);
  const setNext = () => setIndex((index + 1) % count);

  useEffect(() => {
    start();
    return stop;
  });
  return {
    currentIndex: index,
    setIndex,
    setPrev,
    setNext,
    stop,
    start,
  };
}

export default useGallery;
