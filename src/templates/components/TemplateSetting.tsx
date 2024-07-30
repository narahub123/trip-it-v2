import "./templateSetting.css";
import { useState } from "react";
import { LuMoreVertical } from "react-icons/lu";
import { handleOpen } from "templates/utilities/template";

export interface TemplateSettingProps {
  deletes: (string | number)[];
  setDeletes: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}

const TemplateSetting = ({ deletes, setDeletes }: TemplateSettingProps) => {
  const [open, setOpen] = useState(false);

  const handleDelete = (
    deletes: (string | number)[],
    setDeletes: React.Dispatch<React.SetStateAction<(string | number)[]>>
  ) => {
    console.log(deletes);
  };

  return (
    <div className="template-setting">
      <p
        className="template-setting-title"
        title="설정"
        onClick={() => handleOpen(open, setOpen)}
      >
        <LuMoreVertical />
      </p>

      {open && (
        <ul
          className={`template-setting-container ${
            open ? "active" : undefined
          }`}
          onClick={() => handleOpen(open, setOpen)}
        >
          <li
            className="template-setting-item"
            key={"삭제"}
            onClick={() => handleDelete(deletes, setDeletes)}
          >
            삭제
          </li>
          <li className="template-setting-item" key={"차단해제"}>
            차단해제
          </li>
        </ul>
      )}
    </div>
  );
};

export default TemplateSetting;
