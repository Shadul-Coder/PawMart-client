import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const ItemBox = ({ item }) => {
  const { _id, name, category, price, location, image } = item;
  return (
    <div className="relative rounded-3xl shadow-lg h-103 group hover:-translate-y-3 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-linear-to-br from-secondary via-yellow-500 to-primary rounded-3xl opacity-90 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
      <div className="absolute inset-2 bg-base-100 rounded-3xl backdrop-blur-sm overflow-hidden">
        <div className="relative h-65 rounded-2xl overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 px-2 py-1 bg-linear-to-r from-primary to-secondary text-white rounded-xl text-sm font-semibold shadow-lg">
            {category}
          </div>
        </div>
        <div className="p-5 bg-base-100">
          <div className="flex justify-between items-start gap-5 mb-4">
            <h3 className="text-xl font-bold leading-tight truncate">{name}</h3>
            <div className="bg-linear-to-r from-secondary to-primary text-transparent bg-clip-text">
              <span className="text-xl font-black whitespace-nowrap">
                {price === 0 ? "Adopt" : `${price} TK`}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-5">
            <div className="flex items-center gap-1.5 text-base-content/60 text-sm truncate">
              <FaLocationDot />
              {location}
            </div>
            <div className="bg-linear-to-r from-primary to-secondary rounded-full">
              <Link
                to={`/adopt&shop/${_id}`}
                className="relative w-12 h-12 flex items-center justify-center text-white rounded-full font-semibold -rotate-45 hover:rotate-0 overflow-hidden group/btn transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <FaArrowRight className="relative z-10 text-sm" />
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemBox;
