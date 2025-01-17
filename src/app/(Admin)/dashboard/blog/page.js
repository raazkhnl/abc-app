import Loader from "@/app/utils/Loader";
import React, { Suspense, lazy } from "react";
const AdminBlog = lazy(() => import("@/app/components/Blog/AdminBlog"));

function Page() {
  return (
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }
    >
      <AdminBlog />
    </Suspense>
  );
}

export default Page;
