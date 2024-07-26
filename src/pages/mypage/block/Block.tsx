import { useRenderCount } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import Template from "templates/Template";
import "./block.css";
import { blockArray } from "./test";
import { fetchBlockAPI } from "apis/block";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { handleFieldChange, handleSort, handleUnblock } from "../utils/block";
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronRight,
} from "react-icons/fi";
import {
  debouncedHandleSearchChange,
  debouncedHandleSizeChange,
} from "pages/Admin/Blocks/utils/block";
import { convertYYYYMMDDToDate1 } from "utilities/date";

const Block = () => {
  const renderCount = useRenderCount();
  const [items, setItems] = useState<any[]>([]); // 차단 목록 상태
  const [sort, setSort] = useState<string[]>(["blockDate", "desc"]); // 정렬 상태
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);
  const [search, setSearch] = useState("");
  const [field, setField] = useState("nickname");
  const [total, setTotal] = useState(1);

  // 페이징
  const offset = (page - 1) * size;
  const numPages = Math.ceil(total / size);

  // 차단 목록 불러오기
  useEffect(() => {
    fetchBlockAPI()
      .then((res) => {
        if (!res) return;
        const block = res.data;
        setItems(block);
        setTotal(block.length);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("렌더링 횟수", renderCount);

  return (
    <>
      <Template pageName={"block"} fetchAPI={fetchBlockAPI} />
    </>
  );
};

export default Block;
