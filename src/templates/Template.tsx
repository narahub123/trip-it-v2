import { AxiosResponse } from "axios";
import "./template.css";
import TemplateTable from "./TemplateTable";
import { useEffect, useState } from "react";
import { blockArray } from "./data/template";
import TemplatePagination from "./TemplatePagination";
import TemplatePaginationSizeController from "./TemplatePaginationSizeController";
import TemplateSearch from "./TemplateSearch";

export interface TemplateProps {
  pageName: string;
  fetchAPI: () => Promise<AxiosResponse<any, any> | undefined>;
}

const Template = ({ pageName, fetchAPI }: TemplateProps) => {
  const [items, setItems] = useState<any[]>([]); // 목록 상태
  const [sort, setSort] = useState<string[]>(["blockDate", "desc"]); // 정렬 상태
  const [page, setPage] = useState(1); // 페이지 상태
  const [size, setSize] = useState(3); // 페이지 수 상태
  const [total, setTotal] = useState(1); // 총 아이템 수 상태
  const [search, setSearch] = useState(""); // 검색어 상태
  const [field, setField] = useState("nickname"); // 검색 필드 상태

  const numPages = Math.ceil(total / size); // 총 페이지 개수

  // 목록 불러오기
  useEffect(() => {
    fetchAPI()
      .then((res) => {
        if (!res) return;
        const receivedItems = res.data;
        const length = res?.data.length;
        setItems(receivedItems);
        setTotal(length);
      })
      .catch();
  }, []);

  return (
    <div className={`mypage-template ${pageName}`}>
      <section className={`mypage-template-title ${pageName}-title`}>
        <h3>타이틀</h3>
      </section>
      <section className={`mypage-template-panels ${pageName}-panels`}>
        <div className="mypage-template-panels-left">
          <TemplatePaginationSizeController size={size} setSize={setSize} />
        </div>
        <div className="mypage-template-panels-right"></div>
      </section>
      <section className={`mypage-template-main ${pageName}-main`}>
        <TemplateTable
          items={items}
          setItems={setItems}
          sort={sort}
          setSort={setSort}
          page={page}
          size={size}
          search={search}
          field={field}
          tempArray={blockArray}
        />
      </section>
      <TemplateSearch
        items={items}
        field={field}
        setField={setField}
        setSearch={setSearch}
        setPage={setPage}
        setTotal={setTotal}
      />
      <TemplatePagination
        pageName={pageName}
        page={page}
        setPage={setPage}
        numPages={numPages}
      />
    </div>
  );
};

export default Template;
