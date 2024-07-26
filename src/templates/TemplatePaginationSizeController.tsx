import { debouncedHandleSizeChange } from "pages/Admin/Blocks/utils/block";
import "./templateSizeController.css";

interface TemplatePaginationSizeControllerProps {
  size: number;
  setSize: (value: number) => void;
}

const TemplatePaginationSizeController = ({
  size,
  setSize,
}: TemplatePaginationSizeControllerProps) => {
  return (
    <div className={`mypage-template-panels-size-controller`}>
      <div className={`mypage-template-panels-size-controller-container`}>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          defaultValue={size}
          onChange={debouncedHandleSizeChange(setSize)}
        />
        <span>{size}</span>
      </div>
    </div>
  );
};

export default TemplatePaginationSizeController;
