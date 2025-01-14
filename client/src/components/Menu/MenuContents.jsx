import React, { useState } from 'react'
import Card from './Card.jsx'
import CoffeeIcon from '../../assets/3d/icons8-soda-94.png'
import BlendedIcon from '../../assets/3d/icons8-coffee-94.png'
import Search from '../../assets/search-01-stroke-rounded.jsx'

function MenuContents({ products, addOrder }) {
  const categories = [
    { id: 1, name: 'All', Icon: null },
    { id: 2, name: 'Coffee', Icon: CoffeeIcon },
    { id: 3, name: 'Blended', Icon: BlendedIcon },
  ]

  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSearch = () => {
    console.log('Search query:', query)
  }

  const filteredProducts = (category) => {
    return products.filter((product) => {
      const matchesCategory =
        category === 'All' || product.category === category
      const matchesQuery = product.name
        .toLowerCase()
        .includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }

  const countItems = (category) => filteredProducts(category).length

  return (
    <div className="mb-16">
      <div className="flex items-center h-full mx-10 py-5">
        <div className="flex items-center xl:w-[200px] relative overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            className="w-full h-full px-5 py-3 bg-secondary-2 rounded-lg text-gray-700 focus:outline-none"
            placeholder="Search..."
          />
          <button onClick={handleSearch} className="absolute right-3">
            <Search className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="flex items-center mx-10 text-sm">
        {categories.map(({ id, name, Icon }) => (
          <div
            key={id}
            className={`group category-cards hover:border-primary cursor-pointer ${selectedCategory === name ? ' bg-opaque border-primary' : 'bg-tertiary'}`}
            onClick={() => setSelectedCategory(name)}
          >
            {Icon && (
              <div>
                <img
                  src={Icon}
                  alt={name}
                  className={`h-10 w-10 mb-1 group-hover:text-primary transition-colors duration-200 ${name === 'Coffee' ? '-rotate-45' : ''} ${selectedCategory === name ? 'text-primary' : 'text-customGray'}`}
                />
              </div>
            )}
            <p
              className={`font-semibold group-hover:text-primary transition-colors duration-200 ${name === 'All' ? 'text-sm' : 'text-xs'} ${selectedCategory === name ? 'text-primary' : 'text-customGray'}`}
            >
              {name}
            </p>
          </div>
        ))}
      </div>

      <div className="h-full">
        <div className="flex justify-between mx-10 my-5">
          <b className="text-xl">{selectedCategory} Menu</b>
          <p className="text-customGray">
            {countItems(selectedCategory)} of items
          </p>
        </div>
        {/* Grid for Selected Category Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mx-10">
          {filteredProducts(selectedCategory).map((product, index) => (
            <Card key={index} product={product} addOrder={addOrder} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MenuContents
