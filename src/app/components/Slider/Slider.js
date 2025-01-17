"use client";
import React from "react";

function Slider() {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQmUoRyARahVZUGodS3sjHTgKW8QOAdw3AAkTZrtbr9w&s",
    "https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190207/examples/carousel/carousel-1/images/lands-endslide__800x600.jpg",
    "https://demos.creative-tim.com/material-kit/assets-old/img/bg2.jpg",
    "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIf-pZhsMJc0jCD0O9H2THIKi31pB86hmfgt3BjP19wev-tGX4BSJLfKzW0KohfleigCk&usqp=CAU",
  ];
  return (
    <div
      id="indicators-carousel"
      className="relative w-full"
      data-carousel="slide"
      style={{ height: "70vh" }}
    >
      <div
        className="relative overflow-hidden md:h-9"
        style={{ height: "70vh" }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`hidden duration-700 ease-in-out ${
              index === 0 ? "active" : ""
            }`}
            data-carousel-item={index === 0 ? "active" : ""}
          >
            <img
              src={image}
              className="absolute block w-full h-[90%] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        <button
          type="button"
          className="w-3 h-3 rounded-full"
          aria-current="false"
          aria-label="Slide 3"
          data-carousel-slide-to="2"
        ></button>
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}

export default Slider;
