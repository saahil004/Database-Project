import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-orange-600 bg-clip-text text-transparent mb-6 animate-fade-in-up">
            About <span className="text-orange-600">FoodHub</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Revolutionizing food delivery with premium quality, lightning-fast service, and unforgettable flavors. Crafted with ❤️ by passionate developers.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-float-in" data-reveal>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                FoodHub was born from a simple idea: connect food lovers with the best restaurants using cutting-edge technology. 
                What started as a class project has grown into a platform loved by thousands, delivering joy one order at a time.
              </p>
              <div className="space-y-4 mb-12">
                <div className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all animate-slide-up">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                    <p className="text-gray-600">Under 30 minutes guaranteed</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all animate-slide-up delay-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">⭐</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Premium Quality</h3>
                    <p className="text-gray-600">Partnered with top restaurants</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative animate-float-in delay-400" data-reveal>
              <div className="w-full h-96 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl shadow-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl mb-4 block animate-bounce">🍽️</span>
                  <p className="text-white/90 font-semibold text-xl">Delivering Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Meet the <span className="text-orange-600">Creators</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up delay-200">
              Passionate developers bringing FoodHub to life
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-gradient-to-b from-orange-50 to-amber-50 border border-orange-100 hover:border-orange-300 shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 backdrop-blur-sm animate-float-in" data-reveal>
              <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">👨‍💻</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Saahil Ghulam Mohammad</h3>
              <p className="text-lg font-semibold text-orange-600 text-center mb-4">24K-0570</p>
              <p className="text-gray-600 text-center italic">"Building the future of food delivery"</p>
            </div>

            <div className="group p-8 rounded-3xl bg-gradient-to-b from-orange-50 to-amber-50 border border-orange-100 hover:border-orange-300 shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 backdrop-blur-sm animate-float-in delay-200" data-reveal>
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">👩‍💻</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Misbah Pirzada</h3>
              <p className="text-lg font-semibold text-purple-600 text-center mb-4">24K-0828</p>
              <p className="text-gray-600 text-center italic">"Crafting pixel-perfect experiences"</p>
            </div>

            <div className="group p-8 rounded-3xl bg-gradient-to-b from-orange-50 to-amber-50 border border-orange-100 hover:border-orange-300 shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 backdrop-blur-sm animate-float-in delay-400" data-reveal>
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">👩‍💻</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Sara Punjwani</h3>
              <p className="text-lg font-semibold text-emerald-600 text-center mb-4">24K-0856</p>
              <p className="text-gray-600 text-center italic">"Delivering code as good as our food"</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-gradient-to-r from-orange-600 via-amber-500 to-orange-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-pulse-slow">
            Hungry for More?
          </h2>
          <Link 
            to="/menu" 
            className="inline-block bg-white text-orange-600 px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-500 relative overflow-hidden"
          >
            <span>View Our Menu</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/50 to-amber-400/50 scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About

