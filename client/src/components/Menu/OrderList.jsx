import { useState, useEffect } from 'react'
import axios from 'axios'
import Profile from '../Profile'

/*SVGs*/
import CashIcon from '../../assets/bitcoin-money-02-stroke-rounded'
import CardIcon from '../../assets/scratch-card-stroke-rounded'
import EIcon from '../../assets/qr-code-stroke-rounded'

function TransactionList({ orders, removeOrder }) {
  const [method, setMethod] = useState(null)

  const methodClicked = (selectedMethod) => {
    setMethod((prev) => (prev === selectedMethod ? null : selectedMethod))
  }

  let totalPrice = 0 // Initialize totalPrice

  // Size-based price adjustment
  const sizePrice = {
    S: 0,
    M: 20,
    L: 40,
  }
  // Function to handle "Place Order" button click
  const handlePlaceOrder = async () => {
    // Get the current timestamp
    const createdAt = new Date().toISOString()

    // Prepare the list of orders, with each order having size, temperature, and moddedPrice
    const expandedOrders = orders.reduce((acc, order) => {
      for (let i = 0; i < order.count; i++) {
        acc.push({
          size: order.size, // Store the size
          temperature: order.temp, // Assuming `temperature` is part of your order data
          moddedPrice: order.price + (sizePrice[order.size] || 0), // Add size adjustment to price
          productName: order.name,
        })
      }
      return acc
    }, [])

    // Calculate the total price
    const totalPrice = expandedOrders.reduce(
      (total, order) => total + order.moddedPrice,
      0
    )

    // Prepare the final order structure
    const orderSummary = {
      paymentMethod: method,
      user: localStorage.getItem('username'),
      totalPrice: totalPrice, // Total price formatted to 2 decimal places
      createdAt: createdAt, // Timestamp of the order
      orders: expandedOrders,
    }

    console.log('Order: ', orderSummary)

    try {
      const response = await axios.post(
        'http://localhost:3000/orders/create',
        orderSummary
      )
    } catch (error) {
      console.error(
        'Error placing order:',
        error.response ? error.response.data : error.message
      )
    }
  }

  return (
    <div className="h-full flex flex-col ">
      <Profile />

      <div className="h-[50%] overflow-y-auto">
        <div className="flex flex-col justify-between h-full ">
          <div className="flex-1 ">
            {orders.length === 0 ? (
              <p className="text-sm m-5">No orders yet.</p>
            ) : (
              <ul>
                {orders.map((order, index) => {
                  const sizeAdjustment = sizePrice[order.size] || 0
                  const orderPrice =
                    order.count * (order.price + sizeAdjustment)
                  totalPrice += orderPrice // Add each orderPrice to totalPrice

                  return (
                    <li
                      key={index}
                      className="mx-2 mb-2 overflow-hidden bg-tertiary flex rounded-md"
                    >
                      <div
                        className="relative w-[60px] h-[60px] overflow-hidden"
                        onClick={() => removeOrder(index)}
                      >
                        <img
                          src={`http://localhost:3000/assets/${order.image}`}
                          alt={order.name}
                          className="h-[90px] object-cover"
                        />
                      </div>

                      <div className="flex-1 flex items-center justify-between w-full mx-3 ">
                        <span className="truncate w-2/3">
                          <p className="font-bold">{order.name}</p>
                          <p className="">x {order.count}</p>
                        </span>
                        <div className="">
                          <p>₱ {orderPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="bg-tertiary flex-1 flex flex-col justify-evenly rounded-lg px-5">
        <div className="h-[50px] mt-2 flex justify-between items-center">
          <p className="text-primary">Total:</p>
          <p className="text-primary font-bold">
            ₱ {totalPrice.toFixed(2)}
          </p>{' '}
          {/* Display total price */}
        </div>
        <p className="text-sm text-primary font-semibold">Payment Method</p>
        <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(90px,_1fr))] gap-[2%]">
          {/* Cash Button */}
          <div
            onClick={() => methodClicked('Cash')}
            className={`py-2 flex flex-col items-center justify-center border rounded-lg cursor-pointer ${
              method === 'Cash'
                ? 'bg-primary text-tertiary border-primary'
                : 'border-primary group hover:bg-opaque'
            }`}
          >
            <CashIcon
              className={`${
                method === 'Cash'
                  ? 'text-tertiary'
                  : 'text-primary group-hover:text-primary'
              }`}
            />
            <p
              className={`text-sm ${
                method === 'Cash'
                  ? 'text-tertiary'
                  : 'text-primary group-hover:text-primary'
              }`}
            >
              Cash
            </p>
          </div>

          {/* Card Button */}
          <div
            onClick={() => methodClicked('Card')}
            className={`py-2 flex flex-col items-center justify-center border rounded-lg cursor-pointer ${
              method === 'Card'
                ? 'bg-primary text-tertiary border-primary'
                : 'border-primary group hover:bg-opaque'
            }`}
          >
            <CardIcon
              className={`${
                method === 'Card'
                  ? 'text-tertiary'
                  : 'text-primary group-hover:text-primary'
              }`}
            />
            <p
              className={`text-sm ${
                method === 'Card'
                  ? 'text-tertiary'
                  : 'text-primary group-hover:text-primary'
              }`}
            >
              Card
            </p>
          </div>

          {/* E-Wallet Button */}
          <div
            onClick={() => methodClicked('E-Wallet')}
            className={`aspect-sqaure flex flex-col items-center justify-center border rounded-lg cursor-pointer ${
              method === 'E-Wallet'
                ? 'bg-primary text-tertiary border-primary'
                : 'border-primary group hover:bg-opaque'
            }`}
          >
            <EIcon
              className={`${
                method === 'E-Wallet'
                  ? 'text-tertiary'
                  : 'text-primary group-hover:text-primary'
              }`}
            />
            <p
              className={`text-sm ${
                method === 'E-Wallet'
                  ? 'text-tertiary'
                  : 'text-primary group-hover:text-primary'
              }`}
            >
              E-Wallet
            </p>
          </div>
        </div>

        <div className="bg-primary-2 mb-1">
          <button
            onClick={handlePlaceOrder}
            className={`w-full py-4 rounded-lg text-sm border ${
              orders.length === 0 || method === null
                ? 'border-primary text-primary'
                : 'border-tertiary text-tertiary bg-primary'
            }`}
            disabled={orders.length === 0 || method === null}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionList
