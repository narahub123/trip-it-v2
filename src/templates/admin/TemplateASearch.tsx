import "./templateASearch.css";
import { debouncedHandleSearchChange } from "pages/Admin/Blocks/utilities/block";
import { useState } from "react";
import { TemplateArrayType } from "types/template";
import { handleField, handleSearch } from "../utilities/template";

interface TemplateASearchProps {
  items: any[];
  field: { name: string; nested?: string[] };
  setField: (value: { name: string; nested?: string[] }) => void;
  setSearch: (value: string) => void;
  setPage: (value: number) => void;
  setTotal: (value: number) => void;
  tempArray: TemplateArrayType[];
  pageName: string;
  search: string;
}

const TemplateASearch = ({
  setField,
  setSearch,
  setPage,
  items,
  field,
  setTotal,
  tempArray,
  pageName,
  search,
}: TemplateASearchProps) => {
  const [open, setOpen] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);

  const type = tempArray.find((item) => item.field.name === field.name)?.search
    ?.type;
  // tempArray에서 field.name과 일치하는 항목을 찾고, 해당 항목의 search.enum을 가져옵니다.
  const option = tempArray.find((item) => item.field.name === field.name)
    ?.search.enum;

  let options;
  // option이 undefined가 아닐 경우에만 Object.entries를 사용합니다.
  if (option) {
    options = Object.entries(option);
  }

  console.log("관리자 검색", items, field, tempArray, pageName, search);

  return (
    <section className={`admin-template-search`}>
      <div className={`admin-template-search-container`}>
        {open && <div className="cover" onClick={() => setOpen(false)} />}
        <span id="field" onClick={() => setOpen(!open)}>
          {tempArray.find((item) => item.field.name === field.name)?.title}
          <ul className={open ? "active" : undefined}>
            {tempArray
              .filter((item) => item.search.able === true)
              .map((item, i) => (
                <li
                  key={i}
                  value={item.field.name}
                  onClick={() => handleField(item.field, setField, setSearch)}
                >
                  {item.title}
                </li>
              ))}
          </ul>
        </span>

        {type === "normal" && (
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
        )}
        {type === "select" && (
          <>
            {openSelect && (
              <div className="cover" onClick={() => setOpenSelect(false)} />
            )}
            <span onClick={() => setOpenSelect(!openSelect)}>
              <p>{search.length === 0 ? "선택해주세요" : search}</p>
              <ul className={openSelect ? "active" : undefined}>
                <li onClick={() => setSearch("")}>전체</li>
                {options?.map((option) => (
                  <li
                    key={option[0]}
                    onClick={() =>
                      handleSearch(option[0], option[1], setSearch)
                    }
                  >
                    {option[1]}
                  </li>
                ))}
              </ul>
            </span>
          </>
        )}
      </div>
    </section>
  );
};

export default TemplateASearch;
