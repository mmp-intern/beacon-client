import { Cookies } from "react-cookie";

const cookies = new Cookies();
//option 확인 좀 해봐라
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name, option) => {
  return cookies.remove(name, { ...option });
};
