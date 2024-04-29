import { useTheme } from "@emotion/react";

export const navbarStyles = () => {
  const theme = useTheme();

  return {
    menuItemStyles: {
      justifyContent: "center",
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 3
      },
    },
    buttonStyle: {
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  };
};

