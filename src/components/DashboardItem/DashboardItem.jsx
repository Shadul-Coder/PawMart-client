import { FaLocationDot } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const DashboardItem = ({ item, handleUpdate, handleDelete, index }) => {
  const { _id, name, category, price, location, image } = item;

  return (
    <tr
      className={`hover:bg-linear-to-r from-[#ff9266]/3 to-[#fc4422]/3 transition-colors duration-150 ${
        index % 2 === 0 ? "bg-base-100" : "bg-base-200/50"
      }`}
    >
      <td className="py-3 px-3 sm:py-4 sm:px-4 md:px-6">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <img
            src={image}
            alt={name}
            className="h-15 w-15 sm:h-16 sm:w-16 md:h-17 md:w-17 lg:h-19 lg:w-19 object-cover rounded-lg sm:rounded-xl border border-base-300 shrink-0"
          />
          <span className="font-medium truncate max-w-[120px] sm:max-w-[150px] md:max-w-xs">
            {name}
          </span>
        </div>
      </td>
      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
        <span className="inline-flex overflow-x-hidden whitespace-nowrap items-center px-2 py-1 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium bg-[#ff9266]/10 text-[#fc4422] border border-base-100">
          {category}
        </span>
      </td>
      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
        {price === 0 ? (
          <span className="badge px-1.5 py-2 sm:px-2 sm:py-3 text-xs sm:text-sm font-medium bg-orange-50 text-[#fc4422] border border-[#fc4422]">
            Adopt
          </span>
        ) : (
          <span className="text-[#fc4422] font-semibold whitespace-nowrap sm:text-lg">
            {price} TK
          </span>
        )}
      </td>
      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
        <div className="flex items-center gap-1 text-base-content/70">
          <span className="text-sm sm:text-base">
            <FaLocationDot />
          </span>
          <span className="text-sm sm:text-base truncate max-w-20 sm:max-w-[100px] md:max-w-none">
            {location}
          </span>
        </div>
      </td>
      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleUpdate(item)}
            className="px-3 py-2 md:px-4 md:py-2 bg-[#ff9266]/10 text-[#fc4422] border border-[#fc4422] font-medium rounded-lg hover:opacity-90 cursor-pointer transition-all duration-200 text-sm"
          >
            <span className="flex items-center gap-1.5">
              <MdEditSquare /> Update
            </span>
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="px-3 py-2 md:px-4 md:py-2 bg-red-500 text-white font-medium rounded-lg transition-all hover:opacity-90 cursor-pointer duration-200 text-sm"
          >
            <span className="flex items-center gap-1.5">
              <FaTrashAlt /> Delete
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DashboardItem;
