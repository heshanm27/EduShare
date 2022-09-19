function isInThePast(date) {
  const comapireDate = new Date(date);
  const today = new Date();
  // This line sets the hour of the current date to midnight
  // so the comparison only returns `true` if the passed in date
  // is at least yesterday
  today.setHours(0, 0, 0, 0);
  return comapireDate < today;
}

export { isInThePast };
