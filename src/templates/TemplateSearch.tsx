import "./templateSearch.css";
import { debouncedHandleSearchChange } from "pages/Admin/Blocks/utils/block";
import { handleFieldChange } from "pages/mypage/utils/block";
import { useState } from "react";
import { TemplateArrayType } from "types/template";

interface TemplateSearchProps {
  items: any[];
  field: { name: string; nested?: string[] };
  setField: (value: { name: string; nested?: string[] }) => void;
  setSearch: (value: string) => void;
  setPage: (value: number) => void;
  setTotal: (value: number) => void;
  tempArray: TemplateArrayType[];
  pageName: string;
}

const TemplateSearch = ({
  setField,
  setSearch,
  setPage,
  items,
  field,
  setTotal,
  tempArray,
  pageName,
}: TemplateSearchProps) => {
  const [open, setOpen] = useState(false);
  return (
    <section className={`mypage-template-search`}>
      <div className={`mypage-template-search-container`}>
        {open && <div className="cover" onClick={() => setOpen(false)} />}
        <span id="field" onClick={() => setOpen(!open)}>
          {tempArray.find((item) => item.field.name === field.name)?.title}
          <ul className={open ? "active" : undefined}>
            {tempArray
              .filter((item) => item.search === true)
              .map((item, i) => (
                <li
                  key={i}
                  value={item.field.name}
                  onClick={() => setField(item.field)}
                >
                  {item.title}
                </li>
              ))}
          </ul>
        </span>

        <input
          type="text"
          onChange={debouncedHandleSearchChange(
            setSearch,
            setPage,
            items,
            field,
            setTotal
          )}
        />
      </div>
    </section>
  );
};

export default TemplateSearch;
