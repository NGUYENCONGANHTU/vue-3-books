import instance from "@/utils/configAxios";
import { notes } from "@/constants/apiUrl";
export const store = async (data) => {
  try {
    const result = await instance.post(`${notes.store}`, data);
    return result;
  } catch (error) {
    throw new Error("add book err");
  }
};

export const update = async (id, data) => {
  try {
    if (!id) return;
    const result = await instance.put(`${notes.put}${id}`, data);
    return result;
  } catch (error) {
    throw new Error("update book err");
  }
};

export const remove = async (id) => {
  try {
    if (!id) return;
    const result = await instance.delete(`${notes.delete}${id}`);
    return result;
  } catch (error) {
    throw new Error("Delete book err");
  }
};

export const ListBooks = async () => {
  try {
    const result = await instance.get(`${notes.list}`);
    return result;
  } catch (error) {
    throw new Error("ListBooks book err");
  }
};

export const userNotes = async () => {
  try {
    const result = await instance.get(`${notes.user}`);
    return result;
  } catch (error) {
    throw new Error("ListBooks book err");
  }
};

export const show = async (id) => {
  try {
    if (!id) return;
    const result = await instance.get(`${notes.show}${id}`);
    return result;
  } catch (error) {
    throw new Error("show book err");
  }
};

export const search = async (params, page, limit) => {
  try {
    const result = await instance.get(
      `${notes.user}?page=${page}&limit=${limit}&name=${params.name}`
    );
    return result;
  } catch (error) {
    throw new Error("search book err");
  }
};
