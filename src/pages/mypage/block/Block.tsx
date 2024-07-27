import { useRenderCount } from "@uidotdev/usehooks";
import Template from "templates/Template";
import "./block.css";
import { fetchBlockAPI } from "apis/block";
import { blockArray } from "templates/data/template";

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
    />
  );
};

export default Block;
