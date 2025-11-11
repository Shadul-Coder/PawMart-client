import { useLoaderData } from "react-router";

const Details = () => {
  const data = useLoaderData();
  const { _id, name, category, price, location, image } = data.data;
  return (
    <div>
      <img src={image} alt="" />
    </div>
  );
};

export default Details;
