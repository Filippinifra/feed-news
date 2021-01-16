import { parse } from "himalaya";
import * as rssParser from "react-native-rss-parser";

export const fetchUrl = (url, callbackLeft, callbackRight) => {
  fetch(url)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then(callbackLeft)
    .catch(callbackRight);
};

const getImageFromContent = (content) => {
  if (content) {
    const parsedContent = parse(content);

    const elementWithImage = parsedContent.find(
      ({ tagName }) => tagName === "img"
    );

    const attributeImage = elementWithImage?.attributes.find(
      ({ key }) => key === "src"
    );

    return attributeImage?.value;
  }
};

const getImageFromDescription = (description) => {
  if (description) {
    const parsedDescription = parse(description);

    const elementWithImage = parsedDescription.find(
      ({ tagName }) => tagName === "img"
    );

    const attributeImage = elementWithImage?.attributes.find(
      ({ key }) => key === "src"
    );

    return attributeImage?.value;
  }
};

export const getImageFeedItem = (content, description, image) => {
  const imageFromContent = getImageFromContent(content);
  if (imageFromContent) {
    return imageFromContent;
  }

  const imageFromDescription = getImageFromDescription(description);
  if (imageFromDescription) {
    return imageFromDescription;
  }

  const imageFromImageObj = image?.url;
  if (imageFromImageObj) {
    return imageFromImageObj;
  }
};
