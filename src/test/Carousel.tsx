import React, { useRef, useEffect, useState } from "react";
import "./Carousel.css"; // 스타일 파일을 별도로 작성

const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

const Carousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(2);

  useEffect(() => {
    // 컴포넌트가 마운트된 후, 가운데 아이템(3번째 아이템)을 보이게 함
    if (itemRefs.current[currentIndex]) {
      itemRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [currentIndex]);

  const handleScroll = (direction: "left" | "right") => {
    const newIndex =
      (currentIndex + (direction === "right" ? 1 : -1) + items.length) %
      items.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel-container" ref={containerRef}>
      <div className="carousel-inner">
        {[...items, ...items, ...items].map((item, index) => (
          <div
            key={index}
            className="carousel-item"
            ref={(el) => (itemRefs.current[index] = el)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
