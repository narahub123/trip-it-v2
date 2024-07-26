import "./templateSearch.css";
import { debouncedHandleSearchChange } from "pages/Admin/Blocks/utils/block";
import { handleFieldChange } from "pages/mypage/utils/block";
import { TemplateArrayType } from "types/template";

interface TemplateSearchProps {
  items: any[];
  field: string;
  setField: (value: string) => void;
  setSearch: (value: string) => void;
  setPage: (value: number) => void;
  setTotal: (value: number) => void;
  tempArray: TemplateArrayType[];
}

const TemplateSearch = ({
  setField,
  setSearch,
  setPage,
  items,
  field,
  setTotal,
  tempArray,
}: TemplateSearchProps) => {
  return (
    <section className={`mypage-template-search`}>
      <div className={`mypage-template-search-container`}>
        <select id="field" onChange={(e) => handleFieldChange(e, setField)}>
          {tempArray
            .filter((item) => item.search === true)
            .map((item) => (
              <option value={item.field}>{item.title}</option>
            ))}
        </select>
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
