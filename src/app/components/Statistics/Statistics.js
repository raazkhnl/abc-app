"use client";
import React from "react";
import StatisticsCard from "./StatisticsCard";

const Statistics = () => {
  // Dummy data for statistics
  const statisticsData = [
    {
      title: "Happy Customers",
      count: "10,000+ ",
    },
    {
      title: "Ongoing Projects",
      count: "56",
    },
    {
      title: "Completed Projects",
      count: "789",
    },
    {
      title: "Awards Won",
      count: "12",
    },
  ];

  return (
    <>
      <div className="relative flex flex-col items-center text-center w-full">
        <h1 className="font-bold text-3xl mb-7">A Few Facts About Our Consultancy</h1>
        <div className="absolute bottom-3 h-1 w-[90%] md:w-[40%] bg-yellow-300"></div>
      </div>
      <div className="w-[80%] flex flex-col flex-wrap justify-evenly items-center sm:flex-row mx-auto mt-7 mb-7">
        {statisticsData.map((stat, index) => (
          <StatisticsCard key={index} title={stat.title} count={stat.count} />
        ))}
      </div>
    </>
  );
};

export default Statistics;
