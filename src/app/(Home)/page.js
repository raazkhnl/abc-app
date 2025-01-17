"use client";
import { Suspense, lazy } from "react";
import Loader from "../utils/Loader";
const Slider = lazy(() => import("../components/Slider/Slider"));
const AbroadStudy = lazy(() =>
  import("../components/AbroadStudy/AbroadStudy.js")
);
const Testimonial = lazy(() => import("../components/Testimonial/Testimonial"));
const Blog = lazy(() => import("../components/Blog/Blog"));
const Event = lazy(() => import("../components/Event/Event"));

export default function Home() {
  return (
    <>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <Slider />
        <AbroadStudy />
        <Testimonial />
        <Blog />
      </Suspense>
    </>
  );
}
