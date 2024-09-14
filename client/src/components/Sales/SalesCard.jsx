import React from 'react'
import HighlightCharts from './HighlightCharts'

const SalesCard = ({
  title,
  value,
  percentage,
  Icon,
  primaryColor,
  secondaryColor,
  dataset,
}) => {
  return (
    <div className="p-5 bg-white  rounded-3xl min-h-[200px]">
      <div className="flex-1">
        <div className="flex items-center ">
          <div
            className={`rounded-full w-[60px] h-[60px] bg-[${primaryColor}] flex justify-center items-center`}
          >
            <Icon className={`w-[60%] h-[60%] text-[${secondaryColor}]`} />
          </div>
          <p className="ml-3 text-xl font-semibold">{title}</p>
        </div>
      </div>
      <div className=" flex items-center  h-[80%]">
        <div className="  flex-1 ml-5">
          <p className="text-3xl font-semibold">{value}</p>
          <p className="pr-3 text-sm">{percentage}</p>
        </div>
        <div className="h-[50%] w-[60%]">
          <HighlightCharts
            dataset={dataset}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        </div>
      </div>
    </div>
  )
}

export default SalesCard
