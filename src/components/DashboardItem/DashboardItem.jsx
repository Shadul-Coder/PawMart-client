const DashboardItem = ({ item, handleUpdate, handleDelete, index }) => {
  const { _id, name, category, price, location, image } = item;

  return (
    <tr
      className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ${
        index % 2 === 0
          ? "bg-white dark:bg-gray-800"
          : "bg-gray-50 dark:bg-gray-900/50"
      }`}
    >
      <td className="py-4 px-6">
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={name}
            className="h-12 w-12 object-cover rounded-xl border border-gray-200 dark:border-gray-600 flex-shrink-0"
          />
          <span className="font-medium text-gray-900 dark:text-white truncate max-w-xs">
            {name}
          </span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
          {category}
        </span>
      </td>
      <td className="py-4 px-6">
        {price === 0 ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            Free
          </span>
        ) : (
          <span className="text-[#fc4422] font-semibold text-lg">${price}</span>
        )}
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <span>📍</span>
          <span>{location}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleUpdate(item)}
            className="px-4 py-2 bg-gradient-to-r from-[#ff9266] to-[#fc4422] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 text-sm"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all duration-200 text-sm"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DashboardItem;
