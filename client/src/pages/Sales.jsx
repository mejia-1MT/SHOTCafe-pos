import React, { useEffect, useState } from 'react'
import SalesCard from '../components/Sales/SalesCard'
import ProfitBarChart from '../components/Sales/ProfitBarChart'
import dataset from '../components/Sales/orders.json'

import Total from '../assets/svg/money-bag-01-stroke-rounded'
import Transaction from '../assets/svg/credit-card-pos-stroke-rounded'
import Average from '../assets/svg/chart-average-stroke-rounded'
import BreakdownDoughnut from '../components/Sales/BreakdownDoughnut'

const calculateMonthlyValues = (data) => {
  const groupedData = {}

  data.forEach((order) => {
    const date = new Date(order.date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1 // getMonth() is zero-based, so add 1

    // Create a key for the year and month
    const key = `${year}-${month.toString().padStart(2, '0')}`

    // Initialize the group if it doesn't exist
    if (!groupedData[key]) {
      groupedData[key] = {
        totalSales: 0,
        totalTransactions: 0,
      }
    }

    // Update the group's data
    groupedData[key].totalSales += order.total_price
    groupedData[key].totalTransactions += 1
  })

  // Log the grouped data
  console.log(groupedData)
}

calculateMonthlyValues(dataset)

function Sales() {
  return (
    // <div className="h-screen flex-1 px-10 ">
    //   <div className="my-5 grid grid-cols-3 gap-5">
    //     <SalesCard
    //       title="Total Sales"
    //       value={`$${values.totalSales}`}
    //       percentage="N/A"
    //       lastMonth="N/A"
    //       Icon={Total}
    //       primaryColor="#00796b30"
    //       secondaryColor="#00796b"
    //       dataset={dataset}
    //     />
    //     <SalesCard
    //       title="Transactions"
    //       value={values.totalTransactions}
    //       percentage="N/A"
    //       lastMonth="N/A"
    //       Icon={Transaction}
    //       primaryColor="#64b5f630"
    //       secondaryColor="#64b5f6"
    //       dataset={dataset}
    //     />
    //     <SalesCard
    //       title="Sales/Customer"
    //       value={`$${values.averageSales}`}
    //       percentage="N/A"
    //       lastMonth="N/A"
    //       Icon={Average}
    //       primaryColor="#d8431530"
    //       secondaryColor="#d84315"
    //       dataset={dataset}
    //     />
    //   </div>
    //   {/* <div className="grid grid-cols-3 gap-5 mb-5  ">
    //     <div className="col-span-2 p-5 bg-white h-[300px] rounded-2xl ">
    //       <div className="flex justify-between pb-5">
    //         <p className="text-xl ">Report Sales</p>
    //         <div>chooser</div>
    //       </div>
    //       <ProfitBarChart />
    //     </div>
    //     <div className="bg-tertiary rounded-2xl ">
    //       <BreakdownDoughnut />
    //     </div>
    //   </div>
    //   <div className="bg-tertiary">
    //     <div>nlist</div>
    //   </div>

    //   <div className="p-5 grid grid-cols-4 gap-4">
    //     <div className="w-full h-24 bg-[#00897b80] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#4a4e6980] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#7d4c7a80] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#8a3a6080] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#d8431580] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#f57c0080] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#fbc02d80] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#7cb34280] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#64b5f680] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#4db6ac80] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#81c78480] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#ffb74d80] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#ba68c880] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#ff704380] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#c2185b80] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#ff8a6580] rounded-lg"></div>
    //     <div className="w-full h-24 bg-[#ffab9180] rounded-lg"></div>
    //   </div> */}
    // </div>
    <></>
  )
}

export default Sales
