import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";

const StaticLayout = ({ dark }: { dark: boolean }): ReactElement => (
  <Box>
    <Header dark={dark} />

    <Box>
      <Outlet />
    </Box>

    <Footer />
  </Box>
);

export default StaticLayout;
