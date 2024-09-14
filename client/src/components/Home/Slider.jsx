import Coffee from '../../assets/svg/coffee-01-stroke-rounded'

function Slider({ items, startFromMiddle = false, bgColor, rotate, zIndex }) {
  const itemValues = Object.values(items)

  // If starting from the middle, rearrange the items array
  const displayedItems = startFromMiddle
    ? [
        ...itemValues.slice(Math.floor(itemValues.length / 2)),
        ...itemValues.slice(0, Math.floor(itemValues.length / 2)),
        ...itemValues.slice(Math.floor(itemValues.length / 2)),
        ...itemValues.slice(0, Math.floor(itemValues.length / 2)),
      ]
    : [...itemValues, ...itemValues]

  return (
    <div
      className={`slider-container h-[100px] -mx-5 absolute -bottom-5 ${bgColor} transform z-${zIndex} ${rotate} overflow-hidden`}
    >
      <div className="slider-content flex items-center">
        {displayedItems.map((item, index) => (
          <div className="slider-item flex items-center pr-[25px]" key={index}>
            <Coffee className="w-full h-[40px] text-[#b68104] pr-[25px]" />
            <p className="font-dela text-4xl text-[#6f4c00]">
              {item.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider
