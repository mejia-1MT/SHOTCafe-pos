import React, { useEffect, useState, useRef } from 'react'
import Search from '../../assets/search-01-stroke-rounded.jsx'
import Filter from '../../assets/svg/filter-stroke-rounded.jsx'
import Arrow from '../../assets/svg/arrow-down-01-stroke-rounded'

// Table headers
const tableHeaders = [
  'Date and Time',
  'Products',
  'Staff',
  'Payment Method',
  'Total Price',
]

// Component
const TransactionList = () => {
  const [ordersSummaries, setOrdersSummaries] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const containerRef = useRef(null)
  const [hoveredProducts, setHoveredProducts] = useState([])
  const [hoveredPos, setHoveredPos] = useState({ x: 0, y: 0 })
  const [query, setQuery] = useState('')

  // Fetch data
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders') // Replace with your API route
        const data = await response.json()

        // Sort data by createdAt in descending order
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        setOrdersSummaries(data)
        setFilteredTransactions(data)
        setTotalPages(Math.ceil(data.length / itemsPerPage))
      } catch (error) {
        console.error('Error fetching transactions:', error)
      }
    }

    fetchTransactions()
  }, [])

  // Filter transactions whenever the query changes
  useEffect(() => {
    const filtered = ordersSummaries.filter((summary) => {
      const date = new Date(summary.createdAt)
      const dateString = date.toLocaleDateString() + ' ' + formatTime(date)
      const productNames = summary.orders
        .map((order) => order.productName)
        .join(', ')

      return (
        dateString.toLowerCase().includes(query.toLowerCase()) ||
        productNames.toLowerCase().includes(query.toLowerCase()) ||
        summary.username.toLowerCase().includes(query.toLowerCase()) ||
        summary.paymentMethod.toLowerCase().includes(query.toLowerCase())
      )
    })

    setFilteredTransactions(filtered)
    setTotalPages(Math.ceil(filtered.length / itemsPerPage))
    setCurrentPage(1) // Reset to first page after search
  }, [query, ordersSummaries])

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  const handleRowHover = (orders, event) => {
    setHoveredProducts(orders)
    setHoveredPos({ x: event.pageX, y: event.pageY })
  }

  const handleRowHoverEnd = () => {
    setHoveredProducts([])
  }

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  // Get current transactions
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Pagination functions
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="h-full w-full" ref={containerRef}>
      <div className="flex justify-between mx-5 py-5">
        <p className="text-xl font-semibold">All Transactions</p>
        <div className="flex">
          <div className="flex items-center w-[150px] relative custom-outline rounded-md outline-gray-400 overflow-hidden mr-3">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              className="w-full h-full px-5 py-2 bg-secondary-2 text-gray-700 focus:outline-none"
              placeholder="Search..."
            />
          </div>
          <div>
            <button className="custom-outline outline-gray-400 rounded-md flex items-center p-2">
              <Filter className="text-gray-500 w-4 h-4 mr-1" />
              <p className="text-gray-700 text-sm">Filter</p>
            </button>
          </div>
        </div>
      </div>
      <table className="min-w-full max-h-full">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header}
                className="px-4 py-2 bg-primary text-left text-sm text-customWhite"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentTransactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No transactions found.
              </td>
            </tr>
          ) : (
            currentTransactions.map((summary) => {
              const date = new Date(summary.createdAt)
              return (
                <tr
                  key={summary.id}
                  className="text-xs cursor-pointer hover:bg-gray-100"
                  onMouseEnter={(e) => handleRowHover(summary.orders, e)}
                  onMouseLeave={handleRowHoverEnd}
                >
                  <td className="w-[15%] pl-4">
                    <div>{date.toLocaleDateString()}</div>
                    <div>{formatTime(date)}</div>
                  </td>
                  <td className="flex-1">
                    {summary.orders
                      .map((order) => (
                        <span key={order.productName}>{order.productName}</span>
                      ))
                      .reduce((prev, curr) => [prev, ', ', curr])}
                  </td>
                  <td className="w-[15%]">{summary.username}</td>
                  <td className="w-[20%]">{summary.paymentMethod}</td>
                  <td className="w-[15%]">${summary.totalPrice}</td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>

      {/* Tooltip for product details */}
      {hoveredProducts.length > 0 && (
        <div
          style={{
            top: hoveredPos.y,
            left: hoveredPos.x,
            position: 'absolute',
            backgroundColor: 'white',
            border: '1px solid gray',
            padding: '10px',
            zIndex: 10,
          }}
          className="rounded shadow-lg text-xs"
        >
          {hoveredProducts.map((product, index) => (
            <div key={index}>
              <p>
                {product.productName}, {product.temperature}, {product.size},{' '}
                {product.moddedPrice}
              </p>
              {index < hoveredProducts.length - 1 && <hr />}
            </div>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex justify-end items-center pb-5 px-5 pt-1">
        <span className="text-xs mr-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-2 py-1 text-center rounded hover:bg-gray-200 disabled:bg-white"
        >
          <Arrow className="rotate-90 text-gray-800 w-[80%] aspect-square" />
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded hover:bg-gray-200 disabled:bg-white"
        >
          <Arrow className="-rotate-90 text-gray-800 w-[80%] aspect-square" />
        </button>
      </div>
    </div>
  )
}

export default TransactionList
