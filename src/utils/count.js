export const sumActivatedNotActivated = (data) => {
  let totalActivated = 0;
  let totalNotActivated = 0;

  data.forEach((item) => {
    totalActivated += item.activated;
    totalNotActivated += item.notActivated;
  });

  return [totalActivated, totalNotActivated];
};
