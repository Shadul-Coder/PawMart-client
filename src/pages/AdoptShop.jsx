import { useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading/Loading";
import ItemBox from "../components/ItemBox/ItemBox";
import { useLocation, useNavigate } from "react-router";

const AdoptShop = () => {
  const searchRef = useRef(null);
  const [data, setData] = useState(null);
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState(
    (location.search.includes("?filter=") && location.search.slice(8)) || ""
  );
  const [selectedFilter, setSelectedFilter] = useState("select");
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
  const handleFilter = (e) => {
    searchRef.current.value = "";
    const category = e.target.value;
    setSelectedFilter(category);
    navigate(`/adopt&shop?filter=${category}`);
    setFilter(category);
  };
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
      <div className="max-w-7xl w-[95%] mx-auto lg:w-[97%]">
        <div>
          <select
            onChange={handleFilter}
            name="Filter"
            id=""
            value={selectedFilter}
          >
            <option value="select" disabled>
              Select
            </option>
            <option value="pets">Pets</option>
            <option value="foods">Foods</option>
            <option value="accessories">Accessories</option>
            <option value="care-products">Care Products</option>
          </select>
          <form onSubmit={handleSearch}>
            <input ref={searchRef} type="search" name="Search" />
          </form>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {data.map((item) => (
            <ItemBox key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdoptShop;
