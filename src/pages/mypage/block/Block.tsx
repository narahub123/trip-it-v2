import { useRenderCount } from "@uidotdev/usehooks";
import Template from "templates/mypage/Template";
import "./block.css";
import { fetchBlockAPI } from "apis/block";
import { blockArray } from "templates/data/template";
import { blockMsgs } from "templates/data/message";

const Block = () => {
  const renderCount = useRenderCount();

  console.log("렌더링 횟수", renderCount);

  return (
    <Template
      pageName={"block"}
      title={"차단 목록"}
      fetchAPI={fetchBlockAPI}
      defaultSort={["blockDate", "desc"]}
      defaultSize={3}
      defaultField={{ name: "nickname" }}
      tempArray={blockArray}
      msgArray={blockMsgs}
    />
  );
};

export default Block;
