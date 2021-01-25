import { v4 } from "uuid";
import TTag from "../../types/TTag";

const splitIntoTags = (hash: string): TTag[] => {
  const tagsRegexp = /=(.+)/;
  const tagsRegexpResult = tagsRegexp.exec(hash);

  /**
   * results of regexp:
   * 1. full string;
   * 2. first part (#tags)
   * 3. colors, thats what we need
   */
  if (!tagsRegexpResult || tagsRegexpResult.length !== 2) {
    return [];
  }

  const listRow: TTag[] = tagsRegexpResult[1]
    .split(",")
    .filter((el) => el)
    .map((tag) => ({ tag: decodeURI(tag), uuid: v4() }));

  return listRow || [];
};

export default splitIntoTags;
