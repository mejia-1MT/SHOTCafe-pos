import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductsCard from '../components/Products/ProductsCard'
import ProductModal from '../components/Products/ProductModal'
import Search from '../assets/search-01-stroke-rounded.jsx'

function Products() {
  const [actionType, setActionType] = useState('')
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialProduct, setInitialProduct] = useState({
    image: '',
    name: '',
    price: '',
    category: '',
  })
  const [products, setProducts] = useState([]) // State for products
  const [error, setError] = useState(null) // State for error handling
  const [loading, setLoading] = useState(true) // State for loading

  // Fetch products from the API
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3000/products')
      setProducts(response.data)
    } catch (error) {
      setError(error.message || 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAddProduct = () => {
    setInitialProduct({ image: '', name: '', price: '', category: '' })
    setActionType('add')
    setIsModalOpen(true)
  }

  const addProduct = async (product) => {
    console.log('Product to be added: ', product)
    setInitialProduct({ image: '', name: '', price: '', category: '' })
    setIsModalOpen(false)

    try {
      const response = await axios.post(
        'http://localhost:3000/products/create',
        product
      )
      console.log('Respose: ', response)
      await fetchProducts()
    } catch (error) {
      console.error(
        'Error placing order:',
        error.response ? error.response.data : error.message
      )
    }
  }

  const handleEditProduct = (product) => {
    setInitialProduct(product)
    setActionType('update')
    setIsModalOpen(true)
  }

  const updateProduct = async (product) => {
    console.log('Product to be edited: ', product)
    setInitialProduct({ image: '', name: '', price: '', category: '' })
    setIsModalOpen(false)

    try {
      const response = await axios.put(
        `http://localhost:3000/products/update/${product.id}`,
        product
      )
      console.log('Response: ', response.data)
      await fetchProducts() // Optionally handle the response, e.g., update the UI
    } catch (error) {
      console.error(
        'Error updating product:',
        error.response ? error.response.data : error.message
      )
    }
  }

  const handleDeleteProduct = async (product) => {
    // Handle delete logic here, like updating state or calling an API
    console.log(`Deleted: \n Product: ${product.name} \n id: ${product.id}`)

    try {
      const response = await axios.delete(
        `http://localhost:3000/products/delete/${product.id}`
      )
      console.log('Response: ', response.data)
      await fetchProducts() // Optionally handle the response, e.g., update the UI
    } catch (error) {
      console.error(
        'Error deleting product:',
        error.response ? error.response.data : error.message
      )
    }
  }

  const handleCancel = () => {
    setInitialProduct({ image: '', name: '', price: '', category: '' })
    setIsModalOpen(false)
    console.log('Modal closed and product reset')
  }

  return (
    <div className="h-screen flex-1 overflow-y-auto scrollbar-hide px-10">
      <div className="py-5 flex">
        <div className="rounded-lg py-3 px-5 mr-5 w-auto bg-[#02342d89]">
          <button
            onClick={handleAddProduct}
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
            className="w-full h-full px-5 py-3 bg-secondary-2 rounded-lg text-gray-700 focus:outline-none"
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

      {/* Display loading and error messages */}
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display products */}
      <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-5 mb-5">
        {products
          .filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          )
          .map((product, index) => (
            <ProductsCard
              key={index}
              product={product}
              onEdit={() => handleEditProduct(product)}
              onDelete={() => handleDeleteProduct(product)}
            />
          ))}
      </div>

      <ProductModal
        isVisible={isModalOpen}
        onClose={() => handleCancel()}
        initialProduct={initialProduct}
        addProduct={addProduct} // Pass whether adding or updating
        updateProduct={updateProduct}
        actionType={actionType} // Pass whether adding or updating
      />
    </div>
  )
}

export default Products
