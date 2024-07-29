import { convertYYYYMMDDToDate1 } from "utilities/date";
import "./templateATable.css";
import { LuChevronDown, LuChevronUp, LuRefreshCw } from "react-icons/lu";
import { useRenderCount } from "@uidotdev/usehooks";
import { MessageType, TemplateArrayType } from "types/template";
import { getResult, handleSortAdmin } from "../utilities/template";

export interface TemplateATableProps {
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

const TemplateATable = ({
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
}: TemplateATableProps) => {
  const renderCount = useRenderCount();

  const lengthOfColumn = tempArray.length;

  const lengthOfItems = items
    ? items.filter((item) => {
        return field.nested
          ? item[field.name][`${field.nested?.[1]}`]?.includes(search)
          : item[field.name].includes(search);
      }).length
    : 1;

  console.log("템플렛 테이블 렌더링 횟수", renderCount);

  return (
    <table className="admin-template-main-table">
      <thead className="admin-template-main-table-head">
        <tr className="admin-template-main-table-head-tr">
          {tempArray.map((header) =>
            header.sort.key.length === 0 ? (
              <th
                key={header.title}
                className="admin-template-main-table-head-th"
              >
                {header.title}
              </th>
            ) : (
              <th
                key={header.title}
                className="admin-template-main-table-head-th"
                data-key={header.sort.key}
                data-value={header.sort.value}
                onClick={(e) => handleSortAdmin(e, setSort)}
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
      <tbody className="admin-template-main-table-body">
        {loading === true && (
          <tr className="admin-template-main-table-body-tr">
            <td
              className="admin-template-main-table-body-td"
              colSpan={lengthOfColumn}
            >
              {/* <span
                className={`admin-template-main-table-body-td-loading-icon`}
              >
                <LuRefreshCw />
              </span> */}
              <span>loading...</span>
            </td>
          </tr>
        )}
        {items &&
          loading === false &&
          items.map((item, index) => {
            return (
              <tr className="admin-template-main-table-body-tr" key={item._id}>
                {tempArray.map((body, i) => {
                  return (
                    <>
                      <td
                        className="admin-template-main-table-body-td"
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
                    </>
                  );
                })}
              </tr>
            );
          })}
        {(!items || lengthOfItems === 0) && loading === false && (
          <tr className="admin-template-main-table-body-tr">
            <td
              className="admin-template-main-table-body-td"
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

export default TemplateATable;
