import { useRenderCount } from "@uidotdev/usehooks";
import Template from "templates/mypage/Template";
import "./block.css";
import { fetchBlockAPI } from "apis/block";
import { blockArray } from "templates/data/template";
import { blockMsgs } from "templates/data/message";
import MoblieTemplateM from "templates/Moblie/MoblieTemplateM";
import { blocksArray } from "test/data/blocks";

const Block = () => {
  const renderCount = useRenderCount();

  console.log("렌더링 횟수", renderCount);

  return (
    <>
      <MoblieTemplateM
        pageName={"mypage-block"}
        title={"차단 목록"}
        fetchAPI={fetchBlockAPI}
        defaultSort={["blockDate", "desc"]}
        defaultSize={3}
        defaultField={{ name: "nickname" }}
        tempArray={blockArray}
        msgArray={blockMsgs}
        tempoArray={blocksArray}
      />
      <Template
        pageName={"block"}
        title={"차단 목록"}
        fetchAPI={fetchBlockAPI}
        defaultSort={["blockDate", "desc"]}
        defaultSize={3}
        defaultField={{ name: "nickname" }}
        tempArray={blockArray}
        msgArray={blockMsgs}
        settings={["삭제"]}
      />
    </>
  );
};

export default Block;
