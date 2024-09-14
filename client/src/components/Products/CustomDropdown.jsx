import React, { useState, useEffect, useRef } from 'react'
import ChevDown from '../../assets/svg/arrow-down-01-stroke-rounded'

const CustomDropdown = ({ setCategory, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(selectedCategory || '')
  const [isFocused, setIsFocused] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setSelectedOption(selectedCategory)
  }, [selectedCategory])

  const handleSelect = (option) => {
    setSelectedOption(option)
    setCategory(option)
    setIsOpen(false)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
      setIsFocused(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-left focus:outline-none flex justify-between items-center ${
          selectedOption || isFocused ? 'text-black' : 'text-gray-400'
        }`}
      >
        <span
          className={`absolute top-0 transition-all duration-300 transform ${
            selectedOption || isFocused
              ? 'text-primary text-xs -top-[0.5rem] bg-white px-1 left-3'
              : 'text-gray-500 text-base top-1/2 -translate-y-1/2'
          }`}
        >
          Category
        </span>
        <span
          className={`w-full text-left ${selectedOption ? 'text-black' : 'text-white'}`}
        >
          {selectedOption || '.'}
        </span>
        <span
          className={`ml-2 transition-transform duration-300 ease-in-out transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <ChevDown className="w-4 h-4" />
        </span>
      </button>

      <div
        className={`absolute left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden z-10 transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="overflow-hidden">
          <li
            onClick={() => handleSelect('Coffee')}
            className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
          >
            Coffee
          </li>
          <li
            onClick={() => handleSelect('Blended')}
            className="px-4 py-2 hover:bg-[#02342d] hover:text-white cursor-pointer"
          >
            Blended
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CustomDropdown
