import { deleteSchedulesMAPI } from "apis/schedule";

export const handleSelect = (
  e: React.FormEvent<HTMLParagraphElement>,
  id: string | number,
  selections: (string | number)[],
  setSelections: React.Dispatch<React.SetStateAction<(string | number)[]>>
) => {
  e.stopPropagation();

  const selectionSet = new Set(selections);

  if (!selectionSet.has(id)) {
    setSelections((preSelection) => {
      return [...preSelection, id];
    });
  } else {
    setSelections((preSelection) => preSelection.filter((item) => item !== id));
  }
};

export const handleDeleteSchedules = async (
  scheduleIds: (string | number)[],
  items: any[],
  setItems: (value: any[]) => void
) => {
  if (
    !window.confirm(
      `삭제하시겠습니까?\n삭제하시면 일정이 포함된 모집글도 삭제되게 됩니다.`
    )
  ) {
    return;
  }

  try {
    const response = await deleteSchedulesMAPI(scheduleIds);

    if (response.status === 200) {
      window.alert(`삭제가 성공했습니다.`);

      const prevItems = [...items];

      const newItems = prevItems.filter((item) => {
        return !scheduleIds.includes(item.scheduleId);
      });

      setItems(newItems);
    } else {
      window.alert(`삭제 실패 : 잠시 후에 다시 시도해주세요.`);
    }
  } catch (error: any) {
    if (error.code === 1) {
      window.alert(`삭제 권한이 없습니다.`);
    }
  }
};
