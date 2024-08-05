// date 포멧
// YYYYMMDD => YYYY.MM.DD.
export const convertYYYYMMDDToDate1 = (origin: string) => {
  const year = origin.slice(0, 4);
  const month = origin.slice(4, 6);
  const date = origin.slice(6, 8);

  return `${year}.${month}.${date}.`;
};

export const convertYYYYMMDDToDate2 = (origin: string) => {
  const month = Number(origin.slice(4, 6));
  const date = Number(origin.slice(6, 8));

  return `${month}.${date}.`;
};

export const convertDateTypeToDate1 = (origin: Date) => {
  const d = new Date(origin);

  const year = origin.getFullYear();
  const month = origin.getMonth() + 1;
  const date = origin.getDate();

  return `${month}.${date}.`;
};
