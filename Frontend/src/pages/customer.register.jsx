import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CustomerRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        username: "",
        email: "",
        password: "",
        contact: ""
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")

        // Basic validation
        if (!formData.name.trim() || !formData.address.trim() || !formData.username.trim() || 
            !formData.email.trim() || !formData.password.trim() || !formData.contact.trim()) {
            setError("Please fill all fields.")
            return
        }

        setLoading(true)

        try {
            const response = await axios.post("http://localhost:3000/api/v1/customer/register", formData)

            if (response.data?.success) {
                console.log("Registration successful")
                navigate("/customerlogin")
            } else {
                setError(response.data?.message || "Registration failed. Please try again.")
            }
        } catch (err) {
            setError(err.response?.data?.message || "Unable to register. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Customer Register</h1>

                {error && (
                    <div className="mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 px-4 py-3">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                            placeholder="Enter your address"
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                            placeholder="Enter password"
                        />
                    </div>

                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                            Contact
                        </label>
                        <input
                            id="contact"
                            name="contact"
                            type="tel"
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                            placeholder="Enter contact number"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-orange-600 text-white py-2 text-sm font-semibold hover:bg-orange-700 transition duration-200 disabled:cursor-not-allowed disabled:bg-orange-300"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/customerlogin" className="text-orange-600 hover:text-orange-700 font-medium">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    )
}

export default CustomerRegister

