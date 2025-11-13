import { useState } from "react";
import useSecure from "../../hooks/useSecure";
import toast from "react-hot-toast";
import { MdEditSquare } from "react-icons/md";

const UpdateModal = ({ modalRef, item, updateUIData }) => {
  const axiosInstance = useSecure();
  const {
    _id,
    name,
    category,
    price,
    location,
    description,
    image,
    email,
    date,
  } = item;
  const [error, setError] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const pricestr = e.target.price.value.trim();
    const location = e.target.location.value.trim();
    const description = e.target.description.value.trim();
    const image = e.target.image.value.trim();
    const date = e.target.date.value;
    const newErrors = {};
    if (!/^[A-Za-z\s]{3,}$/.test(name))
      newErrors.name = "Please enter a valid name";
    if (!/^\d+(\.\d{1,2})?$/.test(pricestr))
      newErrors.price = "Price must be a valid number";
    if (!/^[A-Za-z0-9\s,.-]{3,}$/.test(location))
      newErrors.location = "Enter a valid location";
    if (description.length < 10)
      newErrors.description = "Description must be at least 10 characters";
    if (!/^https:\/\/([\w\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/i.test(image))
      newErrors.image = "Image URL must start with https://";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
      newErrors.date = "Please select a date";
    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const price = Number(pricestr);
      const updateData = {
        id: _id,
        name,
        category,
        price,
        location,
        description,
        image,
        email,
        date,
      };
      axiosInstance.patch("/pets-and-supplies", updateData).then((res) => {
        if (res.data.matchedCount) {
          updateUIData(updateData);
          e.target.reset();
          toast.success("Post Updated Successfully!");
          modalRef.current.close();
        }
      });
    }
  };
  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-base-100 border border-base-300 rounded-2xl shadow-2xl p-0 mx-auto w-[95%] max-w-2xl max-h-[95vh] overflow-y-auto">
        <div className="p-4 sm:p-6 border-b border-base-300 bg-linear-to-r from-primary/5 to-secondary/5 sticky top-0 bg-base-100 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="text-primary text-base sm:text-lg">
                  <MdEditSquare />
                </span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-base-content">
                  Update Post
                </h3>
                <p className="text-base-content/60 text-xs sm:text-sm">
                  Edit your details
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
          <div className="form-control flex flex-col">
            <label className="label py-1 sm:py-2">
              <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                Product / Pet Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product or pet name"
              className="input input-bordered w-full rounded-lg bg-base-200 focus:outline-none focus:bg-base-100 focus:border-secondary transition-colors text-sm sm:text-base"
              defaultValue={name}
            />
            {error.name && (
              <label className="label py-1">
                <span className="label-text-alt text-error text-xs sm:text-sm">
                  {error.name}
                </span>
              </label>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-3">
            <div className="form-control">
              <label className="label py-1 sm:py-2">
                <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                  Category
                </span>
              </label>
              <input
                type="text"
                name="category"
                className="input w-full input-bordered focus:border-secondary focus:outline-none rounded-lg bg-base-300 text-base-content/60 cursor-not-allowed text-sm sm:text-base"
                defaultValue={category}
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label py-1 sm:py-2">
                <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                  Price {category === "Pets" && "(Free for Adoption)"}
                </span>
              </label>
              <input
                type="text"
                name="price"
                placeholder="Enter price"
                className={`${
                  category === "Pets"
                    ? "input w-full input-bordered focus:border-secondary focus:outline-none rounded-lg bg-base-300 text-base-content/60 cursor-not-allowed text-sm sm:text-base"
                    : "input input-bordered w-full rounded-lg bg-base-200 focus:outline-none focus:bg-base-100 focus:border-secondary transition-colors text-sm sm:text-base"
                }`}
                defaultValue={category === "Pets" ? "0" : price}
                readOnly={category === "Pets"}
              />
              {error.price && (
                <label className="label py-1">
                  <span className="label-text-alt text-error text-xs sm:text-sm">
                    {error.price}
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-3">
            <div className="form-control">
              <label className="label py-1 sm:py-2">
                <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                  Your Email
                </span>
              </label>
              <input
                type="text"
                name="email"
                className="input w-full input-bordered focus:border-secondary focus:outline-none rounded-lg bg-base-300 text-base-content/60 cursor-not-allowed text-sm sm:text-base"
                defaultValue={email}
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label py-1 sm:py-2">
                <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                  Location
                </span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter location"
                className="input w-full rounded-lg input-bordered bg-base-200 focus:outline-none focus:bg-base-100 focus:border-secondary transition-colors text-sm sm:text-base"
                defaultValue={location}
              />
              {error.location && (
                <label className="label py-1">
                  <span className="label-text-alt text-error text-xs sm:text-sm">
                    {error.location}
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-3">
            <div className="form-control">
              <label className="label py-1 sm:py-2">
                <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                  Image URL
                </span>
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://example.com/pet.jpg"
                className="input input-bordered w-full rounded-lg bg-base-200 focus:outline-none focus:bg-base-100 focus:border-secondary transition-colors text-sm sm:text-base"
                defaultValue={image}
              />
              {error.image && (
                <label className="label py-1">
                  <span className="label-text-alt text-error text-xs sm:text-sm">
                    {error.image}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label py-1 sm:py-2">
                <span className="label-text font-semibold text-base-content text-sm sm:text-base">
                  Date
                </span>
              </label>
              <input
                type="date"
                name="date"
                style={{ outline: "none" }}
                className="input w-full rounded-lg input-bordered bg-base-200 focus:outline-none focus:bg-base-100 focus:border-secondary transition-colors text-sm sm:text-base"
                defaultValue={date}
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
                Description
              </span>
            </label>
            <textarea
              name="description"
              placeholder="Write a detailed description about the pet or product..."
              className="textarea w-full rounded-lg textarea-bordered h-24 sm:h-32 bg-base-200 focus:bg-base-100 focus:outline-none focus:border-secondary transition-colors resize-none text-sm sm:text-base"
              defaultValue={description}
            ></textarea>
            {error.description && (
              <label className="label py-1">
                <span className="label-text-alt text-error text-xs sm:text-sm">
                  {error.description}
                </span>
              </label>
            )}
          </div>
          <div className="form-control mt-6 sm:mt-8">
            <button
              type="submit"
              className="btn w-full btn-lg rounded-lg bg-linear-to-r from-primary to-secondary text-white border-none shadow-lg hover:shadow-xl transform transition-all text-sm sm:text-base"
            >
              <span className="text-base sm:text-lg">Update</span>
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateModal;
