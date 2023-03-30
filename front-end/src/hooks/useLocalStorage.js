export const setData = (storage, data) => {
  localStorage.setItem(storage, JSON.stringify(data));
};

export const getData = (storage) => JSON.parse(localStorage.getItem(storage));
