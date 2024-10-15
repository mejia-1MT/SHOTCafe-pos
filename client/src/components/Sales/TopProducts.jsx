import { useState, useEffect } from 'react'
import axios from 'axios'

function TopProducts() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBreakdown = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders/topweek`) // Ensure this URL matches your API endpoint
        setData(response.data)
      } catch (error) {
        setError(error.message || 'Failed to fetch orders')
      }
    }

    fetchBreakdown()
  }, [])

  return (
    <div className="w-full h-full">
      <p className="font-semibold text-xl p-5">Recent Favorites</p>
      <div className="mx-3">
        {data ? (
          data.map((product, index) => {
            return (
              <div
                key={index}
                className=" flex my-1.5  items-center bg-opaque rounded-lg overflow-hidden"
              >
                <div className="h-16 aspect-square ">
                  <img
                    src={`http://localhost:3000/assets/${product.productDetails.image}`}
                    className="w-full h-full object-cover rounded-lg "
                  />
                </div>
                <div className="text-lg font-semibold mx-2 truncate">
                  {product.productDetails.name}
                </div>
              </div>
            )
          })
        ) : (
          <p> Loading... </p>
        )}
      </div>
    </div>
  )
}

export default TopProducts
