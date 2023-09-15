import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React, { ReactElement, ReactNode } from "react";

const colors = {
  brand: "#F35714",
  success: "#12D979",
  ui: {
    dark1: "#232429",
    dark2: "#1C1C24",
    dark3: "#15161B",
    dark4: "#282B32",
    darkBlue: "#2B2F3B",
    blue: "#383E4E",
    gray: "#939BB0",
    orange: "#F35714",
    green: "#12D979",
    darkGreen: "#095C34",
    red: "#D93612"
  },

  text: {
    100: "#E7EAEF",
    200: "#BAC1D4",
    300: "#88909B",
    400: "#727584"
  },

  buttonBlue: {
    500: "#2B2F3B",
    600: "#383E4E",
    700: "#2B2F3B"
  },

  buttonOrange: {
    500: "#F35714",
    600: "#F37640",
    700: "#D94E13"
  },

  buttonGhost: {
    50: "#383E4E",
    100: "#2B2F3B"
  },

  twitch: {
    500: "#9146ff",
    600: "#a364ff"
  },

  youtube: {
    500: "#e62117",
    600: "#ea453c"
  },

  green: {
    100: "#12D979",
    800: "#095C34"
  }
};

const fonts = {
  heading: "Montserrat",
  body: "Montserrat"
};

const components = {
  Heading: {
    baseStyle: {
      fontWeight: 600
    }
  },
  Modal: {
    baseStyle: {
      dialog: {
        header: {
          color: "white",
          borderBottom: "1px solid #282B32",
          padding: 6
        },
        body: {
          padding: 0
        },
        bg: "ui.dark2"
      }
    }
  },
  Badge: {
    baseStyle: {
      paddingTop: 0.5,
      paddingBottom: 0.5,
      paddingLeft: 1.5,
      paddingRight: 1.5,
      borderRadius: "md",
      fontWeight: 600
    }
  }
};

const textStyles = {
  subtitle: {
    fontSize: { base: "md", lg: "lg" },
    lineHeight: "2"
  }
};

const layerStyles = {
  box: {
    boxShadow: "0px 1px 14px rgba(42, 42, 42, 0.15)",
    backgroundColor: "white",
    borderRadius: "2xl",
    overflow: "hidden"
  },
  heading: {
    marginBottom: 5
  }
};

const sizes = {
  container: {
    "2xl": "1440px"
  }
};

const theme = extendTheme({
  components,
  textStyles,
  layerStyles,
  colors,
  fonts,
  sizes
});

const Theme = ({ children }: { children: ReactNode }): ReactElement => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

export default Theme;
