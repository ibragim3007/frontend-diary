export const getTime = (time: Date | undefined): string | undefined => {
  if (!time) return undefined;
  const date = new Date(time ? time : 0);
  return `${('0' + date.getDate().toString()).slice(-2)}.${('0' + (date.getMonth() + 1).toString()).slice(
    -2,
  )} ${date.getFullYear()}`;
};

export const getFullTime = (time: Date): string => {
  const date = new Date(time);

  return `${('0' + date.getDate().toString()).slice(-2)}.${('0' + (date.getMonth() + 1).toString()).slice(
    -2,
  )} ${date.getFullYear()} ${date.getHours()}:${('0' + date.getMinutes().toString()).slice(-2)}`;
};

export const getFullTimeUSA = (time: Date): string => {
  const date = new Date(time);

  return `${('0' + (date.getMonth() + 1).toString()).slice(-2)}/${('0' + date.getDate().toString()).slice(
    -2,
  )} ${date.getFullYear()} ${date.getHours()}:${('0' + date.getMinutes().toString()).slice(-2)}`;
};
