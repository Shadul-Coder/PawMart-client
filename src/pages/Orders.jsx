import { useEffect, useState } from "react";
import useSecure from "../hooks/useSecure";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FiShoppingBag } from "react-icons/fi";
import { FaDownload } from "react-icons/fa6";

const Orders = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const axiosInstance = useSecure();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/orders/${user.email}`);
      setData(res.data);
    };
    fetchData();
  }, [user, axiosInstance]);
  if (!data) {
    return <Loading />;
  }
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setTextColor("#fc4422");
    doc.setFontSize(18);
    doc.text(`PawMart Orders`, 14, 15);
    doc.setFontSize(11);
    doc.setTextColor("#333");
    doc.text(`Name: ${user?.email}`, 14, 23);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 31);
    const tableColumn = [
      "Product Name",
      "Buyer Name",
      "Price",
      "Quantity",
      "Address",
      "Date",
      "Phone",
    ];
    const tableRows = data.map((order) => [
      order.productName,
      order.buyerName,
      order.price === "0" ? "Adopt" : `${order.price} TK`,
      order.quantity,
      order.address,
      order.date,
      order.phone,
    ]);
    autoTable(doc, {
      startY: 38,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [252, 68, 34] },
    });
    doc.save("PawMart_Orders.pdf");
  };
  return (
    <>
      <title>Orders | PawMart</title>
      <div className="max-w-7xl mx-auto w-[95%] pt-9 sm:pt-13 lg:w-[97%] mb-6 md:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl cursor-default md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#fc4422] to-[#ff9266] mb-3 md:mb-4">
              My Orders
            </h1>
            <p className="text-base cursor-default md:text-lg text-base-content/70">
              Manage and track all your PawMart orders in one place
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-md mx-auto lg:mx-0">
            <div className="bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow duration-300 rounded-xl md:rounded-2xl p-3 md:p-4 text-center">
              <div className="text-xl cursor-default md:text-2xl font-bold text-[#fc4422]">
                {data.length}
              </div>
              <div className="text-xs cursor-default md:text-sm text-base-content/70">
                Total Orders
              </div>
            </div>
            <div className="bg-base-100 rounded-xl md:rounded-2xl p-3 md:p-4 text-center shadow-sm border border-base-300 hover:shadow-md transition-shadow duration-300">
              <div className="text-xl cursor-default md:text-2xl font-bold text-[#fc4422]">
                {data.reduce((sum, order) => sum + order.quantity, 0)}
              </div>
              <div className="text-xs cursor-default md:text-sm text-base-content/70">
                Items
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1 bg-linear-to-r from-[#fc4422] to-[#ff9266] rounded-xl md:rounded-2xl p-3 md:p-4 text-center shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-xl cursor-default md:text-2xl font-bold text-white">
                {data.reduce(
                  (sum, order) => sum + order.price * order.quantity,
                  0
                )}{" "}
                TK
              </div>
              <div className="text-xs cursor-default md:text-sm text-white/90">
                Total Spent
              </div>
            </div>
          </div>
        </div>
      </div>
      {data.length > 0 && (
        <div className="max-w-7xl mx-auto w-[95%] lg:w-[97%] mb-6 md:mb-8">
          <div className="flex justify-end">
            <button
              onClick={handleDownloadPDF}
              className="relative flex items-center px-6 py-3 text-[13px] sm:text-sm md:text-base font-medium overflow-hidden transition-all rounded-lg rounded-tr-3xl rounded-bl-3xl group bg-linear-to-r from-[#fc4422] to-[#ff9266] cursor-pointer active:opacity-95"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 rounded-tr-full ease-in-out bg-linear-to-r from-[#ff9266] to-[#fc4422] rounded group-hover:-mr-4 group-hover:-mt-4"></span>
              <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 rounded-tr-3xl ease-in-out bg-linear-to-r from-[#ff9266] to-[#fc4422] rounded group-hover:-ml-4 group-hover:-mb-4"></span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-linear-to-r from-[#ff7043] via-[#ff8255] to-[#ff9266] rounded-md group-hover:translate-x-0"></span>
              <span className="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                <span className="flex items-center gap-1.5"><FaDownload /> Download PDF</span>
              </span>
            </button>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto pb-9 sm:pb-13 w-[95%] lg:w-[97%]">
        {data.length === 0 ? (
          <div className="text-center py-12 md:py-16 bg-base-100 rounded-2xl md:rounded-3xl shadow-sm border border-base-300">
            <div className="w-15 h-15 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-base-300 rounded-full flex items-center justify-center">
              <FiShoppingBag className="text-base-content/70 text-2xl md:text-3xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-base-content mb-2">
              No orders yet
            </h3>
            <p className="text-base-content/70 max-w-sm mx-auto text-sm md:text-base">
              Find your perfect pet or supplies now
            </p>
          </div>
        ) : (
          <div className="bg-base-100 rounded-lg md:rounded-2xl lg:rounded-3xl shadow-md border border-base-300 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base lg:text-base min-w-3xl">
                <thead className="bg-linear-to-r from-[#ff9266]/20 to-[#fc4422]/20 text-base-content border-b border-base-300">
                  <tr>
                    <th className="cursor-default py-3 px-4 sm:py-4 sm:px-5 lg:px-6 text-left font-bold text-xs md:text-sm lg:text-sm uppercase tracking-wider">
                      Product
                    </th>
                    <th className="cursor-default py-3 px-4 sm:py-4 sm:px-5 lg:px-6 text-left font-bold text-xs md:text-sm lg:text-sm uppercase tracking-wider">
                      Buyer
                    </th>
                    <th className="cursor-default py-3 px-4 sm:py-4 sm:px-5 lg:px-6 text-left font-bold text-xs md:text-sm lg:text-sm uppercase tracking-wider">
                      Price
                    </th>
                    <th className="cursor-default py-3 px-4 sm:py-4 sm:px-5 lg:px-6 text-left font-bold text-xs md:text-sm lg:text-sm uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="cursor-default py-3 px-4 sm:py-4 sm:px-5 lg:px-6 text-left font-bold text-xs md:text-sm lg:text-sm uppercase tracking-wider">
                      Address
                    </th>
                    <th className="cursor-default py-3 px-4 sm:py-4 sm:px-5 lg:px-6 text-left font-bold text-xs md:text-sm lg:text-sm uppercase tracking-wider">
                      Date
                    </th>
                    <th className="cursor-default py-3 px-4 sm:py-4 sm:px-5 lg:px-6 text-left font-bold text-xs md:text-sm lg:text-sm uppercase tracking-wider">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300">
                  {data.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-base-200 cursor-pointer transition-colors duration-200 group"
                    >
                      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
                        <div className="font-semibold text-base-content group-hover:text-[#fc4422] transition-colors duration-200 text-sm md:text-base">
                          {order.productName}
                        </div>
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
                        <div className="text-base-content whitespace-nowrap font-medium text-sm md:text-base">
                          {order.buyerName}
                        </div>
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
                        {order.price === "0" ? (
                          <span className="badge bg-orange-50 text-[#fc4422] border border-[#fc4422] font-semibold px-2 py-2 md:py-3 text-xs md:text-sm">
                            Adopt
                          </span>
                        ) : (
                          <span className="font-bold bg-linear-to-r from-[#fc4422] to-[#ff9266] bg-clip-text text-transparent text-sm md:text-base lg:text-lg">
                            {order.price} TK
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
                        <span className="font-semibold text-base-content group-hover:text-[#fc4422] transition-colors duration-200 text-sm md:text-base">
                          {order.quantity}
                        </span>
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6 max-w-[100px] md:max-w-[150px] lg:max-w-xs">
                        <div
                          className="text-base-content truncate hover:text-clip hover:whitespace-normal transition-all duration-200 text-sm md:text-base"
                          title={order.address}
                        >
                          {order.address}
                        </div>
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
                        <div className="text-base-content font-medium text-sm md:text-base">
                          {order.date}
                        </div>
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
                        <div className="text-base-content font-medium text-sm md:text-base">
                          {order.phone}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
