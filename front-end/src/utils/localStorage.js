// TODO: save data user LocalStorage
class LocalStorage {
  setUserLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getUserLocalStorage(key) {
    return localStorage.getItem(key);
  }

  deleteUserLocalStorage(key) {
    localStorage.removeItem(key);
  }
}
export default new LocalStorage();
