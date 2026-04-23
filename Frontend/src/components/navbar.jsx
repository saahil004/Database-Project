import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const auth = useAuth()
    const cart = useCart()
    const isAuthenticated = auth.isAuthenticated
    const logout = auth.logout
    const cartItems = cart.cartItems

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="bg-gradient-to-r from-gray-400 to-gray-900 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-3xl">🍽️</span>
                            <span className="text-white font-bold text-2xl hidden sm:inline">FoodHub</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            to="/menu"
                            className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition duration-300"
                        >
                            Menu
                        </Link>
                        <Link 
                            to="/cart" 
                            className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition duration-300"
                        >
                            Cart
                        </Link>
                        <Link 
                            to="/about" 
                            className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                        <a 
                            href="#help"
                            className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition duration-300"
                        >
                            Help
                        </a>
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search dishes..."
                                className="bg-amber-50 text-gray-800 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm w-48"
                            />
                        </div>
                        {isAuthenticated ? (
                            <>
                              <Link
                                to="/cart"
                                className="text-white px-3 py-2 rounded-md text-sm font-medium relative hover:bg-amber-700 transition duration-300"
                              >
                                Cart
                                {cartItems.length > 0 && (
                                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItems.length}
                                  </span>
                                )}
                              </Link>
                              <button
                                onClick={logout}
                                className="text-white px-4 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition duration-300"
                              >
                                Logout ({auth.user?.name || ''})
                              </button>
                            </>
                          ) : (
                            <Link
                              to="/customerlogin"
                              className="text-white px-4 py-2 rounded-md text-sm font-medium bg-orange-600 hover:bg-orange-700 transition duration-300"
                            >
                              Login
                            </Link>
                          )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-white inline-flex items-center justify-center p-2 rounded-md hover:bg-amber-700 transition duration-300"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-amber-800 border-t border-amber-700">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/menu"
                            className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-amber-700 transition duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Menu
                        </Link>
                        <Link
                            to="/cart"
                            className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-amber-700 transition duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Cart {cartItems.length > 0 && `(${cartItems.length})`}
                        </Link>

                        <Link
                            to="/about"
                            className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-amber-700 transition duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>

                        <a
                            href="#help"
                            className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-amber-700 transition duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Help
                        </a>
                        {isAuthenticated ? (
                            <button 
                                onClick={() => { logout(); setIsOpen(false); }}
                                className="w-full text-left text-white px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 transition duration-300 mt-2"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/customerlogin"
                                className="block w-full text-left text-white px-3 py-2 rounded-md text-base font-medium bg-orange-600 hover:bg-orange-700 transition duration-300 mt-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
