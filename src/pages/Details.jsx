import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useSecure from "../hooks/useSecure";
import Loading from "../components/Loading/Loading";
import { FaLocationDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { MdEditDocument, MdOutlinePets } from "react-icons/md";

const Details = () => {
  const { id } = useParams();
  const axiosInstance = useSecure();
  const [data, setData] = useState();
  const { user } = useAuth();
  const modalRef = useRef(null);
  const [error, setError] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/pets-and-supplies/${id}`);
      setData(res.data);
    };
    fetchData();
  }, [id, axiosInstance]);
  if (!data) {
    return <Loading />;
  }
  const { _id, name, category, price, location, image, email, description } =
    data;
  const handleSubmit = (e) => {
    e.preventDefault();
    const quantity = e.target.quantity.value;
    const address = e.target.address.value.trim();
    const date = e.target.date.value;
    const phone = e.target.phone.value.trim();
    const quantityRegex = /^[1-9]\d*$/;
    const addressRegex = /^[a-zA-Z0-9\s,.-]{5,}$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    const newError = {};
    if (!quantityRegex.test(quantity) && category !== "Pets") {
      newError.quantity = "Quantity must be a positive number";
    }
    if (!addressRegex.test(address)) {
      newError.address = "Enter a valid address";
    }
    if (!dateRegex.test(date)) {
      newError.date = "Please select a date";
    }
    if (!phoneRegex.test(phone)) {
      newError.phone = "Enter a valid phone number";
    }
    setError(newError);
    if (Object.keys(newError).length > 0) return;
    const orderData = {
      productId: _id,
      productName: name,
      buyerName: e.target.name.value,
      email: e.target.email.value,
      quantity: Number(quantity),
      price: price,
      address: address,
      phone: phone,
      date: date,
      additionalNotes: e.target.additionalNotes.value,
    };
    axiosInstance.post("/orders", orderData).then((res) => {
      if (res.data.upsertedCount || res.data.modifiedCount) {
        modalRef.current.close();
        e.target.reset();
        if (category === "Pets") {
          toast.success("Adoption Request Placed!");
        } else {
          toast.success("Order Placed Successfully!");
        }
      }
    });
  };
  return (
    <>
      <title>Details | PawMart</title>
      <section className="max-w-7xl mx-auto w-[95%] py-9 cursor-default sm:py-13 lg:w-[97%]">
        <div className="text-center mb-12">
          <h1 className="text-transparent bg-clip-text bg-linear-to-r from-[#fc4422] to-[#ff9266] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Know More, Care Better
          </h1>
          <p className="text-base-content/60 text-lg max-w-md mx-auto">
            Explore the details about this pet or product and connect with a
            caring community that values every pet and their wellbeing
          </p>
        </div>
        <div className="my-3 breadcrumbs text-sm sm:text-base md:text-lg">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Adopt & Shop</a>
            </li>
            <li>{name}</li>
          </ul>
        </div>
        <div className="bg-base-100 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl overflow-hidden border border-base-300/50">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-4 md:p-6 lg:p-8">
              <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg bg-base-200 aspect-square flex items-center justify-center relative group">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-2 bg-linear-to-r from-primary to-secondary text-white rounded-lg text-sm font-semibold shadow-lg">
                    {category}
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 p-4 md:p-6 lg:p-8 flex flex-col justify-between">
              <div className="space-y-4 md:space-y-6">
                <div className="mt-4 md:mt-0">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-base-content mb-3 md:mb-4 leading-tight">
                    {name}
                  </h1>
                  <div className="w-15 h-1 bg-linear-to-r from-primary to-secondary rounded-full mb-4 md:mb-6"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex items-center gap-3 p-3 md:p-4 bg-base-200/50 rounded-xl border border-base-300/30 hover:border-[#ff9266]/30 transition-colors">
                    <div className="w-10 h-10 bg-linear-to-br from-[#fc4422] to-[#ff9266] rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white text-lg">
                        <FaLocationDot />
                      </span>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-base-content/60 font-medium">
                        Location
                      </p>
                      <p className="font-semibold text-base-content text-sm md:text-base">
                        {location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 md:p-4 bg-base-200/50 rounded-xl border border-base-300/30 hover:border-[#ff9266]/30 transition-colors">
                    <div className="w-10 h-10 bg-linear-to-br from-[#fc4422] to-[#ff9266] rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white text-lg">
                        <FaUser />
                      </span>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-base-content/60 font-medium">
                        Owner
                      </p>
                      <p className="font-semibold text-base-content text-sm md:text-base truncate">
                        {email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:p-6 bg-linear-to-r from-[#fc4422]/10 to-[#ff9266]/10 rounded-xl md:rounded-2xl border border-[#fc4422]/20">
                  <div>
                    <p className="text-base-content/60 text-sm md:text-base font-medium">
                      Price
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-[#fc4422]">
                      {price === 0 ? "For Adoption" : `${price} TK`}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#fc4422] rounded-full"></div>
                    <h3 className="text-lg md:text-xl font-bold text-base-content">
                      Description
                    </h3>
                  </div>
                  <p className="text-base-content/80 leading-relaxed bg-base-200/30 p-4 rounded-xl border border-base-300/30 text-sm md:text-base">
                    {description}
                  </p>
                </div>
              </div>
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-base-300/30">
                <button
                  onClick={() => modalRef.current.showModal()}
                  className="w-full cursor-pointer bg-linear-to-r from-[#fc4422] to-[#ff9266] text-white py-3 rounded-xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.005] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3 group"
                >
                  {category === "Pets" ? (
                    <>
                      <span className="text-lg md:text-xl group-hover:scale-110 transition-transform">
                        <MdOutlinePets />
                      </span>
                      Adopt Now
                    </>
                  ) : (
                    <>
                      <span className="text-lg md:text-xl group-hover:scale-110 transition-transform">
                        <FiShoppingBag />
                      </span>
                      Order Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box bg-base-100 border border-base-300 rounded-2xl shadow-2xl p-0 mx-auto w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b border-base-300 bg-linear-to-r from-primary/5 to-secondary/5 sticky top-0 bg-base-100 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="text-primary text-base sm:text-lg">
                    <MdEditDocument />
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-base-content">
                    {category === "Pets" ? "Adoption Request" : "Order Details"}
                  </h3>
                  <p className="text-base-content/60 text-xs sm:text-sm">
                    Complete your{" "}
                    {category === "Pets" ? "adoption request" : "order"}
                  </p>
                </div>
              </div>
              <form method="dialog">
                <button className="btn btn-ghost btn-circle hover:bg-base-300 transition-colors text-sm sm:text-base">
                  <span className="text-lg">✕</span>
                </button>
              </form>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-6 p-4 sm:p-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-3">
              <div className="form-control">
                <label className="label py-1 sm:py-2">
                  <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                    Your Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="input w-full input-bordered focus:border-secondary focus:outline-none rounded-lg bg-base-300 text-base-content/60 cursor-not-allowed text-sm sm:text-base"
                  defaultValue={user.displayName}
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label py-1 sm:py-2">
                  <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                    Email
                  </span>
                </label>
                <input
                  type="text"
                  name="email"
                  className="input w-full input-bordered focus:border-secondary focus:outline-none rounded-lg bg-base-300 text-base-content/60 cursor-not-allowed text-sm sm:text-base"
                  defaultValue={user.email}
                  readOnly
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-3">
              <div className="form-control">
                <label className="label py-1 sm:py-2">
                  <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                    {category === "Pets" ? "Pet Name" : "Product Name"}
                  </span>
                </label>
                <input
                  type="text"
                  name="productName"
                  className="input w-full input-bordered focus:border-secondary focus:outline-none rounded-lg bg-base-300 text-base-content/60 cursor-not-allowed text-sm sm:text-base"
                  defaultValue={name}
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label py-1 sm:py-2">
                  <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                    {category === "Pets" ? "Pet ID" : "Product ID"}
                  </span>
                </label>
                <input
                  type="text"
                  name="productID"
                  className="input w-full input-bordered focus:border-secondary focus:outline-none rounded-lg bg-base-300 text-base-content/60 cursor-not-allowed text-sm sm:text-base"
                  defaultValue={_id}
                  readOnly
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-3">
              <div className="form-control">
                <label className="label py-1 sm:py-2">
                  <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                    Price
                  </span>
                </label>
                <input
                  type="text"
                  name="price"
                  className="input w-full input-bordered focus:border-secondary focus:outline-none rounded-lg bg-base-300 text-base-content/60 cursor-not-allowed text-sm sm:text-base"
                  defaultValue={price}
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label py-1 sm:py-2">
                  <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                    Phone Number
                  </span>
                </label>
                <input
                  type="text"
                  name="phone"
                  className="input input-bordered w-full rounded-lg bg-base-200 focus:outline-none focus:bg-base-100 focus:border-secondary transition-colors text-sm sm:text-base"
                  placeholder="+8801XXXXXXXXX"
                />
                {error.phone && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error text-xs sm:text-sm">
                      {error.phone}
                    </span>
                  </label>
                )}
              </div>
            </div>
            <div className="form-control">
              <label className="label py-1 sm:py-2">
                <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                  Delivery Address
                </span>
              </label>
              <input
                type="text"
                name="address"
                className="input input-bordered w-full rounded-lg bg-base-200 focus:outline-none focus:bg-base-100 focus:border-secondary transition-colors text-sm sm:text-base"
                placeholder="Enter your address"
              />
              {error.address && (
                <label className="label py-1">
                  <span className="label-text-alt text-error text-xs sm:text-sm">
                    {error.address}
                  </span>
                </label>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-3">
              <div className="form-control">
                <label className="label py-1 sm:py-2">
                  <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                    Quantity
                  </span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  className={
                    category === "Pets"
                      ? "input w-full input-bordered focus:border-secondary focus:outline-none rounded-lg bg-base-300 text-base-content/60 cursor-not-allowed text-sm sm:text-base"
                      : "input input-bordered w-full rounded-lg bg-base-200 focus:outline-none focus:bg-base-100 focus:border-secondary transition-colors text-sm sm:text-base"
                  }
                  defaultValue={category === "Pets" ? 1 : ""}
                  readOnly={category === "Pets"}
                />
                {error.quantity && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error text-xs sm:text-sm">
                      {error.quantity}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label py-1 sm:py-2">
                  <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                    Preferred Date
                  </span>
                </label>
                <input
                  type="date"
                  name="date"
                  className="input w-full rounded-lg input-bordered bg-base-200 focus:outline-none focus:bg-base-100 focus:border-secondary transition-colors text-sm sm:text-base"
                />
                {error.date && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error text-xs sm:text-sm">
                      {error.date}
                    </span>
                  </label>
                )}
              </div>
            </div>
            <div className="form-control">
              <label className="label py-1 sm:py-2">
                <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                  Additional Notes (Optional)
                </span>
              </label>
              <textarea
                name="additionalNotes"
                className="textarea w-full rounded-lg textarea-bordered h-24 sm:h-32 bg-base-200 focus:bg-base-100 focus:outline-none focus:border-secondary transition-colors resize-none text-sm sm:text-base"
                placeholder="Any special requirements or notes..."
              ></textarea>
            </div>
            <div className="form-control mt-6 sm:mt-8">
              <button
                type="submit"
                className="btn w-full btn-lg rounded-lg bg-linear-to-r from-primary to-secondary text-white border-none shadow-lg hover:shadow-xl transform transition-all text-sm sm:text-base"
              >
                <span className="flex items-center gap-2 text-base sm:text-lg">
                  {category === "Pets" ? <MdOutlinePets /> : <FiShoppingBag />}
                  {category === "Pets" ? "Submit Request" : "Place Order"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Details;
