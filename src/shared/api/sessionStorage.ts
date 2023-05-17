export const setItem = (key: string, data: any) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getItem = <T>(key: string) => {
  const data = sessionStorage.getItem(key);
  if (!data) return null;
  try {
    return JSON.parse(data) as T;
  } catch (err) {
    return null;
  }
};
