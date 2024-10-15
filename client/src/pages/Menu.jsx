import { useState, useEffect } from 'react'
import axios from 'axios' // Import axios to use for API requests
import MenuCards from '../components/Menu/MenuContents'
import OrderList from '../components/Menu/OrderList'

function Menu() {
  const [orders, setOrders] = useState([]) // Manage orders state
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products') // Ensure this URL matches your API endpoint
        setProducts(response.data)
      } catch (error) {
        setError(error.message || 'Failed to fetch products')
      }
    }

    fetchProducts()
  }, [])
  // Function to add a new order
  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]) // Update orders state
  }
  // Function to remove an order by index
  const removeOrder = (indexToRemove) => {
    setOrders((prevOrders) =>
      prevOrders.filter((_, index) => index !== indexToRemove)
    )
  }

  return (
    <div className="h-screen flex-1 flex">
      <div className="flex-1">
        <div className="h-full overflow-y-auto scrollbar-hide">
          {/* Pass menuItems and addOrder function to MenuCards */}
          <MenuCards products={products} addOrder={addOrder} />
        </div>
      </div>
      <div className="w-[27%]">
        {/* Pass orders state and removeOrder function to TransactionList */}
        <OrderList orders={orders} removeOrder={removeOrder} />
      </div>
    </div>
  )
}

export default Menu
