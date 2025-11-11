import { Link } from "react-router";

const ItemBox = ({ item }) => {
  const { _id, name, category, price, location, image } = item;
  return (
    <div className="border p-5 rounded-2xl">
      <img src={image} alt="" />
      <h3>{name}</h3>
      <Link to={`/adopt&shop/${_id}`} className="btn">
        View
      </Link>
    </div>
  );
};

export default ItemBox;
