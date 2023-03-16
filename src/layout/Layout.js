import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Slider from "../components/slider/Slider";

const Layout = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex">
      <Slider open={open} setOpen={setOpen} />

      <div
        className={`m-3 text-xl text-gray-900 font-semibold w-full ${
          open
            ? "ml-[24rem] md:ml-[19rem] duration-500 opacity-[0]  md:opacity-100"
            : "ml-[5rem] duration-500"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
