import { useEffect, useState } from "react";
import "./templateA.css";
import { AxiosResponse } from "axios";
import { MessageType, TemplateArrayType } from "types/template";
import TemplateATable from "./TemplateATable";
import TemplatePaginationSizeController from "templates/mypage/TemplatePaginationSizeController";

import TemplatePagination from "templates/mypage/TemplatePagination";
import TemplateASearch from "./TemplateASearch";
import MessageModal from "templates/components/MessageModal";
import { fetchMessage } from "templates/utilities/template";
import TemplateSetting from "templates/components/TemplateSetting";

export interface TemplateAProps {
  pageName: string;
  title: string;
  fetchAPI: (
    sortKey?: string,
    sortValue?: string,
    page?: number,
    size?: number,
    field?: string,
    search?: string
  ) => Promise<AxiosResponse<any, any> | undefined>;
  deleteAPI?: (
    ids: (string | number)[]
  ) => Promise<AxiosResponse<any, any> | undefined>;
  defaultSort: string[];
  defaultSize: number;
  defaultField: { name: string; nested?: string[] };
  tempArray: TemplateArrayType[];
  msgArray: MessageType[];
  settings?: string[];
}

const TemplateA = ({
  pageName,
  title,
  fetchAPI,
  deleteAPI,
  defaultSort,
  defaultSize,
  defaultField,
  tempArray,
  msgArray,
  settings,
}: TemplateAProps) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]); // 목록 상태
  const [sort, setSort] = useState<string[]>(defaultSort); // 정렬 상태
  const [page, setPage] = useState(1); // 페이지 상태
  const [size, setSize] = useState(defaultSize); // 페이지 수 상태
  const [total, setTotal] = useState(1); // 총 아이템 수 상태
  const [search, setSearch] = useState(""); // 검색어 상태
  const [field, setField] = useState(defaultField); // 검색 필드 상태
  const [message, setMessage] = useState<MessageType>();
  const numPages = Math.ceil(total / size); // 총 페이지 개수
  const [deletes, setDeletes] = useState<(string | number)[]>([]);

  console.log(deletes);

  // 목록 불러오기
  useEffect(() => {
    setLoading(true);
    const sortKey = sort[0];
    const sortValue = sort[1];
    const keyword = field.nested
      ? `${field.name}.${field.nested[1]}`
      : field.name;
    fetchAPI(sortKey, sortValue, page, size, keyword, search)
      .then((res) => {
        if (!res) {
          setLoading(false);
          return;
        }

        console.log(res.data);

        const receivedItems = res.data.content;
        const length = res.data.totalElements;

        setItems(receivedItems);
        setTotal(length);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);

        setMessage(fetchMessage(err.msgId, msgArray));
      });
  }, [page, size, sort, search]);

  return (
    <>
      {message && <MessageModal message={message} setMessage={setMessage} />}
      <div className={`admin-template ${pageName}`}>
        <section className={`admin-template-title ${pageName}-title`}>
          <h3>{title}</h3>
        </section>
        <section className={`admin-template-panels ${pageName}-panels`}>
          <div className={`admin-template-panels-left ${pageName}-panels-left`}>
            <div
              className={`mypage-template-panels-left ${pageName}-panels-left`}
            >
              <TemplatePaginationSizeController
                size={size}
                setSize={setSize}
                pageName={pageName}
              />
            </div>
          </div>
          <div
            className={`admin-template-panels-right ${pageName}-panels-right`}
          >
            <TemplateSetting
              deletes={deletes}
              setDeletes={setDeletes}
              settings={settings}
              items={items}
              setItems={setItems}
            />
          </div>
        </section>
        <section className={`admin-template-main ${pageName}-main`}>
          <TemplateATable
            pageName={pageName}
            items={items}
            setItems={setItems}
            sort={sort}
            setSort={setSort}
            page={page}
            size={size}
            search={search}
            field={field}
            tempArray={tempArray}
            loading={loading}
            setMessage={setMessage}
            setDeletes={setDeletes}
          />
        </section>
        <TemplateASearch
          pageName={pageName}
          items={items}
          field={field}
          setField={setField}
          setSearch={setSearch}
          setPage={setPage}
          setTotal={setTotal}
          tempArray={tempArray}
          search={search}
        />
        <TemplatePagination
          pageName={pageName}
          page={page}
          setPage={setPage}
          numPages={numPages}
        />
      </div>
    </>
  );
};

export default TemplateA;
