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

    console.log("MENU RESPONSE:", menuRes.data)
    console.log("CATEGORY RESPONSE:", catRes.data)

    setMenu(Array.isArray(menuRes.data?.data) ? menuRes.data.data : [])

    const cats = Array.isArray(catRes.data?.data)
      ? catRes.data.data.map(c => c.name)
      : []

    setCategories(["All", ...cats])

  } catch (err) {
    console.log(err)
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

  const { addItem } = useCart();
  const handleAdd = (item) => {
    addItem({
      menu_item_id: item.menu_item_id,
      name: item.name,
      price: parseFloat(item.price),
      quantity: 1
    });
    setAdded(prev => ({ ...prev, [item.name]: true }))
    setTimeout(() => {
      setAdded(prev => ({ ...prev, [item.name]: false }))
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">

      {/* HERO */}
      <header className="text-center mb-10 relative overflow-hidden bg-gradient-to-br from-orange-400/20 to-amber-500/20 backdrop-blur-sm rounded-3xl p-8 animate-gradient-xy animate-pulse-slow">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-400/10 to-orange-600/10 animate-pulse-slow" />
        <p className="text-sm uppercase tracking-widest text-gray-400 relative z-10 animate-slide-up delay-200">
          Fine Dining Experience
        </p>
        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent relative z-10 animate-fade-in-up">
          Discover Our <span className="italic bg-gradient-to-r from-orange-600 via-amber-500 to-orange-700 bg-clip-text text-transparent drop-shadow-lg">Menu</span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mt-4 rounded-full animate-expand delay-500" />
      </header>

      {/* FILTER BAR */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:rotate-1 backdrop-blur-sm group relative overflow-hidden animate-float-in ${
              activeCategory === cat
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-orange-500/50 border-orange-600 ring-2 ring-orange-200/50"
                : "bg-white/80 text-gray-800 border-gray-200 hover:border-orange-400 hover:text-orange-600 hover:shadow-orange-200"
            }`}
          >
            <span className="relative z-10">{cat}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
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
            <div
              key={i}
              className="h-48 bg-gray-200 animate-pulse rounded-xl"
            />
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
                  className="animate-slide-up opacity-0 [&:nth-child(n)]:delay-[var(--delay)] animate-delay"
                />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Menu