import { convertYYYYMMDDToDate1 } from "utilities/date";
import "./templateTable.css";
import { handleSort, handleUnblock } from "pages/mypage/utilities/block";
import { LuChevronDown, LuChevronUp, LuRefreshCw } from "react-icons/lu";
import { useRenderCount } from "@uidotdev/usehooks";
import { MessageType, TemplateArrayType } from "types/template";
import { getResult } from "../utilities/template";

export interface TemplateTableProps {
  items: any[];
  setItems: (value: any[]) => void;
  sort: string[];
  setSort: (value: string[]) => void;
  page: number;
  size: number;
  search: string;
  field: {
    name: string;
    nested?: string[];
  };
  tempArray: TemplateArrayType[];
  pageName: string;
  loading: boolean;
  setMessage: (value: MessageType | undefined) => void;
  setDeletes: React.Dispatch<React.SetStateAction<(string | number)[]>>;
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
  tempArray,
  pageName,
  loading,
  setMessage,
  setDeletes,
}: TemplateTableProps) => {
  const renderCount = useRenderCount();

  // 페이징
  const offset = (page - 1) * size;

  const lengthOfColumn = tempArray.length;

  const lengthOfItems =
    items.length !== 0
      ? items.filter((item) => {
          return field.nested
            ? item[field.name][`${field.nested?.[1]}`]?.includes(search)
            : item[field.name].includes(search);
        }).length
      : 0;

  console.log("템플렛 테이블 렌더링 횟수", renderCount);

  return (
    <table className="mypage-template-main-table">
      <thead className="mypage-template-main-table-head">
        <tr className="mypage-template-main-table-head-tr">
          {tempArray.map((header) =>
            header.sort.key.length === 0 ? (
              <th
                key={header.title}
                className="mypage-template-main-table-head-th"
              >
                {header.title}
              </th>
            ) : (
              <th
                key={header.title}
                className="mypage-template-main-table-head-th"
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
            )
          )}
        </tr>
      </thead>
      <tbody className="mypage-template-main-table-body">
        {loading === true && (
          <tr className="mypage-template-main-table-body-tr">
            <td
              className="mypage-template-main-table-body-td"
              colSpan={lengthOfColumn}
            >
              {/* <span
                className={`mypage-template-main-table-body-td-loading-icon`}
              >
                <LuRefreshCw />
              </span> */}
              <span>loading...</span>
            </td>
          </tr>
        )}
        {items.length !== 0 &&
          loading === false &&
          items
            .filter((item) => {
              return field.nested
                ? item[field.name][`${field.nested?.[1]}`]?.includes(search)
                : item[field.name].includes(search);
            })
            .slice(offset, offset + size)
            .map((item, index) => {
              return (
                <tr
                  className="mypage-template-main-table-body-tr"
                  key={item._id}
                >
                  {tempArray.map((body, i) => {
                    return (
                      <td
                        className="mypage-template-main-table-body-td"
                        key={`${item._id}_${tempArray[i].field}_${i}`}
                      >
                        {getResult(
                          body,
                          item,
                          index,
                          items,
                          setItems,
                          setMessage,
                          setDeletes
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        {(!items || lengthOfItems === 0) && loading === false && (
          <tr className="mypage-template-main-table-body-tr">
            <td
              className="mypage-template-main-table-body-td"
              colSpan={lengthOfColumn}
            >
              <p>검색 결과가 없습니다.</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TemplateTable;
