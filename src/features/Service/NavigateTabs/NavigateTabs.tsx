import { useRef, useState, useEffect } from "react";
import ButtonLink from "@/UI/ButtonLink/ButtonLink";
import s from "./index.module.css";

const NavigateTabs = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        scrollRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={s.container}>
      {showLeftArrow && (
        <button
          className={`${s.scrollButton} ${s.left}`}
          onClick={() => scroll("left")}
          aria-label="Прокрутить влево"
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>
      )}

      {showRightArrow && (
        <button
          className={`${s.scrollButton} ${s.right}`}
          onClick={() => scroll("right")}
          aria-label="Прокрутить вправо"
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>
      )}

      <div className={s.scrollWrapper} ref={scrollRef} onScroll={checkScroll}>
        <div className={`flex gap ${s.wrapper}`}>
          <ButtonLink
            path={"/service/repair"}
            title="Ремонт"
            variant="primary"
          />
          <ButtonLink
            path={"/service/cleaning"}
            title="Профчистка"
            variant="primary"
          />
          <ButtonLink
            path={"/service/refilling"}
            title="Заправка картриджей"
            variant="primary"
          />
          <ButtonLink
            path={"/service/consultation"}
            title="Консультация"
            variant="primary"
          />
          <ButtonLink
            path={"/service/modernization"}
            title="Модернизация"
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default NavigateTabs;
