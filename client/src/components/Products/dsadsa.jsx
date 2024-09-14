import React, { useState, useEffect } from 'react'

function Modal({ isOpen, onClose, onSubmit, defaultValues = {} }) {
  const [image, setImage] = useState(defaultValues.image || '')
  const [title, setTitle] = useState(defaultValues.title || '')
  const [price, setPrice] = useState(defaultValues.price || '')
  const [category, setCategory] = useState(defaultValues.category || '')

  // Reset the modal values when it is closed or opened without defaults
  useEffect(() => {
    if (!isOpen) {
      setImage('')
      setTitle('')
      setPrice('')
      setCategory('')
    } else {
      setImage(defaultValues.image || '')
      setTitle(defaultValues.title || '')
      setPrice(defaultValues.price || '')
      setCategory(defaultValues.category || '')
    }
  }, [isOpen, defaultValues])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    onSubmit({ image, title, price, category })
    onClose()
  }

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">
            {defaultValues.title ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Image URL:</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Category:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Coffee or Blended"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {defaultValues.title ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  )
}

export default Modal
