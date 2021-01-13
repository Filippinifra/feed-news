import React, { useEffect, useState } from "react";
import { IntroAnimation } from "components/IntroAnimation";
import { Router } from "components/Router";

export const Code = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 2000);
  }, []);

  return (
    <IntroAnimation loaded={loaded}>
      <Router />
    </IntroAnimation>
  );
};
