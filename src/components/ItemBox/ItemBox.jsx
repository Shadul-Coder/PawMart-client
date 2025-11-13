import { Link } from "react-router";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import { motion } from "motion/react";

const ItemBox = ({ item }) => {
  const { _id, name, category, price, location, image } = item;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group cursor-pointer relative transition-all duration-500"
    >
      <div className="relative bg-base-100 shadow-md rounded-2xl rounded-bl-4xl overflow-hidden h-full">
        <div className="relative aspect-4/3 overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 bg-linear-to-b from-black/40 to-transparent p-3 sm:p-4">
            <div className="flex justify-between items-start">
              <div className="bg-base-100/90 backdrop-blur-md rounded-lg px-3 py-1.5 sm:px-4 sm:py-2">
                <span className="text-xs sm:text-sm font-bold text-base-content capitalize">
                  {category}
                </span>
              </div>
              <div className="rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 font-black text-white bg-linear-to-r from-[#fc4422] to-[#ff9266] text-xs sm:text-sm">
                {price === 0 ? "Adopt" : `${price} TK`}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-linear-to-t from-base-100 to-transparent"></div>
        </div>
        <div className="p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5">
          <h3 className="font-bold text-lg sm:text-xl text-base-content line-clamp-2 leading-tight min-h-12 sm:min-h-14 mb-2">
            {name}
          </h3>
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-base-200 rounded-xl flex items-center justify-center">
              <span className="text-base-content/70 text-sm sm:text-lg">
                <FaLocationDot />
              </span>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-base-content/60 font-medium">
                Location
              </p>
              <p className="font-semibold text-base-content text-sm sm:text-base">
                {location}
              </p>
            </div>
          </div>
          <div className="pt-2">
            <Link
              to={`/adopt&shop/${_id}`}
              className="group/btn relative flex items-center px-6 py-3 text-[13px] sm:text-sm md:text-base font-medium overflow-hidden transition-all rounded-lg rounded-tr-3xl rounded-bl-3xl bg-gradient-to-r from-[#fc4422] to-[#ff9266] cursor-pointer active:opacity-95"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 rounded-tr-full ease-in-out bg-gradient-to-r from-[#ff9266] to-[#fc4422] rounded group-hover/btn:-mr-4 group-hover/btn:-mt-4"></span>
              <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 rounded-tr-3xl ease-in-out bg-gradient-to-r from-[#ff9266] to-[#fc4422] rounded group-hover/btn:-ml-4 group-hover/btn:-mb-4"></span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-gradient-to-r from-[#ff7043] via-[#ff8255] to-[#ff9266] rounded-md group-hover/btn:translate-x-0"></span>
              <span className="relative w-full text-center text-white transition-colors duration-200 ease-in-out">
                <span className="flex justify-center items-center gap-1.5">
                  View Details{" "}
                  <BsFillSendFill className="text-white group-hover/btn:rotate-45 ease-linear duration-300" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemBox;
