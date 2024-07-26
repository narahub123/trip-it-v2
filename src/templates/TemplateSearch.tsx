import "./templateSearch.css";
import { debouncedHandleSearchChange } from "pages/Admin/Blocks/utils/block";
import { handleFieldChange } from "pages/mypage/utils/block";

interface TemplateSearchProps {
  items: any[];
  field: string;
  setField: (value: string) => void;
  setSearch: (value: string) => void;
  setPage: (value: number) => void;
  setTotal: (value: number) => void;
}

const TemplateSearch = ({
  setField,
  setSearch,
  setPage,
  items,
  field,
  setTotal,
}: TemplateSearchProps) => {
  return (
    <section className={`mypage-template-search`}>
      <div className={`mypage-template-search-container`}>
        <select id="field" onChange={(e) => handleFieldChange(e, setField)}>
          <option value="nickname">유저</option>
          <option value="blockDate">날짜</option>
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
