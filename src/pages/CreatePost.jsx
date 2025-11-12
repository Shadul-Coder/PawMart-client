import useAuth from "../hooks/useAuth";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";

const CreatePost = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
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
      newErrors.name = "Please enter a valid name.";
    if (category === "select") newErrors.category = "Please select a category.";
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
      <form className="flex flex-col w-[500px]" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-1"
        />
        {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
        <select
          name="category"
          className="border p-1"
          defaultValue={"select"}
          onChange={handleCategoryChange}
        >
          <option value="select" disabled>
            Select
          </option>
          <option value="Pets">Pets</option>
          <option value="Foods">Foods</option>
          <option value="Accessories">Accessories</option>
          <option value="Care Products">Care Products</option>
        </select>
        {error.category && (
          <p className="text-red-500 text-sm">{error.category}</p>
        )}
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border p-1"
          value={priceValue}
          onChange={(e) => setPriceValue(e.target.value)}
          readOnly={isPriceReadOnly}
        />
        {error.price && <p className="text-red-500 text-sm">{error.price}</p>}
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border p-1"
        />
        {error.location && (
          <p className="text-red-500 text-sm">{error.location}</p>
        )}
        <textarea
          name="description"
          placeholder="Description"
          className="border p-1"
        ></textarea>
        {error.description && (
          <p className="text-red-500 text-sm">{error.description}</p>
        )}
        <input
          type="url"
          name="image"
          placeholder="Image URL"
          className="border p-1"
        />
        {error.image && <p className="text-red-500 text-sm">{error.image}</p>}
        <input type="date" name="date" className="border p-1" />
        {error.date && <p className="text-red-500 text-sm">{error.date}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-1"
          defaultValue={user.email}
          readOnly
        />
        <input type="submit" value="Post" className="btn mt-2" />
      </form>
    </>
  );
};

export default CreatePost;
