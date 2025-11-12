import { useEffect, useRef, useState } from "react";
import useSecure from "../hooks/useSecure";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";
import DashboardItem from "../components/DashboardItem/DashboardItem";
import UpdateModal from "../components/UpdateModal/UpdateModal";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosInstance = useSecure();
  const [data, setData] = useState(null);
  const [current, setCurrent] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const modalRef = useRef(null);
  const confirmModalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(
        `http://localhost:3000/pets-and-supplies/user/${user.email}`
      );
      setData(res.data);
    };
    fetchData();
  }, [axiosInstance, user]);

  if (!data) return <Loading />;

  const handleUpdate = (item) => {
    setCurrent(item);
    modalRef.current.showModal();
  };

  const updateUIData = (item) => {
    setData((prev) => {
      const newData = [...prev];
      const index = newData.findIndex((i) => i._id === item.id);
      newData[index] = {
        _id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        location: item.location,
        description: item.description,
        image: item.image,
        email: item.email,
        date: item.date,
      };
      return newData;
    });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    confirmModalRef.current.showModal();
  };

  const confirmDelete = () => {
    axiosInstance.delete(`/pets-and-supplies/${deleteId}`).then((res) => {
      if (res.data.deletedCount) {
        const newData = data.filter((item) => item._id !== deleteId);
        setData(newData);
        toast.success("Post Deleted Successfully!");
      }
      confirmModalRef.current.close();
      setDeleteId(null);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <title>Dashboard | PawMart</title>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#ff9266] to-[#fc4422] rounded-2xl shadow-lg mb-4">
            <span className="text-2xl text-white">🐾</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Manage your pet supplies listings and track your activities
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{data.length}</p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <span className="text-[#fc4422] text-xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Free Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {data.filter(item => item.price === 0).length}
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <span className="text-green-600 text-xl">🎁</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{data.length}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <span className="text-blue-600 text-xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Table */}
        {data.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-gray-400">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No listings yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start by adding your first pet supply listing to get started.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-[#ff9266] to-[#fc4422] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200">
                Add First Listing
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Listings
              </h2>
            </div>

            {/* Mobile Cards View */}
            <div className="lg:hidden">
              {data.map((item, idx) => (
                <div
                  key={item._id}
                  className={`p-6 border-b border-gray-100 dark:border-gray-700 ${
                    idx % 2 === 0 
                      ? "bg-white dark:bg-gray-800" 
                      : "bg-gray-50 dark:bg-gray-900/50"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-xl border border-gray-200 dark:border-gray-600 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.category}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">📍</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {item.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      {item.price === 0 ? (
                        <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium rounded-full">
                          Free
                        </span>
                      ) : (
                        <span className="text-[#fc4422] font-semibold">
                          ${item.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(item)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-[#ff9266] to-[#fc4422] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all duration-200 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#ff9266]/10 to-[#fc4422]/10 border-b border-gray-100 dark:border-gray-700">
                    <th className="py-4 px-6 text-left text-xs font-semibold text-[#fc4422] uppercase tracking-wider">
                      Item
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-[#fc4422] uppercase tracking-wider">
                      Category
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-[#fc4422] uppercase tracking-wider">
                      Price
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-[#fc4422] uppercase tracking-wider">
                      Location
                    </th>
                    <th className="py-4 px-6 text-center text-xs font-semibold text-[#fc4422] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {data.map((item, idx) => (
                    <DashboardItem
                      key={item._id}
                      item={item}
                      handleUpdate={handleUpdate}
                      handleDelete={handleDelete}
                      index={idx}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Update Modal */}
        <UpdateModal
          modalRef={modalRef}
          item={current}
          updateUIData={updateUIData}
        />

        {/* Delete Confirm Modal */}
        <dialog ref={confirmModalRef} className="modal">
          <div className="modal-box bg-white dark:bg-gray-800 text-center rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl max-w-md">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-red-600">⚠️</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Delete Listing
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this listing? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => confirmModalRef.current.close()}
                className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-all duration-200"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Dashboard;