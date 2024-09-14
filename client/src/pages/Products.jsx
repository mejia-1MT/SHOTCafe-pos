import React, { useState } from 'react'
import drinksData from '../components/Menu/drinksData'
import ProductsCard from '../components/Products/ProductsCard'
import ProductModal from '../components/Products/ProductModal'
import Search from '../assets/search-01-stroke-rounded.jsx'

function Products() {
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [actionType, setActionType] = useState('add') // Track whether adding or updating
  const [initialProduct, setInitialProduct] = useState({
    image: '',
    title: '',
    price: '',
    category: '',
  })

  const handleNewButtonClick = () => {
    setInitialProduct({ image: '', title: '', price: '', category: '' })
    setActionType('add')
    setIsModalOpen(true)
  }

  const handleAddProduct = (product) => {
    console.log('Product added/updated:', product)
    setInitialProduct({ image: '', title: '', price: '', category: '' })
    setIsModalOpen(false)
    // Add product to your drinksData or handle update logic here
  }

  const handleEditProduct = (product) => {
    setInitialProduct(product)
    setActionType('update')
    setIsModalOpen(true)
  }

  const handleDeleteProduct = (productName) => {
    // Handle delete logic here, like updating state or calling an API
    console.log('Product deleted with name:', productName)
  }

  const handleCancel = () => {
    setInitialProduct({ image: '', title: '', price: '', category: '' })
    setIsModalOpen(false)
    console.log('Modal closed and product reset')
  }

  return (
    <div className="h-screen flex-1 overflow-y-auto scrollbar-hide">
      <div className="mx-10 py-5 flex">
        <div className="rounded-lg py-3 px-5 mr-5 w-auto bg-[#02342d89]">
          <button
            onClick={handleNewButtonClick}
            className="text-customWhite font-semibold"
          >
            New +
          </button>
        </div>
        <div className="flex items-center xl:w-[200px] relative overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-full px-5 py-3 bg-secondary-2 rounded-lg  text-gray-700 focus:outline-none"
            placeholder="Search..."
          />
          <button
            onClick={() => console.log('Search query:', query)}
            className="absolute right-3"
          >
            <Search className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-10 mx-10 mb-5">
        {drinksData.map((drink, index) => (
          <ProductsCard
            key={index}
            image={drink.image}
            title={drink.title}
            price={drink.price}
            category={drink.category}
            onEdit={() => handleEditProduct(drink)}
            onDelete={() => handleDeleteProduct(drink.title)}
          />
        ))}
      </div>

      <ProductModal
        isVisible={isModalOpen}
        onClose={() => handleCancel()}
        initialProduct={initialProduct}
        onAddProduct={handleAddProduct}
        actionType={actionType} // Pass whether adding or updating
      />
    </div>
  )
}

export default Products
