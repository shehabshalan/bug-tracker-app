const toDateTime = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  const time = `${year}-${month}-${day} ${hour}:${min}`;
  return time;
};
export default toDateTime;
