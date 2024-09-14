import { useState } from 'react'
import MenuCards from '../components/Menu/MenuContents'
import TransactionList from '../components/Menu/TransactionList'

function Menu() {
  const [orders, setOrders] = useState([]) // Manage orders state

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
          {/* Pass addOrder function to MenuCards */}
          <MenuCards addOrder={addOrder} />
        </div>
      </div>
      <div className="w-[27%]">
        {/* Pass orders state and removeOrder function to TransactionList */}
        <TransactionList orders={orders} removeOrder={removeOrder} />
      </div>
    </div>
  )
}

export default Menu
