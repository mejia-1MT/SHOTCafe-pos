import { useState, useEffect } from 'react'
import axios from 'axios'

function Breakdown() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBreakdown = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/orders/breakdown`
        ) // Ensure this URL matches your API endpoint
        setData(response.data)
      } catch (error) {
        setError(error.message || 'Failed to fetch orders')
      }
    }

    fetchBreakdown()
  }, [])

  // Calculate total count of products
  const totalCount = data?.productDetails
    ? data.productDetails.reduce((sum, product) => sum + product.count, 0)
    : 0

  // Calculate total count of users
  const totalUserCount = data?.userCounts
    ? data.userCounts.reduce((sum, user) => sum + user.count, 0)
    : 0

  // Calculate total count of payment methods
  const totalPaymentMethodCount = data?.paymentMethodCounts
    ? data.paymentMethodCounts.reduce((sum, method) => sum + method.count, 0)
    : 0

  // Group product details by category and sum the counts
  const categoryCounts = data?.productDetails?.reduce((acc, product) => {
    const { category, count } = product
    if (!acc[category]) {
      acc[category] = { count: 0 }
    }
    acc[category].count += count
    return acc
  }, {})

  const categoryArray = categoryCounts
    ? Object.entries(categoryCounts).map(([category, { count }]) => ({
        category,
        count,
      }))
    : []

  return (
    <div className="h-full w-full px-2 flex flex-col">
      <p className="bg-primary text-white  p-2 -mx-2 font-semibold text-lg">
        Products
      </p>
      <div className="flex-grow h-0 overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-hide">
          {data?.productDetails ? (
            data.productDetails.map((product, index) => {
              const percentage =
                totalCount > 0
                  ? ((product.count / totalCount) * 100).toFixed(2) // Calculate percentage
                  : 0

              return (
                <div key={index} className="w-full flex items-center py-1">
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <img
                      src={`http://localhost:3000/assets/${product.image}`}
                      className="h-full w-full object-cover"
                      alt={product.name}
                    />
                  </div>
                  <div className="flex-1 flex justify-between pl-1 min-w-0">
                    <span className="truncate">{product.name}</span>
                    <span>{Math.floor(percentage)}%</span>
                  </div>
                </div>
              )
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      <p className="bg-primary text-white p-2 -mx-2 font-semibold text-lg">
        Category
      </p>
      <div className="overflow-y-auto scrollbar-hide">
        {categoryArray.length > 0 ? (
          categoryArray.map((category, index) => {
            const percentage =
              totalCount > 0
                ? ((category.count / totalCount) * 100).toFixed(2)
                : 0

            return (
              <div key={index} className="flex justify-between py-1">
                <span>{category.category}</span>
                <span>{Math.floor(percentage)}%</span>
              </div>
            )
          })
        ) : (
          <p>No categories available</p>
        )}
      </div>

      <p className="bg-primary text-white p-2 -mx-2 font-semibold text-lg">
        User Counts
      </p>
      <div className="overflow-y-auto scrollbar-hide">
        {data?.userCounts && totalUserCount > 0 ? (
          data.userCounts.map((user, index) => {
            const percentage =
              totalUserCount > 0
                ? ((user.count / totalUserCount) * 100).toFixed(2)
                : 0

            return (
              <div key={index} className="flex justify-between py-1">
                <span>{user.username}</span>
                <span>{Math.floor(percentage)}%</span>
              </div>
            )
          })
        ) : (
          <p>No user counts available</p>
        )}
      </div>

      <p className="bg-primary text-white p-2 -mx-2 font-semibold text-lg">
        Payment Methods
      </p>
      <div className=" overflow-y-auto scrollbar-hide">
        {data?.paymentMethodCounts && totalPaymentMethodCount > 0 ? (
          data.paymentMethodCounts.map((method, index) => {
            const percentage =
              totalPaymentMethodCount > 0
                ? ((method.count / totalPaymentMethodCount) * 100).toFixed(2)
                : 0

            return (
              <div key={index} className="flex justify-between py-1">
                <span>{method.paymentMethod}</span>
                <span>{Math.floor(percentage)}%</span>
              </div>
            )
          })
        ) : (
          <p>No payment method counts available</p>
        )}
      </div>
    </div>
  )
}

export default Breakdown
