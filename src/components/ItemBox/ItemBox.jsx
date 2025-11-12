import { Link } from "react-router";

const ItemBox = ({ item }) => {
  const { _id, name, category, price, location, image } = item;

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "pets":
        return "🐕";
      case "foods":
        return "🍖";
      case "accessories":
        return "🧸";
      case "care-products":
        return "💊";
      default:
        return "📦";
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case "pets":
        return "from-blue-500 to-cyan-400";
      case "foods":
        return "from-amber-500 to-orange-400";
      case "accessories":
        return "from-purple-500 to-pink-400";
      case "care-products":
        return "from-green-500 to-emerald-400";
      default:
        return "from-gray-500 to-gray-400";
    }
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
      {/* Background Gradient Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(category)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <img
          src={image}
          alt={name}
          className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/20 shadow-lg">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span className="text-base">{getCategoryIcon(category)}</span>
              <span className="capitalize">{category.replace('-', ' ')}</span>
            </span>
          </div>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Title */}
        <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-[#fc4422] transition-colors duration-300">
          {name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <div className="w-8 h-8 bg-orange-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-sm">📍</span>
            </div>
            <span className="font-medium truncate">{location}</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col">
            <span
              className={`text-2xl font-bold ${
                price === 0 ? "text-green-600" : "text-[#fc4422]"
              }`}
            >
              {price === 0 ? "Free" : `$${price}`}
            </span>
            {price === 0 && (
              <span className="text-sm text-green-600 font-semibold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                🏠 For Adoption
              </span>
            )}
          </div>

          <Link
            to={`/adopt&shop/${_id}`}
            className="bg-gradient-to-r from-[#fc4422] to-[#ff9266] text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 active:scale-95 transition-all duration-300 group/btn flex items-center gap-2"
          >
            <span className="group-hover/btn:translate-x-0.5 transition-transform">
              View Details
            </span>
            <span className="text-lg group-hover/btn:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemBox;