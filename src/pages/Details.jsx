import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useSecure from "../hooks/useSecure";
import Loading from "../components/Loading/Loading";

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

  if (!data) return <Loading />;

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
      productId: e.target.id.value,
      productName: e.target.productName.value,
      buyerName: e.target.name.value,
      email: e.target.email.value,
      quantity: Number(quantity),
      price: e.target.price.value,
      address: address,
      phone: phone,
      date: date,
      additionalNotes: e.target.additionalNotes.value,
    };

    axiosInstance.post("/orders", orderData).then((res) => {
      if (res.data.upsertedCount || res.data.modifiedCount) {
        modalRef.current.close();
        if (category === "Pets") {
          toast.success("Adoption Request Placed!");
        } else {
          toast.success("Order Placed Successfully!");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-100 py-4 md:py-8">
      <title>Details | PawMart</title>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Card */}
        <div className="bg-base-100 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl overflow-hidden border border-base-300/50">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-1/2 p-4 md:p-6 lg:p-8">
              <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg bg-base-200 aspect-square flex items-center justify-center relative group">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-2 bg-[#fc4422] text-white rounded-full text-sm font-semibold border border-[#fc4422] shadow-lg">
                    {category}
                  </span>
                  {price === 0 && (
                    <span className="px-3 py-2 bg-green-500 text-white rounded-full text-sm font-semibold border border-green-500 shadow-lg">
                      Free Adoption
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="lg:w-1/2 p-4 md:p-6 lg:p-8 flex flex-col justify-between">
              <div className="space-y-4 md:space-y-6">
                {/* Header */}
                <div className="mt-4 md:mt-0">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-base-content mb-3 md:mb-4 leading-tight">
                    {name}
                  </h1>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#fc4422] to-[#ff9266] rounded-full mb-4 md:mb-6"></div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex items-center gap-3 p-3 md:p-4 bg-base-200/50 rounded-xl border border-base-300/30 hover:border-[#ff9266]/30 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#fc4422] to-[#ff9266] rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white text-lg">📍</span>
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
                    <div className="w-10 h-10 bg-gradient-to-br from-[#fc4422] to-[#ff9266] rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white text-lg">👤</span>
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

                {/* Price Section */}
                <div className="p-4 md:p-6 bg-gradient-to-r from-[#fc4422]/10 to-[#ff9266]/10 rounded-xl md:rounded-2xl border border-[#fc4422]/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base-content/60 text-sm md:text-base font-medium">
                        Price
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-[#fc4422]">
                        {price === 0 ? "Free" : `$${price}`}
                      </p>
                    </div>
                    {price > 0 && (
                      <div className="text-right">
                        <p className="text-base-content/60 text-sm md:text-base font-medium">
                          Total
                        </p>
                        <p className="text-xl md:text-2xl font-bold text-base-content">
                          ${price}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
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

              {/* Action Button */}
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-base-300/30">
                <button
                  onClick={() => modalRef.current.showModal()}
                  className="w-full bg-gradient-to-r from-[#fc4422] to-[#ff9266] text-white py-3 md:py-4 px-6 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 group"
                >
                  {category === "Pets" ? (
                    <>
                      <span className="text-lg md:text-xl group-hover:scale-110 transition-transform">
                        🐾
                      </span>
                      Start Adoption Process
                    </>
                  ) : (
                    <>
                      <span className="text-lg md:text-xl group-hover:scale-110 transition-transform">
                        🛒
                      </span>
                      Proceed to Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 border border-base-300 rounded-2xl md:rounded-3xl shadow-2xl p-0 overflow-hidden max-w-2xl">
          {/* Modal Header */}
          <div className="p-4 md:p-6 border-b border-base-300/50 bg-gradient-to-r from-[#fc4422]/5 to-[#ff9266]/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-[#fc4422] rounded-full"></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-base-content">
                    {category === "Pets" ? "Adoption Request" : "Order Details"}
                  </h3>
                  <p className="text-base-content/60 text-sm md:text-base mt-1">
                    Complete your{" "}
                    {category === "Pets" ? "adoption request" : "order"}
                  </p>
                </div>
              </div>
              <form method="dialog">
                <button className="btn btn-ghost btn-circle hover:bg-base-300/50 transition-colors text-lg">
                  ✕
                </button>
              </form>
            </div>
          </div>

          {/* Modal Form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 md:p-6 space-y-4 md:space-y-6 max-h-[70vh] overflow-y-auto"
          >
            {/* Read-only Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Your Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered bg-base-200/50 border-base-300/50 rounded-xl"
                  defaultValue={user.displayName}
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered bg-base-200/50 border-base-300/50 rounded-xl"
                  defaultValue={user.email}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="hidden" name="id" defaultValue={_id} />
              <input type="hidden" name="productName" defaultValue={name} />
              <input type="hidden" name="price" defaultValue={price} />
            </div>

            {/* Quantity Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content">
                  {category === "Pets" ? "Quantity" : "Quantity"}
                </span>
              </label>
              <input
                type="number"
                name="quantity"
                className="input input-bordered border-base-300/50 rounded-xl"
                defaultValue={category === "Pets" ? 1 : ""}
                readOnly={category === "Pets"}
                min="1"
              />
              {error.quantity && (
                <label className="label">
                  <span className="label-text-alt text-error font-medium">
                    {error.quantity}
                  </span>
                </label>
              )}
            </div>

            {/* Address Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content">
                  Delivery Address
                </span>
              </label>
              <input
                type="text"
                name="address"
                className="input input-bordered border-base-300/50 rounded-xl"
                placeholder="Enter your complete address"
              />
              {error.address && (
                <label className="label">
                  <span className="label-text-alt text-error font-medium">
                    {error.address}
                  </span>
                </label>
              )}
            </div>

            {/* Date and Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Preferred Date
                  </span>
                </label>
                <input
                  type="date"
                  name="date"
                  className="input input-bordered border-base-300/50 rounded-xl"
                />
                {error.date && (
                  <label className="label">
                    <span className="label-text-alt text-error font-medium">
                      {error.date}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Phone Number
                  </span>
                </label>
                <input
                  type="text"
                  name="phone"
                  className="input input-bordered border-base-300/50 rounded-xl"
                  placeholder="+8801XXXXXXXXX"
                />
                {error.phone && (
                  <label className="label">
                    <span className="label-text-alt text-error font-medium">
                      {error.phone}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content">
                  Additional Notes
                </span>
              </label>
              <textarea
                name="additionalNotes"
                className="textarea textarea-bordered border-base-300/50 rounded-xl h-24 resize-none"
                placeholder="Any special requirements or notes..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="modal-action pt-2">
              <button
                type="submit"
                className="btn btn-lg w-full bg-gradient-to-r from-[#fc4422] to-[#ff9266] text-white border-none shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 rounded-xl font-semibold text-base md:text-lg"
              >
                <span className="flex items-center gap-2">
                  {category === "Pets" ? "🐾" : "🛒"}
                  {category === "Pets"
                    ? "Submit Adoption Request"
                    : "Place Order"}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Modal Backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Details;
