function isInThePast(date) {
  const comapireDate = new Date(date);
  const today = new Date();
  // This line sets the hour of the current date to midnight
  // so the comparison only returns `true` if the passed in date
  // is at least yesterday
  today.setHours(0, 0, 0, 0);
  return comapireDate < today;
}

function dateFormatter(value) {
  const date = new Date(value);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return [year, month, day].join("-");
}

function timeFormatter(value) {
  const date = new Date(value);
  // const fixedDate = date.toLocaleString("en-us", {
  //   year: "numeric",
  //   month: "numeric",
  //   day: "numeric",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  // });
  let h = date.getHours();
  let min = date.getMinutes();
  return [h, min].join(":");
}

function idGenarator(key) {
  const date = new Date();
  const year = date.getFullYear();
  const monthe = date.getMonth();
  const day = date.getDay();
  const hour = date.getHours();
  const sec = date.getSeconds();
  const uniqueID = key + year + monthe + day + hour + sec;
  return uniqueID;
}

function calTimePeriode() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  let thismonthe = monthNames[today.getMonth()];
  let formatPrevMonth = new Date(today.setMonth(today.getMonth() - 1));
  let lastmonthe = monthNames[formatPrevMonth.getMonth()];
  return [lastmonthe, thismonthe].join("-");
}

function calLastMonthe() {
  const today = new Date();
  let formatPrevMonth = new Date(today.setMonth(today.getMonth() - 1));
  return formatPrevMonth;
}
export {
  isInThePast,
  dateFormatter,
  timeFormatter,
  idGenarator,
  calTimePeriode,
  calLastMonthe,
};
