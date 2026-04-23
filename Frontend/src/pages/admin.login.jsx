import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const AdminLogin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")

        if (!username.trim() || !password) {
            setError("Please enter both username and password.")
            return
        }

        setLoading(true)

        try {
            const response = await axios.post("http://localhost:3000/api/v1/auth/loginadmin", {
                username,
                password,
            })

            if (response.data?.success) {
                const auth = useAuth();
                auth.login({
                  token: response.data.token,
                  data: response.data.data
                });
                navigate("/admin")
            } else {
                setError(response.data?.message || "Login failed. Please try again.")
            }
        } catch (err) {
            setError(err.response?.data?.message || "Unable to log in. Please check your credentials.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI0jsxp4lD5eAmuDbw3EUED487B9MJ5GnpYA&s" alt="no" /> */}
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Admin Login</h1>

                {error && (
                    <div className="mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 px-4 py-3">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-orange-600 text-white py-2 text-sm font-semibold hover:bg-orange-700 transition duration-200 disabled:cursor-not-allowed disabled:bg-orange-300"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin