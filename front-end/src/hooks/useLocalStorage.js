export const setData = (storage, data) => {
  localStorage.setItem(storage, JSON.stringify(data));
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getData = (storage) => JSON.parse(localStorage.getItem(storage));
