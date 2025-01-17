"use client";

import React, { useState, useEffect } from "react";

const AdminBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priorityOrder: "",
    description: "",
    image: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch blogs from the API
  const fetchBlogs = async () => {
    setFetchLoading(true);
    try {
      const response = await fetch("/api/blog/read");
      const data = await response.json();
      setBlogs(data.result || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("category", formData.category);
      form.append("priorityOrder", formData.priorityOrder);
      form.append("description", formData.description);
      if (formData.image) {
        form.append("image", formData.image);
      }

      const endpoint = isEditMode ? `/api/blog/update/${editBlogId}` : "/api/blog/create";
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        body: form,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(isEditMode ? "Blog updated successfully!" : "Blog created successfully!");
        setFormData({
          title: "",
          category: "",
          priorityOrder: "",
          description: "",
          image: null,
        });
        setIsModalOpen(false);
        fetchBlogs();
      } else {
        setMessage(result.message || "Failed to save the blog.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setIsEditMode(false);
      setEditBlogId(null);
    }
  };

  const handleEdit = (blog) => {
    setIsEditMode(true);
    setEditBlogId(blog._id);
    setFormData({
      title: blog.title,
      category: blog.category,
      priorityOrder: blog.priorityOrder,
      description: blog.description,
      image: null, // Reset image input
    });
    toggleModal();
  };

  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(`/api/blog/delete/${blogId}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Blog deleted successfully!");
        fetchBlogs();
      } else {
        setMessage(result.message || "Failed to delete the blog.");
      }
    } catch (error) {
      setMessage("An error occurred while deleting the blog.");
    }
  };

  return (
    <>
      {/* Header with Button */}
      <div className="relative flex flex-col items-center w-full mt-2">
        <div className="absolute top-2 right-2">
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2"
            onClick={() => {
              setIsEditMode(false);
              setEditBlogId(null);
              setFormData({
                title: "",
                category: "",
                priorityOrder: "",
                description: "",
                image: null,
              });
              toggleModal();
            }}
          >
            Create Blog
          </button>
        </div>
        <h1 className="font-bold text-3xl mb-7">Blog</h1>
        <div className="absolute bottom-3 h-1 w-[40%] md:w-[10%] bg-yellow-300"></div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-1/2">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-medium">{isEditMode ? "Edit Blog" : "Create Blog"}</h3>
              <button
                className="text-gray-400 hover:bg-gray-200 rounded-lg p-2"
                onClick={toggleModal}
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="block w-full p-2 border rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the blog title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    className="block w-full p-2 border rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the blog category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="priorityOrder" className="block text-sm font-medium text-gray-700">
                    Priority Order
                  </label>
                  <input
                    type="number"
                    id="priorityOrder"
                    name="priorityOrder"
                    className="block w-full p-2 border rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter priority order"
                    value={formData.priorityOrder}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    className="block w-full p-2 border rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write your blog description here"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                    onChange={handleFileChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : isEditMode ? "Update" : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Blogs List */}
      <div className="w-[90%] mx-auto mt-6">
        {fetchLoading ? (
          <div className="text-center">Loading blogs...</div>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="w-[80%] mx-auto flex flex-col-reverse md:flex md:flex-row-reverse mt-7 mb-7">
              <div className="mx-auto mt-4 md:mt-3 mb-2">
                <h1 className="font-extrabold mb-2 text-3xl">
                  {blog.title}          </h1>
                <hr className="h-1 bg-yellow-400 mb-2" />
                <p className="font-semibold text-lg text-gray-600">
                  {blog.description} </p>
                <div className="space-x-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mx-auto md:p-2">
                <img
                  src={blog.image}
                  className="mx-auto w-[100rem] h-[200px] rounded-xl"
                  alt={blog.altText || "Blog image"}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No blogs found.</div>
        )}
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className="mt-4 text-center text-sm font-medium text-gray-700">
          {message}
        </div>
      )}
    </>
  );
};

export default AdminBlog;
