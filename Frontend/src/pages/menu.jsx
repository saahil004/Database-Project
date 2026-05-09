import { useEffect, useState } from "react"
import axios from "axios"
import MenuCard from "../components/menucard"
import { useCart } from "../contexts/CartContext"

const Menu = () => {
  const [menu, setMenu] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActive] = useState("All")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [added, setAdded] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, catRes] = await Promise.all([
          axios.get("http://localhost:3000/api/v1/menu/getMenu"),
          axios.get("http://localhost:3000/api/v1/category/getCategories")
        ])

        setMenu(Array.isArray(menuRes.data?.data) ? menuRes.data.data : [])

        const cats = Array.isArray(catRes.data?.data)
          ? catRes.data.data.map(c => c.name)
          : []

        setCategories(["All", ...cats])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filtered =
    activeCategory === "All"
      ? menu
      : menu.filter(item => item.category_name === activeCategory)

  const { addItem } = useCart()
  const handleAdd = (item) => {
    addItem({
      menu_item_id: item.menu_item_id,
      name: item.name,
      price: parseFloat(item.price),
      quantity: 1
    })
    setAdded(prev => ({ ...prev, [item.name]: true }))
    setTimeout(() => {
      setAdded(prev => ({ ...prev, [item.name]: false }))
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      {/* HERO */}
      <header className="text-center mb-10 relative overflow-hidden bg-gradient-to-br from-orange-400/20 to-amber-500/20 backdrop-blur-sm rounded-3xl p-8">
        <p className="text-sm uppercase tracking-widest text-gray-400">
          Fine Dining Experience
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mt-2">
          Discover Our <span className="italic text-orange-600">Menu</span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mt-4 rounded-full" />
      </header>

      {/* FILTER BAR */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg transition-all duration-300 ${
              activeCategory === cat
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-800 border border-gray-200 hover:border-orange-400 hover:text-orange-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-center text-red-600 mb-6">{error}</p>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          {/* SECTION HEADER */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold text-gray-800">
              {activeCategory === "All" ? "All Items" : activeCategory}
            </span>

            <div className="flex-1 mx-4 h-px bg-gray-300" />

            <span className="text-sm text-gray-500">
              {filtered.length} items
            </span>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <MenuCard
                key={item.menu_item_id}
                item={item}
                index={i}
                isAdded={added[item.name]}
                onAdd={() => handleAdd(item)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Menu
