export const createNode = () => {
  return {
    id: Date.now().toString(),
    condition: "",
    children: [],
    linkedTo: null,
  };
};