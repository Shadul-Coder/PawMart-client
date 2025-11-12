import { useRef, useState } from "react";
import { useLoaderData } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";

const Details = () => {
  const data = useLoaderData();
  const { _id, name, category, price, location, image, email } = data.data;
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const modalRef = useRef(null);
  const [error, setError] = useState({});
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
    if (Object.keys(newError).length > 0) {
      return;
    }
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
    <div>
      <img src={image} alt="" />
      <button onClick={() => modalRef.current.showModal()} className="btn">
        {category === "Pets" ? "Adopt" : "Order Now"}
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <input
              type="text"
              name="name"
              className="border p-2 rounded-lg"
              defaultValue={user.displayName}
              readOnly
            />
            <input
              type="email"
              name="email"
              className="border p-2 rounded-lg"
              defaultValue={user.email}
              readOnly
            />
            <input
              type="text"
              name="id"
              className="border p-2 rounded-lg"
              defaultValue={_id}
              readOnly
            />
            <input
              type="text"
              name="productName"
              className="border p-2 rounded-lg"
              defaultValue={name}
              readOnly
            />
            <input
              type="number"
              name="quantity"
              className="border p-2 rounded-lg"
              defaultValue={category === "Pets" ? 1 : ""}
              readOnly={category === "Pets"}
            />
            {error.quantity && (
              <span className="text-red-500 text-sm">{error.quantity}</span>
            )}
            <input
              type="number"
              name="price"
              className="border p-2 rounded-lg"
              defaultValue={price}
              readOnly
            />
            <input
              type="text"
              name="address"
              className="border p-2 rounded-lg"
              placeholder="Address"
            />
            {error.address && (
              <span className="text-red-500 text-sm">{error.address}</span>
            )}
            <input type="date" name="date" className="border p-2 rounded-lg" />
            {error.date && (
              <span className="text-red-500 text-sm">{error.date}</span>
            )}
            <input
              type="number"
              name="phone"
              className="border p-2 rounded-lg"
              placeholder="Phone"
            />
            {error.phone && (
              <span className="text-red-500 text-sm">{error.phone}</span>
            )}
            <textarea
              name="additionalNotes"
              className="border p-2 rounded-lg"
              placeholder="Additional Notes"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Details;
