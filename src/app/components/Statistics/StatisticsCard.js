"use client";
import React from "react";

const StatisticsCard = (props) => {
  return (
    <>
      <div className="md:w-[24%] w-full block max-w-sm p-6 text-center bg-white shadow hover:bg-gray-100 cursor-pointer mb-3">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {props.title}
        </h5>
        <p className="font-semibold text-gray-700 ">
          {props.count}
        </p>
      </div>
    </>
  );
};

export default StatisticsCard;
