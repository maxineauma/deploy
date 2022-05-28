export const everyButOne = (array, exclusion) => {
  const index = array.indexOf(exclusion);
  array.splice(index, 1);

  return array;
};

export const constructToday = () => {
  let time = new Date(Date.now());

  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  return year + "-" + month + "-" + day;
};

export const statusColor = (status) => {
  switch (status) {
    default:
    case "requested":
      return "#998DD9";

    case "in progress":
      return "#FFE380";

    case "completed":
      return "#79E2F2";
  }
};