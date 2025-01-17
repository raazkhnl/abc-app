import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <>
      <div className="relative flex flex-col items-center w-full">
        <h1 className="font-bold text-3xl mb-7">About Us</h1>
        <div className="absolute bottom-3 h-1 w-[40%] md:w-[15%] bg-yellow-300"></div>
      </div>
      <div className="w-[80%] mx-auto flex flex-col md:flex md:flex-row-reverse mt-7 mb-7">
        <div className="mx-auto">
          <img
            src="https://picsum.photos/1024/480/?image=54"
            className="rounded-lg mx-auto w-[80%] h-full"
            alt=""
          />
        </div>
        <div className="w-[80%] mx-auto mt-4 md:mt-3 mb-2">
          <h1 className="font-extrabold mb-2 text-3xl text-center">Background</h1>
          <p className="font-semibold text-lg text-gray-600">
            &quot;Empowering Futures, Illuminating Paths: Welcome to KBS Educational
            Consultancy, where education meets innovation and dreams take
            flight. With a steadfast commitment to guiding students towards
            their brightest academic horizons, we craft personalized journeys
            towards success. Our seasoned experts navigate the intricate
            landscape of education, providing tailored solutions that unlock
            potentials and foster growth. Whether it&apos;s university admissions,
            career counseling, or skill enhancement, we stand as beacons of
            knowledge, dedicated to shaping tomorrow&apos;s leaders. Join us on a
            transformative voyage where every step paves the way for boundless
            opportunities and lifelong achievements.&quot;
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
