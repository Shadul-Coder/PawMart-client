import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";

const UpdateModal = ({ modalRef, item, updateUIData }) => {
  const axiosInstance = useAxios();
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
      newErrors.name = "Please enter a valid name.";
    if (!/^\d+(\.\d{1,2})?$/.test(pricestr))
      newErrors.price = "Price must be a valid number";
    if (!/^[A-Za-z0-9\s,.-]{3,}$/.test(location))
      newErrors.location = "Enter a valid location.";
    if (description.length < 10)
      newErrors.description =
        "Description must be at least 10 characters long.";
    if (!/^https:\/\/([\w\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/i.test(image))
      newErrors.image = "Image URL must start with https://";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
      newErrors.date = "Please select a date.";
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
          toast.success("Post Updated Successfully!");
          modalRef.current.close();
        }
      });
    }
  };

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-base-100 border border-base-300 rounded-3xl shadow-2xl p-0 overflow-hidden max-w-2xl">
        {/* Header */}
        <div className="p-6 border-b border-base-300 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="text-primary text-lg">✏️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-base-content">
                  Update Listing
                </h3>
                <p className="text-base-content/60 text-sm">
                  Edit your details
                </p>
              </div>
            </div>
            <form method="dialog">
              <button className="btn btn-ghost btn-circle hover:bg-base-300 transition-colors">
                <span className="text-xl">✕</span>
              </button>
            </form>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 max-h-[70vh] overflow-y-auto"
        >
          <div className="space-y-4">
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Item Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter item name"
                className="input input-bordered bg-base-200 focus:bg-base-100 focus:border-primary transition-colors"
                defaultValue={name}
              />
              {error.name && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {error.name}
                  </span>
                </label>
              )}
            </div>

            {/* Category and Price Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Category</span>
                </label>
                <input
                  type="text"
                  name="category"
                  className="input input-bordered bg-base-300 text-base-content/60"
                  disabled
                  defaultValue={category}
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Price {category === "Pets" && "(Read-only)"}
                  </span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  className="input input-bordered bg-base-200 focus:bg-base-100 focus:border-primary transition-colors"
                  defaultValue={price}
                  readOnly={category === "Pets"}
                />
                {error.price && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {error.price}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Location Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Location</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter location"
                className="input input-bordered bg-base-200 focus:bg-base-100 focus:border-primary transition-colors"
                defaultValue={location}
              />
              {error.location && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {error.location}
                  </span>
                </label>
              )}
            </div>

            {/* Description Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea
                name="description"
                placeholder="Enter detailed description..."
                className="textarea textarea-bordered h-32 bg-base-200 focus:bg-base-100 focus:border-primary transition-colors resize-none"
                defaultValue={description}
              ></textarea>
              {error.description && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {error.description}
                  </span>
                </label>
              )}
            </div>

            {/* Image URL Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Image URL</span>
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://example.com/image.jpg"
                className="input input-bordered bg-base-200 focus:bg-base-100 focus:border-primary transition-colors"
                defaultValue={image}
              />
              {error.image && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {error.image}
                  </span>
                </label>
              )}
            </div>

            {/* Date and Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  className="input input-bordered bg-base-200 focus:bg-base-100 focus:border-primary transition-colors"
                  defaultValue={date}
                />
                {error.date && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {error.date}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered bg-base-300 text-base-content/60"
                  defaultValue={email}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="modal-action mt-6">
            <button
              type="submit"
              className="btn btn-primary btn-lg w-full bg-gradient-to-r from-primary to-secondary text-white border-none shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
            >
              <span className="text-lg">💾 Update Listing</span>
            </button>
          </div>
        </form>
      </div>

      {/* Modal Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UpdateModal;
