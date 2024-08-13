import { blockUserAPI } from "apis/block";
import "./test.css";
import { addReportAPI } from "apis/report";
import { useEffect, useRef } from "react";

const Test = () => {
  const slideListRef = useRef<HTMLUListElement>(null);
  const addBlock = (userId: string) => {
    blockUserAPI(userId)
      .then((res) => {
        console.log(res?.data);
        if (!res) return;

        alert("차단 성공");
      })
      .catch((err) => console.log(err));
  };

  const addReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const postId = formData.get("postId");
    const reportType = formData.get("reportType");
    let reportDetail = formData.get("reportDetail");

    if (!reportType) {
      alert("신고 유형을 선택해주세요");
    }
    if (reportType === "R4" && !reportDetail) {
      alert("기타 유형의 경우 신고 내용을 작성해주세요");
      return;
    }

    const report = {
      postId,
      reportType,
      reportDetail,
    };

    addReportAPI(report)
      .then((res) => {
        console.log(res?.data);

        if (res?.data.code === "ok") {
          alert("신고 성공");
        }
      })
      .catch();
    console.log(postId, reportType, reportDetail);
    try {
    } catch (error) {
      console.error("신고 처리 중 오류 발생:", error);
      alert("신고 처리 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const slideList = slideListRef.current;
    if (slideList) {
      // 아이템의 너비를 기반으로 스크롤 위치를 설정합니다.
      const itemWidth = 100; // 각 아이템의 너비
      const initialIndex = 2; // 세 번째 아이템의 인덱스 (0부터 시작)
      const scrollPosition = itemWidth * initialIndex;
      slideList.scrollLeft = scrollPosition;
    }
  }, []);

  return (
    <div className="test">
      <p onClick={() => addBlock("강고양이")}>차단</p>
      <form onSubmit={(e) => addReport(e)}>
        <input type="hidden" id="postId" name="postId" value={4} />
        <select id="reportType" name="reportType">
          <option value="">신고내용</option>
          <option value="R1">음란</option>
          <option value="R2">폭력</option>
          <option value="R3">욕설</option>
          <option value="R4">기타</option>
        </select>
        <input
          type="text"
          placeholder="신고내용"
          id="reportDetail"
          name="reportDetail"
        />
        <button type="submit">신고</button>
      </form>

      <div className="test-slide">
        <ul className="test-slide-list" ref={slideListRef}>
          <li className="test-slide-list-item">1</li>
          <li className="test-slide-list-item">2</li>
          <li className="test-slide-list-item">3</li>
          <li className="test-slide-list-item">4</li>
          <li className="test-slide-list-item">5</li>
        </ul>
      </div>
    </div>
  );
};

export default Test;
