"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Slider() {
  const [refresh, setRefresh] = useState("");
  const { pathname } = usePathname();

  const images = [
    "https://images.unsplash.com/photo-1730292421765-618a6f7aeed7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1457270508644-1e4905fabd7e?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1709483076965-a89e22e9f3a5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  useEffect(() => {
    setRefresh(pathname);
  }, [pathname]);

  const [activeIndex, setActiveIndex] = useState(0);

  // Automatically go to the next slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval); // Clear the interval when the component is unmounted
  }, []);

  // Function to go to the next image
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous image
  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div
      id="indicators-carousel"
      className="relative w-full h-[40vh] md:h-[50vh]"
    >
      <div
        className="relative overflow-hidden"
        style={{ height: "100%", width: "100%" }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out transition-opacity ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
              width={1000} // Used for optimization with the next/image component
              height={500} // Ensures a consistent aspect ratio
              sizes="100vw" // Ensures the image uses the full viewport width
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        <button
          type="button"
          className="w-3 h-3 rounded-full"
          onClick={prevSlide}
          aria-label="Previous Slide"
        ></button>
      </div>

      <div className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
        <button
          type="button"
          onClick={prevSlide}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60"
        >
          <span className="sr-only">Previous</span>
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
        </button>
      </div>

      <div className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
        <button
          type="button"
          onClick={nextSlide}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60"
        >
          <span className="sr-only">Next</span>
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
        </button>
      </div>
    </div>
  );
}

export default Slider;
