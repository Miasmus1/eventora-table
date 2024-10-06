function formatDate(date) {
  if (!date) return 'Invalid Date';

  const dateObj = new Date(date);
  const localDate = dateObj.toLocaleDateString(undefined);

  return localDate;
}

export default formatDate;
