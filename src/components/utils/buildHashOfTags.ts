import TTag from "../../types/TTag";

const buildHashOfTags = (tags: TTag[]) =>
  `#tags=${tags.map((tagObject) => tagObject.tag).join()}`;

export default buildHashOfTags;
