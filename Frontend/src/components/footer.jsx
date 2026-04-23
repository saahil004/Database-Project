const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            🍽️ FoodHub
          </h3>
          <p className="text-gray-400 mb-4">
            Your favorite food delivery partner. Fast, fresh, and delicious.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition">
              📘
            </a>
            <a href="#" className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition">
              🐦
            </a>
            <a href="#" className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition">
              📷
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/menu" className="hover:text-white transition">Menu</a></li>
            <li><a href="/cart" className="hover:text-white transition">Cart</a></li>
            <li><a href="/customerlogin" className="hover:text-white transition">Login</a></li>
            <li><a href="/adminlogin" className="hover:text-white transition">Admin</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Customer Care</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Help</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
          <p className="text-gray-400 mb-2">📞 +1 234 567 8900</p>
          <p className="text-gray-400 mb-2">✉️ hello@foodhub.com</p>
          <p className="text-gray-400">📍 123 Food Street, City</p>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 FoodHub. All rights reserved. Made with ❤️</p>
      </div>
    </footer>
  )
}

export default Footer
