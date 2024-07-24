import React, { useEffect, useState } from "react";
import Template from "templates/Template";
import "./block.css";
import { blockArray } from "./test";
import { fetchBlockAPI } from "apis/block";

const Block = () => {
  const [items, setItems] = useState<any[]>(blockArray); // 차단 목록 상태

  // 차단 목록 불러오기
  useEffect(() => {
    fetchBlockAPI()
      .then((res) => {
        console.log(res?.data);

        const block = res?.data;
        setItems(block);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* <Template pageName="mypage-block" /> */}
      <div className="mypage-block">
        <section className="mypage-block-title">
          <h3>내 차단 목록 </h3>
        </section>
        <section className="mypage-block-panels">차단 목록 패널들</section>
        <section className="mypage-block-main">
          <table className="mypage-block-main-table">
            <thead className="mypage-block-main-table-head">
              <tr className="mypage-block-main-table-head-tr">
                <th className="mypage-block-main-table-head-th">번호</th>
                <th className="mypage-block-main-table-head-th">
                  차단 당한 유저
                </th>
                <th className="mypage-block-main-table-head-th">차단 날짜</th>
                <th className="mypage-block-main-table-head-th">차단 해제</th>
              </tr>
            </thead>
            <tbody className="mypage-block-main-table-body">
              {items.map((item, index) => (
                <tr
                  className="mypage-block-main-table-body-tr"
                  key={item.blockId}
                >
                  <td className="mypage-block-main-table-body-td">
                    {index + 1}
                  </td>
                  <td className="mypage-block-main-table-body-td">
                    {item.nickname}
                  </td>
                  <td className="mypage-block-main-table-body-td">
                    {item.blockDate}
                  </td>
                  <td className="mypage-block-main-table-body-td">
                    <button id={item.blockId}>차단 해제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="mypage-block-search"></section>
        <section className="mypage-block-pagination">차단 페이징</section>
      </div>
    </>
  );
};

export default Block;
