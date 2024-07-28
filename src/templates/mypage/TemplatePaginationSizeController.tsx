import { debouncedHandleSizeChange } from "pages/Admin/Blocks/utilities/block";
import "./templatePaginationSizeController.css";
import { sizeArray } from "../data/template";
import { useRef, useState } from "react";

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
        {open && <div className="cover" onClick={() => setOpen(false)} />}
        <span className="size" onClick={() => setOpen(!open)}>
          {`항목수`}
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
