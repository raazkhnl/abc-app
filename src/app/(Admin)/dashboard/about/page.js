import Loader from "@/app/utils/Loader";
import React, { Suspense, lazy } from "react";
const About = lazy(() => import("@/app/components/About/About"));
function Page() {
  return (
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }
    >
      <About />
    </Suspense>
  );
}

export default Page;
