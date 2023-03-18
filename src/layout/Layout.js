import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { COUNTER_CONTEXT } from "../App";
import Slider from "../components/slider/Slider";

const Layout = () => {
  const [open, setOpen] = useState(true);
  const { user } = useContext(COUNTER_CONTEXT);

  return (
    <div className="flex">
      <Slider open={open} setOpen={setOpen} role={user?.role} />

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
