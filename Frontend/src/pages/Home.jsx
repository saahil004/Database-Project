import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Home = () => {
  const [stats, setStats] = useState({ restaurants: 0, dishes: 0, customers: 0, orders: 0 })

  useEffect(() => {
    const animateStats = () => {
      setStats({
        restaurants: 150,
        dishes: 1200,
        customers: 50000,
        orders: 250000
      })
    }
    const timer = setTimeout(animateStats, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500 via-amber-400 to-orange-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/30 rounded-full animate-blob animation-delay-3000" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/20 rounded-full animate-blob animation-delay-6000" />
        <div className="absolute top-40 left-1/2 w-72 h-72 bg-white/10 rounded-full animate-pulse-slow" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 drop-shadow-2xl">
            Welcome to <span className="block text-6xl md:text-8xl bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent animate-slide-up delay-200">FoodHub</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-500">
            Experience the ultimate fine dining adventure. Discover exquisite cuisines, premium ingredients, and unforgettable flavors delivered to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-800">
            <Link
              to="/menu"
              className="group bg-white text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
            >
              <span>Explore Menu</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 opacity-0 group-hover:opacity-20 transition-opacity" />
            </Link>
            <Link
              to="/customerlogin"
              className="border-2 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-500 hover:scale-105"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent" />
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Why Choose <span className="text-orange-600">FoodHub</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Premium quality, lightning-fast delivery, and exceptional taste in every bite.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="group p-8 rounded-3xl bg-white/70 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 border hover:border-orange-200 animate-float-in" data-reveal>
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
            <p className="text-gray-600">Delivered in under 30 minutes. Hot & fresh every time.</p>
          </div>
          <div className="group p-8 rounded-3xl bg-white/70 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 border hover:border-orange-200 animate-float-in delay-200" data-reveal>
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 6a6 6 0 11-12 0 6 6 0 0112 0zM10 4v2a2 2 0 002 2h4a2 2 0 002-2V4M7.5 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm8 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Quality</h3>
            <p className="text-gray-600">Fresh ingredients from top restaurants. Quality guaranteed.</p>
          </div>
          <div className="group p-8 rounded-3xl bg-white/70 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 border hover:border-orange-200 animate-float-in delay-400" data-reveal>
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Variety Galore</h3>
            <p className="text-gray-600">150+ restaurants, 1200+ dishes across all cuisines.</p>
          </div>
          <div className="group p-8 rounded-3xl bg-white/70 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 border hover:border-orange-200 animate-float-in delay-600" data-reveal>
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Trusted by 50k+</h3>
            <p className="text-gray-600">Join 50,000+ happy customers who love our service.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Satisfy Your Cravings?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Order now and experience food delivery like never before.
          </p>
          <Link
            to="/menu"
            className="inline-block bg-white text-orange-600 px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-500"
          >
            Start Ordering
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

