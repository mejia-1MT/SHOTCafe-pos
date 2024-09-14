import { useState } from 'react'
import Profile from '../Profile'

/*SVGs*/
import CashIcon from '../../assets/bitcoin-money-02-stroke-rounded'
import CardIcon from '../../assets/scratch-card-stroke-rounded'
import EIcon from '../../assets/qr-code-stroke-rounded'

function TransactionList({ orders, removeOrder }) {
  let totalPrice = 0 // Initialize totalPrice

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
                  const orderPrice = order.count * order.price // Calculate the order price for each item
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
                          src={order.image}
                          alt={order.title}
                          className="h-[90px] object-cover"
                        />
                      </div>

                      <div className="flex-1 flex items-center justify-between w-full mx-3 ">
                        <span>
                          <p className="font-bold">{order.title}</p>
                          <p>x {order.count}</p>
                        </span>
                        <div className="flex justify-between pb-2">
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
      <div className="bg-tertiary flex-1 flex flex-col justify-evenly rounded-lg">
        <div className="h-[50px] mx-5 mt-2 flex justify-between items-center">
          <p className="text-primary">Total:</p>
          <p className="text-primary font-bold">
            ₱ {totalPrice.toFixed(2)}
          </p>{' '}
          {/* Display total price */}
        </div>
        <p className="mx-5 my-2 text-sm text-primary font-semibold">
          Payment Method
        </p>
        <div className="flex justify-between mx-5 ">
          <div className="w-[80px] h-[60px] group hover:bg-primary border border-primary rounded-lg flex flex-col items-center justify-center">
            <CashIcon className="text-primary group-hover:text-white" />
            <p className="text-sm text-primary group-hover:text-tertiary">
              Cash
            </p>
          </div>
          <div className="w-[80px] h-[60px] group hover:bg-primary border border-primary rounded-lg flex flex-col items-center justify-center">
            <CardIcon className="text-primary group-hover:text-white" />
            <p className="text-sm text-primary group-hover:text-tertiary">
              Card
            </p>
          </div>
          <div className="w-[80px] h-[60px] group hover:bg-primary border border-primary rounded-lg flex flex-col items-center justify-center">
            <EIcon className="text-primary group-hover:text-white" />
            <p className="text-sm text-primary group-hover:text-tertiary">
              E-wallet
            </p>
          </div>
        </div>

        <div className="bg-primary-2 mx-5 my-5">
          <button
            className={`w-full py-3 rounded-lg text-sm border ${
              orders.length === 0
                ? 'border-primary text-primary'
                : 'border-tertiary text-tertiary bg-primary'
            }`}
            disabled={orders.length === 0}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionList
