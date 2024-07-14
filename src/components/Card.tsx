"use client";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Card = ({ imgUrl }: { imgUrl: string }) => {
  const vertMargin = 10;

  const [maxScrollY, setMaxScrollY] = useState(Infinity);
  const [dynamicStyles, setDynamicStyles] = useState({
    scale: 1,
    filter: 0,
  });

  const container = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    target: container,
  });

  const isInView = useInView(container, {
    margin: `0px 0px -${100 - vertMargin}% 0px`,
    once: true,
  });

  scrollY.on("change", (scrollY) => {
    let animationValue = 1;
    if (scrollY > maxScrollY) {
      animationValue = Math.max(0, 1 - (scrollY - maxScrollY) / 10000);
    }

    setDynamicStyles({
      scale: animationValue,
      filter: (1 - animationValue) * 100,
    });
  });

  useEffect(() => {
    if (isInView) {
      setMaxScrollY(scrollY.get());
    }
  }, [isInView]);

  return (
    <motion.div
      ref={container}
      className="md:sticky relative top-[10vh] h-[80vh] w-[90vw] bg-neutral-200 rounded-xl overflow-hidden"
      style={{
        scale: dynamicStyles.scale,
        filter: `blur(${dynamicStyles.filter}px)`,
        height: `${100 - 2 * vertMargin}vh`,
        top: `${vertMargin}vh`,
      }}
    >
      <Image
        src={imgUrl}
        alt={imgUrl}
        fill
        className="object-cover"
        sizes="90vw"
      />
    </motion.div>
  );
};

export default Card;
