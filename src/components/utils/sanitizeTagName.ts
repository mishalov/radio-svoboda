const sanitizeTagName = (tagName: string): string | false => {
  if (!tagName) return tagName;
  const sanRegexp = /[^=^,^#]+/;
  if (sanRegexp.test(tagName)) return tagName;
  return false;
};

export default sanitizeTagName;
