import { useState, useEffect } from 'react'
import axios from 'axios'
import HighlightCharts from './HighlightCharts'

const SalesCard = ({
  name,
  Icon,
  bgColor,
  textColor,
  method,
  // dataset,
}) => {
  // contents: product, totalSales, totalSalesBefore
  const [contents, setContents] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/sales/total?method=${method}`
        ) // Ensure this URL matches your API endpoint
        setContents(response.data)
      } catch (error) {
        setError(error.message || 'Failed to fetch sales')
      }
    }

    fetchSales()
  }, [])

  const value = contents.total
  const prevValue = contents.totalBefore
  const percentage = Math.floor(((value - prevValue) / prevValue) * 100)

  const reducedData = Array.isArray(contents.monthlyRecord)
    ? contents.monthlyRecord.reduce((acc, record) => {
        const dateKey = new Date(record.createdAt).toISOString().split('T')[0]

        // Accumulate either sales total or transaction count based on method
        const amount =
          method === 'transaction'
            ? record._count.id || 0
            : record._sum.totalPrice || 0
        acc[dateKey] = (acc[dateKey] || 0) + amount

        return acc
      }, {})
    : {}

  const labels = Object.keys(reducedData)
  const dataset = Object.values(reducedData)

  return (
    <div className="p-2 px-3 bg-white  rounded-lg">
      <div className="">
        <div className="flex items-center ">
          <div
            className={`rounded-full w-[40px] h-[40px]  flex justify-center items-center`}
            style={{ backgroundColor: bgColor }}
          >
            <Icon className={`w-[50%] h-[50%] `} style={{ color: textColor }} />
          </div>
          <p className="ml-3 text-xl font-semibold">{name}</p>
        </div>
      </div>
      <div className=" flex items-center flex-1 my-1">
        <div className="  flex-1">
          <p className="text-4xl font-semibold">
            {method === 'total' ? `₱ ${value}` : `${Math.floor(value)}`}
          </p>
          <div className={`flex items-center pr-3 mt-1`}>
            <div
              className={` text-xs p-1 mr-1 rounded-xl font-semibold ${percentage > 0 ? 'text-green-500 bg-green-200' : 'text-red-500 bg-red-200'}`}
            >
              {percentage > 0 ? `+${percentage}%` : `-${percentage}%`}
            </div>
            <p className="font-quicksand text-xs"> than last month</p>
          </div>
        </div>
        <div className="w-[50%] aspect-video">
          <HighlightCharts
            primaryColor={bgColor}
            secondaryColor={textColor}
            labels={labels}
            dataset={dataset}
          />
        </div>
      </div>
    </div>
  )
}

export default SalesCard
