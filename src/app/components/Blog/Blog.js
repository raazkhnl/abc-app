import React from "react";

const Blog = () => {
  return (
    <>
      <div className="relative flex flex-col items-center w-full mt-2">
        <h1 className="font-bold text-3xl mb-7">Blog</h1>
        <div className="absolute bottom-3 h-1 w-[40%] md:w-[10%] bg-yellow-300"></div>
      </div>
      <div className="w-[80%] mx-auto flex flex-col-reverse md:flex md:flex-row-reverse mt-7 mb-7">
        <div className="w-[80%] mx-auto mt-4 md:mt-3 mb-2">
          <h1 className="font-extrabold mb-2 text-3xl">
            Unlock Your Future: The Ultimate Guide to Educational Consultancy
          </h1>
          <hr className="h-1 bg-yellow-400 mb-2"/>
          <p className="font-semibold text-lg text-gray-600">
            "Welcome to "KBS Educational Consultancy," your go-to resource for navigating
            the complex world of educational consultancy! Whether you're a
            student dreaming of studying abroad, a parent seeking the best
            educational pathways for your child, or a professional looking to
            further your education, our blog is designed to provide you with
            expert advice, insightful tips, and the latest trends in education."
          </p>
        </div>
        <div className="mx-auto">
          <img
            src="https://media.istockphoto.com/id/1307615661/photo/smiling-indian-business-man-working-on-laptop-at-home-office-young-indian-student-or-remote.jpg?s=612x612&w=0&k=20&c=5Urz6DUqrMmg595KZVDXp86GvbRf5U8A55JG4ML4TG0="
            className="mx-auto w-[80%] h-full rounded-xl"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Blog;
