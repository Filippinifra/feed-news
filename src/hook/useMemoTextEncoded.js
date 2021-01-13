import { useEffect, useState } from "react";
import { getStringFromHtmlString } from "utils/stringHandler";

export const useMemoTextEncoded = (text) => {
  const [textResult, setTextResult] = useState(null);

  useEffect(() => {
    text ? setTextResult(getStringFromHtmlString(text)) : null;
  }, [text]);

  return { text: textResult };
};
