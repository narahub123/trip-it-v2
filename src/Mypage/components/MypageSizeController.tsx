import "./mypageSizeController.css";
import React, { useState } from "react";
import { sizeArray } from "templates/data/template";

interface MypageSizeControllerProps {
  size: number;
  setSize: (value: number) => void;
}

const MypageSizeController = ({ size, setSize }: MypageSizeControllerProps) => {
  const [open, setOpen] = useState(false);
  const handleSize = (size: number) => {
    setSize(size);
    setOpen(!open);
  };
  return (
    <div className="mypage-size-controller">
      <div
        className="mypage-size-controller-title"
        onClick={() => setOpen(!open)}
      >
        항목수
      </div>
      <ul
        className={`mypage-size-controller-size-container${
          open ? " open" : ""
        }`}
      >
        {sizeArray.map((curSize) => (
          <li
            className={`mypage-size-controller-size-item${
              curSize === size ? " active" : ""
            }`}
            key={curSize}
            value={curSize}
            onClick={() => handleSize(curSize)}
          >
            {curSize}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MypageSizeController;
