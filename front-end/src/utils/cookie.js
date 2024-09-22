import Cookies from "js-cookie";

/**
 * @description show token user login
 * @param {*} key
 * @returns
 */
export const getToken = (key) => {
  return Cookies.get(key);
};

/**
 *@description save token login
 * @param {*} key
 * @param {*} data
 */
export const setToken = (key, data) => {
  Cookies.set(key, data);
};

/**
 * removeToken
 * @param {*} key
 */
export const removeToken = (key) => {
  Cookies.remove(key);
};

/**
 * @description show lang user
 * @param {*} key
 * @returns
 */
export const getLangUser = (key) => {
  return Cookies.get(key);
};

/**
 *@description save lang user
 * @param {*} key
 * @param {*} data
 */
export const setLangUser = (key, data) => {
  Cookies.set(key, data);
};

/**
 * remove lang user
 * @param {*} key
 */
export const removeLangUser = (key) => {
  Cookies.remove(key);
};

export const changeUserLang = (data) => {
  try {
    if (data) {
      setLangUser("lang", data);
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (error) {
    throw error;
  }
};
