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
