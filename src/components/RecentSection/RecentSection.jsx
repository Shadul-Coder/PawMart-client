import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading/Loading";
import ItemBox from "../ItemBox/ItemBox";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Typewriter } from "react-simple-typewriter";

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
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto w-[95%] lg:w-[97%]">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="text-[#fc4422]">
              <Typewriter
                words={["Latest Products"]}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:text-lg max-w-3xl mx-auto"
          >
            Discover our newest arrivals for your beloved pets - fresh products
            added regularly
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-20 h-1 bg-gradient-to-r from-[#fc4422] to-[#ff9266] mx-auto mt-4 rounded-full"
          ></motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-8">
          {data.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <ItemBox item={item} />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10 md:mt-12 lg:mt-16"
        >
          <Link
            to={"/adopt&shop"}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#fc4422] to-[#ff9266] text-white font-semibold rounded-xl text-base md:text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-[#ff9266] hover:to-[#fc4422] shadow-lg"
          >
            View All Products
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentSection;
