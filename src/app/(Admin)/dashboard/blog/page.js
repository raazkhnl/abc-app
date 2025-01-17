import Loader from "@/app/utils/Loader";
import React, { Suspense, lazy } from "react";
const Blog = lazy(() => import("@/app/components/Blog/Blog"));

function page() {
  return (
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }
    >
      <Blog/>
    </Suspense>
  );
}

export default page;
