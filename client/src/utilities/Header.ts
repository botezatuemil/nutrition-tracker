export const getHeader = () => {
  const headers = {
    "x-access-token": localStorage.getItem("token")!,
  };

  return headers;
};
