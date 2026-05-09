import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../../contexts/AuthContext"

const DeliveryPortal = () => {
  const { user, logout } = useAuth()
  const [orders, setOrders] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.get("http://localhost:3000/api/v1/orders/getallorders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data?.success) {
        setOrders(response.data.data || [])
      }
    } catch (err) {
      console.log("Error fetching orders:", err)
      setError("Failed to load orders")
    } finally {
      setLoading(false)
    }
  }

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.get("http://localhost:3000/api/v1/orders/history", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data?.success) {
        setHistory(response.data.data || [])
      }
    } catch (err) {
      console.log("Error fetching history:", err)
    }
  }

  useEffect(() => {
    fetchOrders()
    fetchHistory()
  }, [])

  const completeOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('authToken')
      await axios.put(`http://localhost:3000/api/v1/orders/update/${orderId}`, {
        // Delivery guy marks as delivered
        status: 'delivered'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      fetchOrders()
      fetchHistory()
    } catch (err) {
      console.log("Error completing order:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Delivery Portal</h1>
            <p className="text-gray-500">Welcome, {user?.name || 'Delivery Guy'}</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pending Orders */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pending Orders ({orders.length})
              </h2>
              {orders.length === 0 ? (
                <p className="text-gray-500">No pending orders</p>
              ) : (
                <div className="space-y-3">
                  {orders.map(order => (
                    <div key={order.order_id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">Order #{order.order_id}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Customer: {order.customer_name}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Address: {order.delivery_address}
                      </p>
                      <p className="text-sm font-medium text-orange-600 mb-3">
                        Total: ${parseFloat(order.total_amount).toFixed(2)}
                      </p>
                      <button
                        onClick={() => completeOrder(order.order_id)}
                        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Complete Order
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed Orders History */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Completed Orders ({history.length})
              </h2>
{history.length === 0 ? (
                <p className="text-gray-500">No completed orders yet</p>
              ) : (
                <div className="space-y-3">
                  {history.map(item => (
                    <div key={item.order_id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">Order #{item.order_id}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                          Completed
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        Customer: {item.customer_name}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        Address: {item.delivery_address}
                      </p>
                      <p className="text-sm font-medium text-orange-600">
                        Total: ${parseFloat(item.total_amount).toFixed(2)}
                      </p>
                      {item.delivery_time && (
                        <p className="text-xs text-gray-500 mt-2">
                          Completed: {new Date(item.delivery_time).toLocaleString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DeliveryPortal
