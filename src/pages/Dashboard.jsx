import { useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";
import DashboardItem from "../components/DashboardItem/DashboardItem";
import UpdateModal from "../components/UpdateModal/UpdateModal";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [data, setData] = useState(null);
  const [current, setCurrent] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const modalRef = useRef(null);
  const confirmModalRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(
        `http://localhost:3000/pets-and-supplies?email=${user.email}`
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
    <div>
      <title>Dashboard | PawMart</title>
      <div className="max-w-7xl mx-auto space-y-3">
        {data.map((item) => (
          <DashboardItem
            key={item._id}
            item={item}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <UpdateModal
        modalRef={modalRef}
        item={current}
        updateUIData={updateUIData}
      />
      <dialog ref={confirmModalRef} className="modal">
        <div className="modal-box text-center">
          <h3 className="text-lg font-bold mb-4">
            Are you sure you want to delete?
          </h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={confirmDelete}
              className="btn"
            >
              Yes
            </button>
            <button
              onClick={() => confirmModalRef.current.close()}
              className="btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Dashboard;
