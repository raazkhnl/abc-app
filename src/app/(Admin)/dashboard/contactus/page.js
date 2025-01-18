"use client"
import React from "react";
import { toast, ToastContainer } from "react-toastify";

function Page() {
  const [contacts, setContacts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState(null);

  // Fetch all contact submissions
  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contactus/read`,
        {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      ); 
      const data = await response.json();
      if (response.ok) {
        setContacts(data.result || []);
      } else {
        toast.error(data.message || "Failed to fetch contacts.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching contacts.");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchContacts();
  }, []);

  // Delete a contact submission
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contactus/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Contact deleted successfully.");
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== id)
        );
      } else {
        toast.error(data.message || "Failed to delete contact.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the contact.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Contact Us Submissions</h1>
      {isLoading ? (
        <div>Loading contacts...</div>
      ) : contacts.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {contact.name}
                  </td>
                  <td className="px-6 py-4">
                    {contact.phone || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4">
                    {contact.description || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(contact.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className={`text-white px-4 py-2 rounded-lg text-sm ${deletingId === contact._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                        }`}
                      onClick={() => handleDelete(contact._id)}
                      disabled={deletingId === contact._id}
                    >
                      {deletingId === contact._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No contact submissions found.</div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Page;