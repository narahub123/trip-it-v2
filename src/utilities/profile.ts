export const convertDataToDate = (origin: string) => {
  const year = origin.slice(0, 4);
  const month = origin.slice(4, 6);
  const date = origin.slice(6, 8);

  return `${year}년 ${month}월 ${date}일`;
};
