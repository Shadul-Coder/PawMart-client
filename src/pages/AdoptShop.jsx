import { useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading/Loading";
import ItemBox from "../components/ItemBox/ItemBox";
import { useLocation, useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";
import { LuSearchX } from "react-icons/lu";

const AdoptShop = () => {
  const searchRef = useRef(null);
  const [data, setData] = useState(null);
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState(
    (location.search.includes("?filter=") && location.search.slice(8)) || ""
  );
  const [selectedFilter, setSelectedFilter] = useState(filter);
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = filter
        ? `/pets-and-supplies?filter=${filter}`
        : "/pets-and-supplies";
      const res = await axiosInstance.get(endpoint);
      setData(res.data);
    };
    fetchData();
  }, [filter, axiosInstance]);
  if (!data) {
    return <Loading />;
  }
  const handleSearch = (e) => {
    e.preventDefault();
    setSelectedFilter("select");
    if (!e.target.Search.value) {
      navigate("/adopt&shop");
      return;
    }
    navigate(`/adopt&shop?search=${e.target.Search.value}`);
    axiosInstance
      .get(`/pets-and-supplies?search=${e.target.Search.value}`)
      .then((res) => setData(res.data));
  };
  return (
    <>
      <title>Adopt & Shop | PawMart</title>
      <section className="max-w-7xl mx-auto w-[95%] cursor-default pt-9 sm:pt-13 lg:w-[97%]">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#fc4422] to-[#ff9266]">
              Perfect Match
            </span>
          </h1>
          <p className="text-base-content/60 text-lg max-w-md mx-auto">
            Discover adorable pets and premium supplies in our carefully curated
            marketplace
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto w-[95%] cursor-default py-7 md:py-9 lg:py-10 lg:w-[97%]">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
          <div className="grid grid-cols-2 gap-1.5 sm:gap-3 md:grid-cols-4">
            {["pets", "foods", "accessories", "care-products"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setSelectedFilter(item);
                  navigate(`/adopt&shop?filter=${item}`);
                  setFilter(item);
                  if (searchRef.current) searchRef.current.value = "";
                }}
                className={`px-5 py-3 cursor-pointer rounded-2xl font-semibold transition-all duration-300 ${
                  selectedFilter === item
                    ? "bg-linear-to-r from-[#fc4422] to-[#ff9266] text-white shadow-lg"
                    : "bg-base-100 shadow text-base-content hover:bg-base-300"
                }`}
              >
                {item === "pets" && "Pets"}
                {item === "foods" && "Foods"}
                {item === "accessories" && "Accessories"}
                {item === "care-products" && "Care Products"}
              </button>
            ))}
          </div>
          <form
            onSubmit={handleSearch}
            className="w-full flex-1 md:max-w-md mx-auto lg:mx-0"
          >
            <div className="relative">
              <input
                ref={searchRef}
                type="search"
                name="Search"
                placeholder="Search pets & supplies"
                className="w-full bg-base-100 border-2 border-base-300 rounded-2xl py-3.5 px-6 text-base-content focus:outline-none focus:border-secondary outline-none transition-all duration-100 placeholder-base-content/50 font-medium"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-linear-to-r cursor-pointer from-[#fc4422] to-[#ff9266] text-white p-3 rounded-xl font-semibold hover:shadow-md hover:shadow-[#fc4422]/25 transition-all duration-200"
              >
                <FaSearch />
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="max-w-7xl mx-auto w-[95%] cursor-default pb-9 sm:pb-13 lg:w-[97%]">
        <h2 className="text-2xl font-semibold md:text-3xl mb-4 sm:mb-5 md:mb-6 lg:mb-7">
          Available Products ({data.length})
        </h2>
        {data.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-center py-12 md:py-16 rounded-2xl md:rounded-3xl">
              <div className="w-15 h-15 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-base-100 rounded-full flex items-center justify-center">
                <LuSearchX className="text-base-content/70 text-2xl md:text-3xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-base-content mb-2">
                No products found
              </h3>
              <p className="text-base-content/70 max-w-sm mx-auto text-sm md:text-base">
                Try adjusting your search criteria or browse different
                categories
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {data.map((item) => (
              <ItemBox key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default AdoptShop;
