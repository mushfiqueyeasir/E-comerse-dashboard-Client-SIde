import React from "react";

const InfoCard = ({ logo, name, count }) => {
  return (
    <div className="border-2 shadow-lg rounded-2xl flex flex-col justify-center items-center gap-2  px-5 py-2 hover:scale-[1.05] duration-300">
      <img src={logo} alt="" className="object-cover w-[100px]" />
      <h2 className="text-gray-500 text-base">{name}</h2>
      <h1 className="text-sky-600 text-3xl">{count}</h1>
    </div>
  );
};

export default InfoCard;
