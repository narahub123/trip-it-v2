import { AxiosResponse } from "axios";
import "./templateSetting.css";

import { handleDelete } from "templates/utilities/template";

export interface TemplateSettingProps {
  deletes: (string | number)[];
  setDeletes: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  items: any[];
  setItems: (value: any[]) => void;
  settings?: string[];
  deleteAPI?: (
    ids: (string | number)[]
  ) => Promise<AxiosResponse<any, any> | undefined>;
}

const TemplateSetting = ({
  deletes,
  setDeletes,
  settings,
  items,
  setItems,
  deleteAPI,
}: TemplateSettingProps) => {
  return (
    <div className="template-setting">
      <ul className={`template-setting-container`}>
        {settings?.map((setting) => {
          if (setting === "삭제") {
            return (
              <li
                className="template-setting-item"
                key={setting}
                onClick={() =>
                  handleDelete(deletes, setDeletes, items, setItems, deleteAPI)
                }
              >
                <p>삭제</p>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default TemplateSetting;
