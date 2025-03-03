"use client";
import React, { useState } from "react";
import "./Navbar.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

function Navbar() {
  const [activeItem, setActiveItem] = useState("/");
  const pathname = usePathname()

  const navItems = [
    { title: "HOME", href: "/" },
    { title: "ABOUT", href: "/about-us" },
    // { title: "EVENTS", href: "/events" },
    { title: "CONTACT US", href: "/contact-us" },
  ];

  const handleItemClick = (href) => {
    setActiveItem(href);
  };
  return (
    <>
      <nav className="bg-white border-gray-200">
        <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              &nbsp; ABC
            </span>
          </a>
          <div className="flex md:order-2">
            <Link href="/login">
              <button
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 mr-2"
              >
                Login
              </button>
            </Link>

            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div> */}
              {/* <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              /> */}
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              {navItems.map((item, index) => (
                <li key={index} className="relative mb-2">
                  {item.title === "HOME" ? (
                    <a
                      href={item.href}
                      className={`block py-2 font-semibold -px-1 text-gray-900 hover:bg-gray-300 hover:rounded-md ${activeItem === pathname ? "active" : ""
                        }`}
                      onClick={() => handleItemClick(item.href)}
                    >
                      {item.title}
                      {activeItem === item.href && (
                        <div className="active-indicator bg-yellow-400"></div>
                      )}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block py-2 font-semibold -px-1 text-gray-900 hover:bg-gray-300 hover:rounded-md ${activeItem === pathname ? "active" : ""
                        }`}
                      onClick={() => handleItemClick(item.href)}
                    >
                      {item.title}
                      {activeItem === item.href && (
                        <div className="active-indicator bg-yellow-400"></div>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
