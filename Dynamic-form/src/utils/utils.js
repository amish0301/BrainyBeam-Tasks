export const getFieldsFromStorage = () => {
  try {
    const data = localStorage.getItem("fields");
    return data ? JSON.parse(data) : [{ id: 1, type: "text", val: "" }];
  } catch (error) {
    return [{ id: 1, type: "text", value: "" }];
  }
};
