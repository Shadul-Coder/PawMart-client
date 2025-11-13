import { useEffect, useRef, useState } from "react";
import useSecure from "../hooks/useSecure";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";
import DashboardItem from "../components/DashboardItem/DashboardItem";
import UpdateModal from "../components/UpdateModal/UpdateModal";
import toast from "react-hot-toast";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaDropbox } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { GoAlertFill } from "react-icons/go";

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
        `/pets-and-supplies/user/${user.email}`
      );
      setData(res.data);
    };
    fetchData();
  }, [axiosInstance, user]);
  if (!data) {
    return <Loading />;
  }
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
    <>
      <title>Dashboard | PawMart</title>
      <section className="max-w-7xl cursor-default mx-auto py-9 sm:py-13 w-[95%] lg:w-[97%]">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-[#ff9266] to-[#fc4422] rounded-2xl shadow-lg mb-4">
            <span className="text-2xl text-white">
              <LuLayoutDashboard />
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-base-content/70 max-w-md mx-auto">
            Manage your pet supplies posts and track your activities
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow duration-300 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70 font-medium">
                  Total Posts
                </p>
                <p className="text-2xl text-[#fc4422] font-bold mt-1">
                  {data.length}
                </p>
              </div>
              <div className="p-3 bg-base-200 rounded-xl">
                <span className="text-[#fc4422] text-xl">
                  <FaDropbox />
                </span>
              </div>
            </div>
          </div>
          <div className="bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow duration-300 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70 font-medium">
                  Adopt Posts
                </p>
                <p className="text-2xl text-[#fc4422] font-bold mt-1">
                  {data.filter((item) => item.price === 0).length}
                </p>
              </div>
              <div className="p-3 bg-base-200 rounded-xl">
                <span className="text-[#fc4422] text-xl">
                  <MdOutlinePets />
                </span>
              </div>
            </div>
          </div>
          <div className="bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow duration-300 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70 font-medium">
                  Active
                </p>
                <p className="text-2xl text-[#fc4422] font-bold mt-1">
                  {data.length}
                </p>
              </div>
              <div className="p-3 bg-base-200 rounded-xl">
                <span className="text-[#fc4422] text-xl">
                  <SiTicktick />
                </span>
              </div>
            </div>
          </div>
        </div>
        {data.length === 0 ? (
          <div className="text-center py-12 md:py-16 bg-base-100 rounded-2xl md:rounded-3xl shadow-sm border border-base-300">
            <div className="w-15 h-15 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-base-300 rounded-full flex items-center justify-center">
              <HiOutlineClipboardDocumentList className="text-base-content/70 text-2xl md:text-3xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-base-content mb-2">
              No posts yet
            </h3>
            <p className="text-base-content/70 max-w-sm mx-auto text-sm md:text-base">
              Get started by posting your first pet or product
            </p>
          </div>
        ) : (
          <div className="bg-base-100 rounded-2xl shadow-md border border-base-300 overflow-hidden">
            <div className="px-4 py-3 sm:px-6 sm:py-4">
              <h2 className="text-base sm:text-lg font-semibold">Your Posts</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-3xl sm:min-w-full">
                <thead>
                  <tr className="bg-linear-to-r from-[#ff9266]/10 to-[#fc4422]/10">
                    <th className="py-3 px-3 sm:py-4 sm:px-4 md:px-6 text-left text-xs font-semibold text-[#fc4422] uppercase tracking-wider">
                      Item
                    </th>
                    <th className="py-3 px-2 sm:py-4 sm:px-3 md:px-6 text-left text-xs font-semibold text-[#fc4422] uppercase tracking-wider">
                      Category
                    </th>
                    <th className="py-3 px-2 sm:py-4 sm:px-3 md:px-6 text-left text-xs font-semibold text-[#fc4422] uppercase tracking-wider">
                      Price
                    </th>
                    <th className="py-3 px-2 sm:py-4 sm:px-3 md:px-6 text-left text-xs font-semibold text-[#fc4422] uppercase tracking-wider">
                      Location
                    </th>
                    <th className="py-3 px-2 sm:py-4 sm:px-3 md:px-6 text-center text-xs font-semibold text-[#fc4422] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300">
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
        <UpdateModal
          modalRef={modalRef}
          item={current}
          updateUIData={updateUIData}
        />
        <dialog ref={confirmModalRef} className="modal">
          <div className="modal-box text-center rounded-2xl border border-base-100  shadow-xl max-w-md">
            <div className="text-[#fdd32b] text-5xl my-5">
              <GoAlertFill className="mx-auto" />
            </div>
            <h3 className="text-lg font-bold mb-2">Delete Post</h3>
            <p className="text-base-content/70 mb-6">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => confirmModalRef.current.close()}
                className="px-6 py-2.5 bg-base-200 font-medium rounded-xl transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:opacity-90 transition-all duration-200 cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};

export default Dashboard;
