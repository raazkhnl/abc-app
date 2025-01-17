"use client";
import React from "react";
import AbroadStudyCard from "./AbroadStudyCard";

// Step 1: Create demo data
const demoData = [
  {
    title: "Study in the USA",
    description:
      "Experience world-class education in the United States with diverse programs and campuses.",
    images:
      "https://5.imimg.com/data5/SELLER/Default/2022/11/RS/ML/OD/37946428/abroad2-500x500.jpg",
  },
  {
    title: "Study in the UK",
    description:
      "Join prestigious universities in the United Kingdom and enjoy rich cultural heritage.",
    images: "https://pbs.twimg.com/media/D9Fq_IGUEAIppsy.jpg",
  },
  {
    title: "Study in Canada",
    description:
      "Explore top-notch education and a welcoming environment in Canada.",
    images:
      "https://5.imimg.com/data5/SELLER/Default/2022/11/RS/ML/OD/37946428/abroad2-500x500.jpg",
  },
  {
    title: "Study in Australia",
    description:
      "Benefit from innovative programs and sunny climates in Australian universities.",
    images: "https://pbs.twimg.com/media/D9Fq_IGUEAIppsy.jpg",
  },
];

const AbroadStudy = () => {
  return (
    <div className="w-[80%] flex flex-col items-center justify-around mt-7 mb-7 mx-auto md:mt-9 md:mb-9">
      <div className="relative flex flex-col items-center w-full">
        <h1 className="font-bold text-3xl mb-7">Study Abroad</h1>
        <div className="absolute bottom-3 h-1 w-[70%] md:w-[25%] bg-yellow-300"></div>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold text-2xl mb-2">
          Your academic goals are waiting to be achieved
        </p>
        <p className="font-semibold text-lg">Choose your study destination</p>
      </div>

      <div className="sm:flex sm:flex-row-reverse items-center sm:justify-around mt-5 mb-5 md:mt-7 md:mb-7">
        {/* Step 2: Map over the demo data */}
        {demoData.map((item, index) => (
          <AbroadStudyCard
            key={index}
            title={item.title}
            description={item.description}
            image={item.images}
          />
        ))}
      </div>
    </div>
  );
};

export default AbroadStudy;
