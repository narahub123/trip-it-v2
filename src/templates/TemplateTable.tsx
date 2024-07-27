import { convertYYYYMMDDToDate1 } from "utilities/date";
import "./templateTable.css";
import { handleSort, handleUnblock } from "pages/mypage/utils/block";
import { LuChevronDown, LuChevronUp, LuRefreshCw } from "react-icons/lu";
import { useRenderCount } from "@uidotdev/usehooks";
import { TemplateArrayType } from "types/template";
import { getResult } from "./utilities/template";

export interface TemplateTableProps {
  items: any[];
  setItems: (value: any[]) => void;
  sort: string[];
  setSort: (value: string[]) => void;
  page: number;
  size: number;
  search: string;
  field: string;
  tempArray: TemplateArrayType[];
  pageName: string;
  loading: boolean;
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
}: TemplateTableProps) => {
  const renderCount = useRenderCount();

  // 페이징
  const offset = (page - 1) * size;

  const lengthOfColumn = tempArray.length;

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
        {items.length !== 0 && loading === false ? (
          items
            .filter((item) => item[field].includes(search))
            .slice(offset, offset + size)
            .map((item, index) => {
              return (
                <tr
                  className="mypage-template-main-table-body-tr"
                  key={item._id}
                >
                  {tempArray.map((body, i) => {
                    return (
                      <>
                        <td
                          className="mypage-template-main-table-body-td"
                          key={`${item._id}_${tempArray[i].field}_${i}`}
                        >
                          {getResult(body, item, index, items, setItems)}
                        </td>
                      </>
                    );
                  })}
                </tr>
              );
            })
        ) : (
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
