import React, { useEffect, useState } from 'react'
import SalesCard from '../components/Sales/SalesCard'
import ProfitBarChart from '../components/Sales/ProfitBarChart'
import Breakdown from '../components/Sales/Breakdown'
import Total from '../assets/svg/money-bag-01-stroke-rounded'
import Transaction from '../assets/svg/credit-card-pos-stroke-rounded'
import Average from '../assets/svg/chart-average-stroke-rounded'
import TopProducts from '../components/Sales/TopProducts'
import TransactionList from '../components/Sales/TransactionList.jsx'

function Sales() {
  return (
    <div className="h-screen flex-1  flex ">
      <div className="flex flex-col flex-1 px-10 overflow-y-auto scrollbar-hide">
        <div
          className="my-5 grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]
        ] gap-5"
        >
          <SalesCard
            name="Total Sales"
            Icon={Total}
            bgColor="#00796b30"
            textColor="#00796b"
            method="sales"
          />
          <SalesCard
            name="Transactions"
            Icon={Transaction}
            bgColor="#64b5f630"
            textColor="#64b5f6"
            method="transaction"
          />
          <SalesCard
            name="Sales/Customer"
            Icon={Average}
            bgColor="#d8431530"
            textColor="#d84315"
            method="average"
          />
        </div>
        <div className="grid grid-cols-3 gap-5 mb-5  ">
          <div className="col-span-2 p-5 bg-white h-[300px] rounded-lg">
            <div className="flex justify-between pb-5">
              <p className="text-xl font-semibold">Report Sales</p>
              <div>chooser</div>
            </div>
            <ProfitBarChart />
          </div>
          <div className="bg-tertiary rounded-lg">
            <TopProducts />
          </div>
        </div>
        <div className="bg-tertiary rounded-lg flex-1 mb-5">
          <TransactionList />
        </div>
      </div>
      <div className="w-[20%] bg-white">
        <Breakdown />
      </div>
    </div>
  )
}

export default Sales
