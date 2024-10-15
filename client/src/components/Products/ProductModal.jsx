import React, { useState, useEffect } from 'react'
import CustomDropdown from './CustomDropdown'
import Modal from './Modal'
// import ConfirmationModal from './ConfirmationModal'

const ProductModal = ({
  isVisible,
  onClose,
  initialProduct,
  addProduct,
  updateProduct,
  actionType,
}) => {
  const [newProduct, setNewProduct] = useState(initialProduct)
  const [focus, setFocus] = useState({ name: false, price: false })

  const formattedImageUrl = newProduct.image.startsWith('data:')
    ? newProduct.image
    : newProduct.image.startsWith('http')
      ? newProduct.image
      : `http://localhost:3000/assets/${newProduct.image}`

  useEffect(() => {
    if (isVisible) {
      setNewProduct(initialProduct)
    }
  }, [initialProduct, isVisible])

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image' && files.length > 0) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          image: event.target.result,
        }))
      }
      reader.readAsDataURL(files[0])
    } else {
      const updatedValue =
        name === 'price' ? value.replace(/[^0-9.]/g, '') : value
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: updatedValue,
      }))
    }
  }

  const handleFocus = (field) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: true }))
  }

  const handleBlur = (field) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: false }))
  }

  const handleCategoryChange = (category) => {
    setNewProduct((prevProduct) => ({ ...prevProduct, category }))
  }

  const confirm = () => {
    if (actionType === 'add') {
      addProduct(newProduct)
    } else if (actionType === 'update') {
      updateProduct(newProduct)
    }
  }

  // const handleConfirmAction = async () => {
  //   try {
  //     if (actionType === 'add') {
  //       await onAddProduct(newProduct)
  //     } else {
  //       console.log('Product updated:', newProduct)
  //     }
  //   } catch (error) {
  //     console.error('Error:', error)
  //   } finally {
  //     setIsConfirmationVisible(false)
  //     onClose()
  //   }
  // }

  return (
    <>
      <Modal isVisible={isVisible} onClose={onClose}>
        <div className="m-5">
          <div className="flex space-x-4">
            <div>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                name="image"
                onChange={handleInputChange}
                className="hidden"
              />
              <label
                htmlFor="fileInput"
                className="relative flex items-center h-[150px] w-[120px] rounded-lg cursor-pointer border border-gray-300 overflow-hidden"
              >
                {newProduct.image ? (
                  <img
                    src={formattedImageUrl}
                    alt="Selected"
                    className="object-cover h-full"
                  />
                ) : (
                  <div className="flex justify-center w-full">
                    <p className="text-sm w-[60%] text-customGray text-center">
                      Select a photo
                    </p>
                  </div>
                )}
              </label>
            </div>

            <div className="relative">
              <div className="relative mb-3">
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  placeholder=" "
                  className="peer block w-full p-2 pl-3 border border-gray-300 rounded-lg focus:outline-none"
                />
                <label
                  htmlFor="name"
                  className={`absolute transform transition-all duration-300 ${
                    newProduct.name || focus.name
                      ? 'text-primary text-xs -top-2 bg-white px-1 left-3'
                      : 'text-gray-500 text-base top-1/2 -translate-y-1/2 left-3'
                  }`}
                >
                  Name
                </label>
              </div>

              <div className="relative mb-3">
                <span
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    newProduct.price || focus.price
                      ? 'text-black'
                      : 'text-gray-500'
                  }`}
                >
                  ₱
                </span>
                <input
                  type="text"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('price')}
                  onBlur={() => handleBlur('price')}
                  placeholder=" "
                  className="peer pl-7 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <label
                  htmlFor="price"
                  className={`absolute transform transition-all duration-300 ${
                    newProduct.price || focus.price
                      ? 'text-primary text-xs -top-2 bg-white px-1 left-3'
                      : 'text-gray-500 text-base top-1/2 -translate-y-1/2 left-7'
                  }`}
                >
                  Price
                </label>
              </div>

              <CustomDropdown
                selectedCategory={newProduct.category}
                setCategory={handleCategoryChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end text-sm mr-5">
          <button
            onClick={onClose}
            className="mr-3 custom-outline outline-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            disabled={
              !newProduct.image ||
              !newProduct.name ||
              !newProduct.price ||
              !newProduct.category
            }
            className={`px-4 py-2 custom-outline outline-opaque rounded transition-colors ${
              !newProduct.image ||
              !newProduct.name ||
              !newProduct.price ||
              !newProduct.category
                ? 'bg-opaque'
                : 'bg-primary text-white'
            }`}
          >
            {actionType === 'add' ? 'Add Product' : 'Update Product'}
          </button>
        </div>
      </Modal>
      {/* 
      <ConfirmationModal
        isVisible={isConfirmationVisible}
        onClose={() => setIsConfirmationVisible(false)}
        onConfirm={handleConfirmAction}
        actionType={actionType}
      /> */}
    </>
  )
}

export default ProductModal
