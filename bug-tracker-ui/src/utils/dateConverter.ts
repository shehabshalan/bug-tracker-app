const dateConverter = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const time = `${year}-${month}-${day}`;
  return time;
};
export default dateConverter;
