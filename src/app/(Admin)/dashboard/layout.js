import Sidebar from "@/app/components/Sidebar/Sidebar";
import "../../globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Script from "next/script";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ABC Educational Consultancy - Dashboard",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        <ToastContainer position="top-right" autoClose={2000} />
        <Sidebar />
        <div className="p-4 sm:ml-64">{children}</div>

        {/* Use next/script for asynchronous script loading */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"
        />
      </body>
    </html>
  );
}
