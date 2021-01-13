export const getStringFromHtmlString = (text) =>
  text
    .split("&")
    .map((text) => text.split(";"))
    .flat(100)
    .map((text) =>
      text.substring(0, 1) === "#" && text.length > 1
        ? String.fromCharCode(text.substring(1))
        : text
    )
    .join("")
    .replace(/<[^>]*>/g, "")
    .trim();
