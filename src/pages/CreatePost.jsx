import useAuth from "../hooks/useAuth";
import { useState } from "react";
import useSecure from "../hooks/useSecure";
import toast from "react-hot-toast";
import { MdOutlineTipsAndUpdates, MdPostAdd } from "react-icons/md";

const CreatePost = () => {
  const { user } = useAuth();
  const axiosInstance = useSecure();
  const [error, setError] = useState({});
  const [priceValue, setPriceValue] = useState("");
  const [isPriceReadOnly, setIsPriceReadOnly] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const category = e.target.category.value;
    const pricestr = e.target.price.value.trim();
    const location = e.target.location.value.trim();
    const description = e.target.description.value.trim();
    const image = e.target.image.value.trim();
    const date = e.target.date.value;
    const email = e.target.email.value.trim();
    const newErrors = {};
    if (!/^[A-Za-z\s]{3,}$/.test(name))
      newErrors.name = "Please enter a valid name";
    if (category === "select") newErrors.category = "Please select a category";
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
      const postData = {
        name,
        category,
        price,
        location,
        description,
        image,
        email,
        date,
      };
      axiosInstance.post("/pets-and-supplies", postData).then((res) => {
        if (res.data.insertedId) {
          e.target.reset();
          if (category === "Pets") {
            toast.success("Adoption Post Added Successfully!");
          } else {
            toast.success("Product Listed Successfully!");
          }
        }
      });
    }
  };
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "Pets") {
      setPriceValue("0");
      setIsPriceReadOnly(true);
    } else {
      setPriceValue("");
      setIsPriceReadOnly(false);
    }
  };
  return (
    <>
      <title>Create Post | PawMart</title>
      <section className="max-w-3xl mx-auto w-[95%] py-9 sm:py-13 lg:w-[97%]">
        <div className="text-center mb-12 cursor-default">
          <h1 className="text-transparent bg-clip-text bg-linear-to-r from-[#fc4422] to-[#ff9266] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Share Your PawMart Post
          </h1>
          <p className="text-base-content/60 text-lg max-w-md mx-auto">
            Post your pet or product and connect with caring adopters and buyers
            today!
          </p>
        </div>
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text font-semibold text-base-content">
                  Product / Pet Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter product or pet name"
                className="input input-bordered w-full rounded-lg bg-base-200 focus:outline-none focus:bg-base-100 focus:border-secondary transition-colors"
              />
              {error.name && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {error.name}
                  </span>
                </label>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Category
                  </span>
                </label>
                <select
                  name="category"
                  style={{ outline: "none" }}
                  className="select w-full bg-base-100 rounded-lg focus:bg-base-100 transition-colors"
                  defaultValue={"select"}
                  onChange={handleCategoryChange}
                >
                  <option value="select" disabled>
                    Select Category
                  </option>
                  <option value="Pets">Pets</option>
                  <option value="Foods">Foods</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Care Products">Care Products</option>
                </select>
                {error.category && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {error.category}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Price {isPriceReadOnly && "(Free for Adoption)"}
                  </span>
                </label>
                <input
                  type="text"
                  name="price"
                  placeholder="Enter price"
                  className={`input input-bordered w-full rounded-lg transition-colors ${
                    isPriceReadOnly
                      ? "bg-base-300 text-base-content/60 focus:border-secondary focus:outline-none cursor-not-allowed"
                      : "bg-base-200 focus:outline-none focus:bg-base-100 focus:border-secondary"
                  }`}
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                  readOnly={isPriceReadOnly}
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Your Email
                  </span>
                </label>
                <input
                  type="text"
                  name="email"
                  className="input w-full input-bordered focus:border-secondary focus:outline-none rounded-lg bg-base-300 text-base-content/60 cursor-not-allowed"
                  defaultValue={user.email}
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Location
                  </span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  className="input w-full rounded-lg input-bordered bg-base-200 focus:outline-none focus:bg-base-100 focus:border-secondary transition-colors"
                />
                {error.location && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {error.location}
                    </span>
                  </label>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Image URL
                  </span>
                </label>
                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/pet.jpg"
                  className="input input-bordered w-full rounded-lg bg-base-200 focus:outline-none focus:bg-base-100 focus:border-secondary transition-colors"
                />
                {error.image && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {error.image}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Date
                  </span>
                </label>
                <input
                  type="date"
                  name="date"
                  style={{ outline: "none" }}
                  className="input w-full rounded-lg input-bordered bg-base-200 focus:outline-none focus:bg-base-100 focus:border-secondary transition-colors"
                />
                {error.date && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {error.date}
                    </span>
                  </label>
                )}
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content">
                  Description
                </span>
              </label>
              <textarea
                name="description"
                placeholder="Write a detailed description about the pet or product..."
                className="textarea w-full rounded-lg textarea-bordered h-32 bg-base-200 focus:bg-base-100 focus:outline-none focus:border-secondary transition-colors resize-none"
              ></textarea>
              {error.description && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {error.description}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control mt-8">
              <button
                type="submit"
                className="btn w-full btn-lg rounded-lg bg-linear-to-r from-primary to-secondary text-white border-none shadow-lg hover:shadow-xl transform transition-all"
              >
                <span className="text-lg">
                  <span className="flex items-center gap-1.5">
                    <MdPostAdd /> Post Now
                  </span>
                </span>
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8 bg-primary/5 cursor-default text-justify rounded-2xl p-6 border border-primary/20">
          <h3 className="font-semibold text-base-content mb-2 flex items-center gap-1.5">
            <MdOutlineTipsAndUpdates /> PawMart Tips
          </h3>
          <ul className="text-base-content/60 text-sm space-y-1">
            <li>• Pets are automatically listed as free for adoption</li>
            <li>• Use clear, high-quality images for better engagement</li>
            <li>• Provide detailed descriptions to attract more interest</li>
            <li>• Keep your contact information up to date</li>
            <li>
              • Choose the right category so buyers can find your post easily
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default CreatePost;
