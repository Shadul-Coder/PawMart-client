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
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border p-1"
            defaultValue={name}
          />
          {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
          <input
            type="text"
            name="category"
            id=""
            className="border p-1"
            disabled
            defaultValue={category}
            readOnly
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="border p-1"
            defaultValue={price}
            readOnly={category === "Pets"}
          />
          {error.price && <p className="text-red-500 text-sm">{error.price}</p>}
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="border p-1"
            defaultValue={location}
          />
          {error.location && (
            <p className="text-red-500 text-sm">{error.location}</p>
          )}
          <textarea
            name="description"
            placeholder="Description"
            className="border p-1"
            defaultValue={description}
          ></textarea>
          {error.description && (
            <p className="text-red-500 text-sm">{error.description}</p>
          )}
          <input
            type="url"
            name="image"
            placeholder="Image URL"
            className="border p-1"
            defaultValue={image}
          />
          {error.image && <p className="text-red-500 text-sm">{error.image}</p>}
          <input
            type="date"
            name="date"
            className="border p-1"
            defaultValue={date}
          />
          {error.date && <p className="text-red-500 text-sm">{error.date}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-1"
            defaultValue={email}
            readOnly
          />
          <input type="submit" value="Update" className="btn mt-2" />
        </form>
      </div>
    </dialog>
  );
};

export default UpdateModal;
