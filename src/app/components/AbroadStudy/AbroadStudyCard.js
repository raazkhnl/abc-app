"use client";
import Image from "next/image";
import React from "react";

const AbroadStudyCard = (props) => {
  return (
    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow mx-3 mb-3 md:hover:-translate-y-4 md:hover:ease-in md:hover:duration-300">
      <a href="#">
        <img
          className="rounded-t-lg w-full object-cover"
          src={props.image}
          alt={props.title}
          style={{ height: "200px" }}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {props.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700">
          {props.description}
        </p>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Read more
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default AbroadStudyCard;
