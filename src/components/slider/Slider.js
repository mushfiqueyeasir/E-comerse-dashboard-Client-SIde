import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdAddBox } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { BsCheckAll, BsCartXFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

const Slider = ({ open, setOpen, role }) => {
  const navigate = useNavigate();
  const menus = [
    { name: "dashboard", link: "dashboard", icon: MdOutlineDashboard },
    { name: "products", link: "products", icon: GiClothes },

    { name: "Sold products", link: "soldProduct", icon: BsCheckAll },
    { name: "Add products", link: "addProduct", icon: MdAddBox },
    {
      name: "Deleted products",
      link: "deletedProduct",
      icon: BsCartXFill,
      margin: true,
    },
    { name: "user", link: "user", icon: AiOutlineUser },
  ];

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

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
        {menus
          .slice(0, role === "admin" ? menus.length : menus.length - 1)
          ?.map((menu, i) => (
            <NavLink
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mb-5"
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

        <button
          onClick={handleLogout}
          className="group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
        >
          <div>{React.createElement(AiOutlineLogout, { size: "20" })}</div>
          <h2
            style={{
              transitionDelay: `${menus.length + 3}00ms`,
            }}
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            Logout
          </h2>
        </button>
      </div>
    </section>
  );
};

export default Slider;
