import instance from "@/utils/configAxios";
import { getToken, removeToken, setToken } from "@/utils/cookie";
import { tokenKey, localStorageKey } from "@/constants/appKey";
import { auth } from "@/constants/apiUrl";
import { setLangUser } from "@/utils/cookie";
export const loginApp = async (body) => {
  try {
    const result = await instance.post(`${auth.login}`, body);
    return result.data;
  } catch (error) {
    throw new Error("login unsuccessful!!");
  }
};

export const createUser = async (body) => {
  try {
    const result = await instance.post(`${auth.signup}`, body);
    if (result) {
      // default user create account " DEFAULT EN "
      setLangUser("lang", "en");
      return result.data;
    }
  } catch (error) {
    throw new Error("createUser err");
  }
};

export const getTokenUser = () => {
  try {
    return getToken(tokenKey);
  } catch (error) {
    throw new Error("getTokenUser err");
  }
};

export const removeTokenUser = () => {
  try {
    return removeToken(tokenKey);
  } catch (error) {
    throw new Error("getTokenUser err");
  }
};

export const setTokenUser = (data) => {
  try {
    return setToken(tokenKey, data);
  } catch (error) {
    throw new Error("setToKen err");
  }
};
