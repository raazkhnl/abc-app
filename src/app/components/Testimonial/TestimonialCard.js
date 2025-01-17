"use client";
import React from "react";

const TestimonialCard = (props) => {
  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return [
      ...Array(fullStars).fill("full"),
      ...Array(halfStars).fill("half"),
      ...Array(emptyStars).fill("empty"),
    ];
  };

  const stars = generateStars(props.rating);
  return (
    <>
      <div className="max-w-xs w-[85%] bg-white border border-gray-200 rounded-lg shadow mb-3 mx-3">
        <a href="#">
          <div className="flex flex-row items-center justify-center p-4">
            <div className="relative w-30 h-30 overflow-hidden bg-yellow-300 rounded-full">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShB7IwN9gr4q2Tn-1CRfbgANRN-8SWlYMMy9iq467T1A&s"
                className="object-cover w-full h-full"
                alt={props.name}
              />
            </div>
          </div>
        </a>
        <div className="p-5">
          <p className="mb-3 font-normal text-gray-700">{props.review}</p>
          <div className="flex flex-col justify-center items-center">
            <h5 className="text-xl font-bold tracking-tight text-gray-900">
              {props.name}
            </h5>
            <p className="font-semibold ml-4">{props.subtitle}</p>
            <div className="flex items-center mt-1">
              {stars.map((star, index) => {
                if (star === "full") {
                  return (
                    <i
                      key={index}
                      className="fa-solid fa-star text-yellow-300"
                    ></i>
                  );
                } else if (star === "half") {
                  return (
                    <i
                      key={index}
                      className="fa-solid fa-star-half-stroke text-yellow-300"
                    ></i>
                  );
                } else {
                  return (
                    <i
                      key={index}
                      className="fa-regular fa-star text-yellow-300"
                    ></i>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialCard;
