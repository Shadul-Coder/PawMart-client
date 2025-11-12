const DashboardItem = ({ item, handleUpdate, handleDelete }) => {
  const { _id, name, category, price, location, image } = item;
  return (
    <div className="flex gap-3 border rounded-2xl p-3 justify-between">
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={name}
          className="h-[70px] w-[70px] object-cover rounded-xl"
        />
        <h3 className="font-semibold">{name}</h3>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => handleUpdate(item)}
          className="btn"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(_id)}
          className="btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DashboardItem;
