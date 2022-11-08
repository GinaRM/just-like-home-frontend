import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const PaginationNumbers = ({ pages, setCurrentPage }) => {
  const theme = createTheme({
    status: {
      danger: "#384d58",
    },
    palette: {
      primary: {
        main: "#d0d0ca",
        darker: "#384d58",
      },
      neutral: {
        main: "#384d58",
        contrastText: "#fff",
      },
    },
  });

  const showCurrentProducts = (event, page) => {
    event.preventDefault();

    /*   document.getElementById("category-container").scrollIntoView(); */
    document.getElementById("recommendation-h2").scrollIntoView();
    setCurrentPage(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <Pagination
          count={pages}
          color="primary"
          size="medium"
          onChange={showCurrentProducts}
        />
      </Stack>
    </ThemeProvider>
  );
};
export default PaginationNumbers;
