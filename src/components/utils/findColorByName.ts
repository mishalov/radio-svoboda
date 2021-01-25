import namedColors from "color-name-list";
import TTag from "src/types/TTag";

const findColorByName = (tagItem: TTag) => {
  const possibleColor = namedColors.find(
    (color) =>
      color.name.toLowerCase().indexOf(tagItem.tag.toLowerCase()) !== -1
  );

  return possibleColor;
};

export default findColorByName;
