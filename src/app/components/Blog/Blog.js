import React from "react";

const Blog = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [fetchLoading, setFetchLoading] = React.useState(true);

  // Fetch blogs from the API
  const fetchBlogs = async () => {
    setFetchLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/read`,
        {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBlogs(data.result || []);
    } catch (error) {
    } finally {
      setFetchLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <>
      <div className="relative flex flex-col items-center w-full mt-2">
        <h1 className="font-bold text-3xl mb-7">Blog</h1>
        <div className="absolute bottom-3 h-1 w-[40%] md:w-[10%] bg-yellow-300"></div>
      </div>
      <div className="w-[90%] mx-auto mt-6">
        {fetchLoading ? (
          <div className="text-center">Loading blogs...</div>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="w-[80%] mx-auto flex flex-col-reverse md:flex md:flex-row-reverse mt-7 mb-7"
            >
              <div className="w-[80%] mx-auto mt-4 md:mt-3 mb-2">
                <h1 className="font-extrabold mb-2 text-3xl">{blog.title} </h1>
                <hr className="h-1 bg-yellow-400 mb-2" />
                <p className="font-semibold text-lg text-gray-600">
                  {blog.description}{" "}
                </p>
              </div>
              <div className="mx-auto">
                <img
                  src={blog.image}
                  className="mx-auto w-[80%] h-full max-h-[300px] rounded-xl"
                  alt={blog.altText || "Blog image"}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No blogs found.</div>
        )}
      </div>
    </>
  );
};
export default Blog;
