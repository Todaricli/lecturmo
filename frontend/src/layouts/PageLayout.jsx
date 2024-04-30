import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";

export default function PageLayout() {
  return (
    <>
      <Navbar />
      <section>
        <Outlet />
      </section>
    </>
  );
}