import instance from "@/utils/configAxios";
import { user } from "@/constants/apiUrl";

export const update = async (data) => {
  try {
    const result = await instance.put(`${user.update}`, data);
    return result;
  } catch (error) {
    throw new Error("update user err");
  }
};

export const showInfoUser = async () => {
  try {
    const result = await instance.get(`${user.userInfo}`);
    return result;
  } catch (error) {
    throw new Error("show user err");
  }
};
