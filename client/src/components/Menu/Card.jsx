import React, { useState, useRef, useEffect } from 'react'
import IceIcon from '../../assets/snow-stroke-rounded'
import HotIcon from '../../assets/fire-stroke-rounded'
import PlusSign from '../../assets/svg/add-01-stroke-rounded'
import MinusSign from '../../assets/svg/minus-sign-stroke-rounded'

const Card = ({ image, title, price, addOrder }) => {
  const [size, setSize] = useState(null) // Initial size can be 'S', 'M', or 'L'
  const [temp, setTemp] = useState(null) // Initial temp can be 'Hot' or 'Cold'
  const [choicesVisible, setChoicesVisible] = useState(false)
  const [count, setCount] = useState(1)

  const toggleSelection = (setState, currentSelection, newSelection) => {
    if (currentSelection !== newSelection) {
      setState(newSelection)
    }
  }

  const cardRef = useRef(null)

  // Function to handle clicks outside the card
  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setChoicesVisible(false)
      setSize(null) // Unselect size
      setTemp(null) // Unselect temp
    }
  }

  const incrementCount = () => setCount((prevCount) => prevCount + 1)
  const decrementCount = () =>
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1))

  const handleAddToCart = () => {
    if (size && temp) {
      addOrder({ image, title, price, size, temp, count })
      setChoicesVisible(false) // Hide choices after adding to cart
      setSize(null) // Unselect size
      setTemp(null) // Unselect temp
      setCount(1) // Optionally reset count
    } else {
      alert('Please select size and temperature before adding to cart.')
    }
  }

  useEffect(() => {
    // Add event listener for clicks outside the card
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isAddToCartDisabled = !(size && temp)

  return (
    <div
      className="bg-secondary text-text rounded-lg min-w-[250px] overflow-hidden relative border border-customWhite hover:border-primary hover:bg-opaque transition-colors duration-300"
      ref={cardRef}
      onClick={() => setChoicesVisible(true)}
    >
      {/* Card Content */}
      <div className="flex h-[150px] w-full">
        <div className="w-[140px]   ">
          <img
            src={image}
            alt={title}
            className="h-[150px] w-auto object-cover object-center"
          />
        </div>

        <div className="flex-1 flex flex-col ml-2 mt-2">
          <p className="text-lg mb-2">{title}</p>
          <p className="">₱ {price}</p>
        </div>
      </div>

      {/* Add Icon */}
      <div className="absolute bottom-0 right-0 cursor-pointer m-2 mr-4">
        <p className="text-primary font-bold">...</p>
      </div>

      {/* Choices */}
      <div
        className={`absolute top-0 right-0 h-full bg-primary duration-300  text-tertiary ${
          choicesVisible ? 'w-[97%] bg-secondary' : 'w-[3%]'
        }`}
      >
        {choicesVisible && (
          <div className="p-2 h-full w-full flex flex-col justify-evenly">
            <div className="pb-1">
              <div className="flex">
                {['ice', 'hot'].map((tempOption) => (
                  <button
                    key={tempOption}
                    onClick={() => toggleSelection(setTemp, temp, tempOption)}
                    className={`card-buttons text-center ${
                      temp === tempOption
                        ? temp === 'ice'
                          ? 'bg-blue-500 border-blue-500 '
                          : 'bg-red-500 border-red-500 '
                        : `bg-opaque border-customGray`
                    }`}
                  >
                    {tempOption === 'ice' ? (
                      <IceIcon
                        className={`inline-block ${
                          temp === 'ice' ? 'text-customWhite' : 'text-blue-500'
                        }`}
                      />
                    ) : (
                      <HotIcon
                        className={`inline-block ${
                          temp === 'hot' ? 'text-customWhite' : 'text-red-500'
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex">
              {['S', 'M', 'L'].map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSelection(setSize, size, s)}
                  className={`${size === s ? 'border-primary text-customWhite bg-primary' : 'text-customGray border-customGray'} card-buttons`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-end">
              <div className="flex space-x-3 mr-3">
                <div
                  onClick={decrementCount}
                  className="border border-primary rounded-md cursor-pointer w-[25px] h-[25px] overflow-hidden flex items-center justify-center"
                >
                  <div className="relative w-[90%] h-[90%]">
                    <MinusSign className="absolute inset-0 w-full h-full object-cover text-primary" />
                  </div>
                </div>
                <p className="text-primary">{count}</p>
                <div
                  onClick={incrementCount}
                  className="border border-primary rounded-md cursor-pointer w-[25px] h-[25px] overflow-hidden flex items-center justify-center"
                >
                  <div className="relative w-[90%] h-[90%]">
                    <PlusSign className="absolute inset-0 w-full h-full object-cover text-primary" />
                  </div>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
                className={`rounded-md cursor-pointer px-2 py-2 ${
                  isAddToCartDisabled
                    ? 'bg-opaque text-primary'
                    : 'bg-primary text-secondary'
                }`}
              >
                to Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
