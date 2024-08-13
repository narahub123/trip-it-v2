import { AxiosResponse } from "axios";
import "./template.css";
import { useEffect, useState } from "react";
import TemplateTable from "./TemplateTable";
import { MessageType, TemplateArrayType } from "types/template";
import TemplatePaginationSizeController from "./TemplatePaginationSizeController";
import TemplateSearch from "./TemplateSearch";
import TemplatePagination from "./TemplatePagination";
import { fetchMessage } from "templates/utilities/template";
import TemplateSetting from "../components/TemplateSetting";
import MessageModal from "templates/components/MessageModal";

export interface TemplateProps {
  pageName: string;
  title: string;
  fetchAPI: () => Promise<AxiosResponse<any, any> | undefined>;
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

const Template = ({
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
}: TemplateProps) => {
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

  // 목록 불러오기
  useEffect(() => {
    setLoading(true);
    fetchAPI()
      .then((res) => {
        if (!res) {
          setLoading(false);
          return;
        }
        const receivedItems = res.data;
        const length = res?.data.length;
        setItems(receivedItems);
        setTotal(length);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setMessage(fetchMessage(err.msgId, msgArray));
      });
  }, []);

  return (
    <>
      {message && <MessageModal message={message} setMessage={setMessage} />}
      <div className={`mypage-template ${pageName}`}>
        <section className={`mypage-template-title ${pageName}-title`}>
          <h3>{title}</h3>
        </section>
        <section className={`mypage-template-panels ${pageName}-panels`}>
          <div
            className={`mypage-template-panels-left ${pageName}-panels-left`}
          >
            <TemplatePaginationSizeController
              size={size}
              setSize={setSize}
              pageName={pageName}
            />
          </div>
          <div
            className={`mypage-template-panels-right ${pageName}-panels-right`}
          >
            <TemplateSetting
              deletes={deletes}
              setDeletes={setDeletes}
              settings={settings}
              items={items}
              setItems={setItems}
              deleteAPI={deleteAPI}
            />
          </div>
        </section>
        <section className={`mypage-template-main ${pageName}-main`}>
          <TemplateTable
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
        <TemplateSearch
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

export default Template;
