export const getColor = (lv: 0 | 1 | 2 | 3 | 4 | 5) => {
  let color = "grey";
  switch (lv) {
    case 1:
      color = "grey";
      break;
    case 2:
      color = "green";
      break;
    case 3:
      color = "blue";
      break;
    case 4:
      color = "purple";
      break;
    case 5:
      color = "gold";
      break;
    default:
      break;
  }
  return color;
};
