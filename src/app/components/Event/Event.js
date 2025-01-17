import React from "react";

const Event = () => {
  return (
    <>
      <div className="relative flex flex-col items-center w-full mt-2">
        <h1 className="font-bold text-3xl mb-7">Latest Events</h1>
        <div className="absolute bottom-3 h-1 w-[60%] md:w-[15%] bg-yellow-300"></div>
      </div>
      <div className="w-[80%] mx-auto flex flex-col-reverse md:flex md:flex-row mt-7 mb-7">
        <div className="w-[5%] mt-3 text-center">
          <p className="font-medium text-gray-600">APR</p>
          <h1 className="font-extrabold text-3xl">04</h1>
          <p className="font-medium text-gray-600">2001</p>
        </div>
        <div className="w-[65%] mx-auto mt-4 md:mt-3 mb-2">
          <h4 className="font-semibold text-blue-400">June 15, 2021 @ 1:00 pm - 5:00 pm AEST</h4>
          <h1 className="font-bold mb-2 text-3xl">
            Expert Education & Visa Services Sydney Level 6, 263 Clarence
            Street, NSW
          </h1>
          <hr className="h-1 bg-yellow-400 mb-2" />
          <p className="font-semibold text-lg text-gray-600">
            Yes, our Physical Face-to-Face event is back! Expert Education
            invites all aspiring international students to attend our
            face-to-face event happening on 15 June 2021. In this highly
            interactive physical event, international students can not only get
            valuable information on Regional stay options but also can meet
            representatives from more than 20 universities and colleges and
            discuss their … Continue reading
          </p>
        </div>
        <div className="mx-auto w-[25%]">
          <img
            src="https://experteducation.com/nepal/wp-content/uploads/sites/10/2021/06/June-Exhibition-Event-Banner-2048x1072.jpg"
            className="mx-auto h-full rounded-xl"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Event;
