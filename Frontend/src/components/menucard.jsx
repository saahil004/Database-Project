
const MenuCard = ({ item, index, isAdded, onAdd }) => {
  const outOfStock = item.quantity === 0

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition duration-300"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      {/* IMAGE */}
      <div className="relative h-48 bg-gray-100 flex items-center justify-center">
        {item.image_url ? (
          <img
src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl">🍽️</span>
        )}

        {outOfStock && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      {/* BODY */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">
            {item.name}
          </h3>

          <span className="text-orange-600 font-bold">
            ${parseFloat(item.price).toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          {item.category_name}
        </p>

        <div>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium
              ${
                outOfStock
                  ? "bg-red-100 text-red-600"
                  : item.quantity < 5
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
          >
            {outOfStock
              ? "Out of stock"
              : item.quantity < 5
              ? `Only ${item.quantity} left`
              : "Available"}
          </span>
        </div>
        <button
          onClick={() => onAdd(item)}
          disabled={outOfStock}
          className={`w-full mt-3 py-2 rounded-lg text-sm font-semibold transition
            ${
              outOfStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : isAdded
                ? "bg-green-600 text-white"
                : "bg-orange-600 text-white hover:bg-orange-700"
            }`}
        >
          {isAdded
            ? "✓ Added to Cart"
            : outOfStock
            ? "Unavailable"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}

export default MenuCard