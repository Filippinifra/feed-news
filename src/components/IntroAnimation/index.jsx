import React from "react";
import { FIRST_COLOR } from "constants/palette";
import AnimatedSplash from "react-native-animated-splash-screen";

export const IntroAnimation = ({ children, loaded }) => (
  <AnimatedSplash
    translucent={true}
    isLoaded={loaded}
    logoImage={require("images/logo.png")}
    backgroundColor={FIRST_COLOR}
    logoWidth={80}
    logoHeight={80}
  >
    {children}
  </AnimatedSplash>
);
