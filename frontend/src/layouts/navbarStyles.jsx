import { useTheme } from "@emotion/react";

export const navbarStyles = () => {
  const theme = useTheme();

  return {
    menuItemStyles: {
      justifyContent: "center",
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 3,
      },
    },
    buttonStyle: {
      margin: "0 10px",
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    register: {
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        color: "#000000"
      },
      backgroundColor: theme.palette.background.default,
      color: theme.palette.secondary.main,
      borderRadius: 10,
      padding: "10px",
      width: "100px"
    },
  };
};

