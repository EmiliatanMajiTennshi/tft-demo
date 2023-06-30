export const getColor = (lv: 0 | 1 | 2 | 3 | 4 | 5) => {
  let color = "grey";
  switch (lv) {
    case 1:
      color = "#213042";
      break;
    case 2:
      color = "#156831";
      break;
    case 3:
      color = "#12407c";
      break;
    case 4:
      color = "#893088";
      break;
    case 5:
      color = "#b89d27";
      break;
    default:
      break;
  }
  return color;
};
