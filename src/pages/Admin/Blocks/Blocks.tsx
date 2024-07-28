import "./blocks.css";
import { fetchBlocksAPI } from "apis/block";
import TemplateA from "templates/admin/TemplateA";
import { blockMsgs } from "templates/data/message";
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
      msgArray={blockMsgs}
    />
  );
};

export default Blocks;
