export const storage = {
  getToken: () => localStorage.getItem("accessToken"),
  setToken: (token) => localStorage.setItem("accessToken", token),
  clearToken: () => localStorage.removeItem("accessToken"),
};
