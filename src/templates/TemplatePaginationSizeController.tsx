import { debouncedHandleSizeChange } from "pages/Admin/Blocks/utils/block";
import "./templatePaginationSizeController.css";
import { sizeArray } from "./data/template";
import { useState } from "react";

interface TemplatePaginationSizeControllerProps {
  size: number;
  setSize: (value: number) => void;
  pageName: string;
}

const TemplatePaginationSizeController = ({
  size,
  setSize,
  pageName,
}: TemplatePaginationSizeControllerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`mypage-template-panels-size-controller ${pageName}-panels-size-controller`}
    >
      <div
        className={`mypage-template-panels-size-controller-container ${pageName}-panels-size-controller-container`}
      >
        항목수
        <span onClick={() => setOpen(!open)}>
          {`${size}`}
          <ul className={open ? "active" : undefined}>
            {sizeArray.map((s, i) => (
              <li
                className={s === size ? "active" : undefined}
                key={i}
                value={s}
                onClick={() => setSize(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
};

export default TemplatePaginationSizeController;
