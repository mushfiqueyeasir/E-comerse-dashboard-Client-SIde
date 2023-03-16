import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdAddBox } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { BsCheckAll, BsCartXFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Slider = ({ open, setOpen }) => {
  const menus = [
    { name: "dashboard", link: "dashboard", icon: MdOutlineDashboard },
    { name: "products", link: "products", icon: GiClothes },

    { name: "Sold products", link: "soldProduct", icon: BsCheckAll },
    { name: "Add products", link: "addProduct", icon: MdAddBox },
    { name: "Deleted products", link: "DeletedProduct", icon: BsCartXFill },
    { name: "user", link: "user", icon: AiOutlineUser, margin: true },
  ];

  return (
    <section
      className={`bg-[#0e0e0e] min-h-screen fixed ${
        open ? "w-[24rem] md:w-72" : "w-16"
      } duration-500 text-gray-100 px-4`}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative capitalize">
        {menus?.map((menu, i) => (
          <NavLink
            to={menu?.link}
            key={i}
            className={` ${
              menu?.margin && "mt-5"
            } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md `}
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu?.name}
            </h2>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default Slider;
