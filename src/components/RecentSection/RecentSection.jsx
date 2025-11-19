import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import ItemBox from "../ItemBox/ItemBox";
import Loading from "../Loading/Loading";
import { Link } from "react-router";

const RecentSection = () => {
  const [data, setData] = useState(null);
  const axiosInstance = useAxios();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get("/pets-and-supplies/latest");
      setData(res.data);
    };
    fetchData();
  }, [axiosInstance]);
  if (!data) {
    return <Loading />;
  }
  return (
    <section className="max-w-7xl mx-auto w-[95%] lg:w-[97%] cursor-default">
      <div className="space-y-1.5 mb-7 sm:space-y-3 md:mb-9 lg:mb-11">
        <h2 className="text-center text-xl font-bold sm:text-2xl lg:text-3xl">
          Latest <span className="text-[#fc4422]">Products</span>
        </h2>
        <p className="text-center md:w-[70%] md:mx-auto md:text-lg">
          Discover our newest arrivals for your beloved pets - fresh products
          added regularly
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {data.map((item) => (
          <ItemBox key={item._id} item={item} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          to={"/adopt&shop"}
          className="mt-5 btn md:p-5.5 xl:p-6 bg-linear-to-r from-primary to-secondary text-white cursor-pointer rounded-xl md:mt-7"
        >
          Explore More
        </Link>
      </div>
    </section>
  );
};

export default RecentSection;
