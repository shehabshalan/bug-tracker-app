const dateConverter = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();

  const time = `${year}-${month}-${day} at ${hour}:${minute}`;
  return time;
};
export default dateConverter;
