import { convertYYYYMMDDToDate1 } from "utilities/date";
import "./templateTable.css";
import { handleSort, handleUnblock } from "pages/mypage/utils/block";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { useRenderCount } from "@uidotdev/usehooks";
import { TemplateHeaderArrayType } from "types/template";

export interface TemplateTableProps {
  items: any[];
  setItems: (value: any[]) => void;
  sort: string[];
  setSort: (value: string[]) => void;
  page: number;
  size: number;
  search: string;
  field: string;
  headerArray: TemplateHeaderArrayType[];
}

const TemplateTable = ({
  items,
  setItems,
  sort,
  setSort,
  page,
  size,
  search,
  field,
  headerArray,
}: TemplateTableProps) => {
  const renderCount = useRenderCount();

  // 페이징
  const offset = (page - 1) * size;

  console.log("템플렛 테이블 렌더링 횟수", renderCount);

  return (
    <table className="template-table">
      <thead className="template-table-head">
        <tr className="template-table-head-tr">
          {headerArray.map((header) => {
            if (header.sort.key.length === 0) {
              return <th className="template-table-head-th">{header.title}</th>;
            } else {
              return (
                <th
                  className="template-table-head-th"
                  data-key={header.sort.key}
                  data-value={header.sort.value}
                  onClick={(e) => handleSort(e, items, setItems, setSort)}
                >
                  {header.title}{" "}
                  <span
                    title={
                      sort[0] === `${header.sort.key}` && sort[1] === "asc"
                        ? "오름차순"
                        : "내림차순"
                    }
                  >
                    {sort[0] === `${header.sort.key}` && sort[1] === "desc" ? (
                      <LuChevronDown />
                    ) : (
                      <LuChevronUp />
                    )}
                  </span>
                </th>
              );
            }
          })}
        </tr>
      </thead>
      <tbody className="template-table-body">
        {items
          .filter((item) => item[field].includes(search))
          .slice(offset, offset + size)
          .map((item, index) => (
            <tr className="template-table-body-tr" key={item.blockId}>
              <td className="template-table-body-td">{index + 1}</td>
              <td className="template-table-body-td">{item.nickname}</td>
              <td className="template-table-body-td">
                {convertYYYYMMDDToDate1(item.blockDate)}
              </td>
              <td className="template-table-body-td">
                <button
                  id={item.blockId}
                  data-nickname={item.nickname}
                  onClick={(e) => handleUnblock(e, items, setItems)}
                >
                  차단 해제
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TemplateTable;
