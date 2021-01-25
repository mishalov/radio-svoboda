import TTag from "../../types/TTag";

const removeTagFromList = (tags: TTag[], tag: TTag) =>
  tags.filter((tagObject) => tagObject.uuid !== tag.uuid);

export default removeTagFromList;
