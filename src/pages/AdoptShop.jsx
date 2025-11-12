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
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#fc4422] rounded-full blur-xl"></div>
          <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-[#ff9266] rounded-full blur-lg"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-orange-300 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-orange-200 dark:border-gray-700">
              <span className="w-2 h-2 bg-[#fc4422] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Find your perfect companion
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#fc4422] via-[#ff6b3d] to-[#ff9266] bg-clip-text text-transparent">
                Adopt & Shop
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Discover loving pets and premium supplies in one place. Your furry friend's journey starts here.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        
        {/* Filter and Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 mb-12 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            
            {/* Filter Section */}
            <div className="w-full lg:w-auto">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Browse Categories
              </label>
              <div className="relative">
                <select
                  onChange={handleFilter}
                  name="Filter"
                  value={selectedFilter}
                  className="w-full lg:w-64 appearance-none bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl py-3.5 px-4 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#fc4422] focus:ring-4 focus:ring-[#fc4422]/10 transition-all duration-300 cursor-pointer hover:border-gray-300 dark:hover:border-gray-500 font-medium"
                >
                  <option value="select" disabled className="text-gray-400">
                    All Categories
                  </option>
                  <option value="pets" className="py-3">🐕 Adoptable Pets</option>
                  <option value="foods" className="py-3">🍖 Food & Treats</option>
                  <option value="accessories" className="py-3">🧸 Toys & Accessories</option>
                  <option value="care-products" className="py-3">💊 Health & Care</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Search Section */}
            <div className="w-full lg:flex-1 lg:max-w-xl">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Search Products
              </label>
              <form onSubmit={handleSearch} className="relative">
                <div className="relative flex items-center">
                  <input
                    ref={searchRef}
                    type="search"
                    name="Search"
                    placeholder="Search for pets, food, toys, accessories..."
                    className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl py-3.5 px-5 pr-14 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#fc4422] focus:ring-4 focus:ring-[#fc4422]/10 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-500 font-medium"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 bg-gradient-to-r from-[#fc4422] to-[#ff9266] text-white p-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#fc4422]/30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {data.length === 0 ? (
          <div className="text-center py-20 lg:py-28">
            <div className="max-w-md mx-auto">
              <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-red-100 dark:from-gray-700 dark:to-gray-600 rounded-3xl flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                No listings found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
                We couldn't find any items matching your search. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  navigate("/adopt&shop");
                  setSelectedFilter("select");
                  setFilter("");
                  if (searchRef.current) searchRef.current.value = "";
                }}
                className="bg-gradient-to-r from-[#fc4422] to-[#ff9266] text-white px-8 py-3.5 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                  Available {selectedFilter && selectedFilter !== "select" ? (
                    <span className="capitalize bg-gradient-to-r from-[#fc4422] to-[#ff9266] bg-clip-text text-transparent">
                      {selectedFilter}
                    </span>
                  ) : "Items"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Discover amazing pets and products
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl px-4 py-3 border border-orange-200 dark:border-gray-600">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <span className="text-2xl text-[#fc4422] font-bold">{data.length}</span> items found
                  </p>
                </div>
              </div>
            </div>

            {/* Items Grid - 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {data.map((item) => (
                <div 
                  key={item._id}
                  className="transform hover:-translate-y-3 transition-all duration-500"
                >
                  <ItemBox item={item} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdoptShop;