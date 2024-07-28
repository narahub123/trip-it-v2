import { useRenderCount } from "@uidotdev/usehooks";
import "./blocks.css";
import { fetchBlocksAPI } from "apis/block";
import { blockArray } from "pages/mypage/block/test";
import React, { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronRight,
} from "react-icons/fi";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { debounce } from "utilities/debounce";
import {
  debouncedHandleSizeChange,
  handleSort,
  handleUnBlockByAdmin,
} from "./utilities/block";
import { convertYYYYMMDDToDate1 } from "utilities/date";
import TemplateA from "templates/admin/TemplateA";
import { blocksArray } from "templates/data/template";

// 관리자 페이지 차단
const Blocks = () => {
  return (
    <TemplateA
      pageName="blocks"
      title={"차단 목록"}
      fetchAPI={fetchBlocksAPI}
      defaultSort={["blockDate", "desc"]}
      defaultSize={3}
      defaultField={{ name: "nickname" }}
      tempArray={blocksArray}
    />
  );
};

export default Blocks;
