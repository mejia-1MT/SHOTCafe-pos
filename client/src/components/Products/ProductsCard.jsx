import React, { useState } from 'react'
import UpdateIcon from '../../assets/svg/edit-01-stroke-rounded'
import DeleteIcon from '../../assets/svg/delete-02-stroke-rounded'
import ConfirmationModal from './ConfirmationModal' // Import the ConfirmationModal

function ProductsCard({ image, title, price, category, onEdit, onDelete }) {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false)

  const handleOpenConfirmation = () => {
    setIsConfirmationVisible(true) // Show confirmation modal
  }

  const handleCloseConfirmation = () => {
    setIsConfirmationVisible(false) // Close confirmation modal
  }

  const handleConfirmDelete = () => {
    onDelete() // Call the delete function
    handleCloseConfirmation() // Close the confirmation modal
  }

  return (
    <div
      className="relative h-[250px] w-[220px] shadow-2xl rounded-lg overflow-hidden bg-contain group"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Block Content */}
      <div
        className="absolute bottom-0 w-full h-2/5 flex flex-col justify-end items-center pb-3"
        style={{
          background:
            'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.4) 80%, transparent 100%)',
        }}
      >
        <div
          className={`flex font-bold w-[60%] mb-3 items-center justify-center space-x-4 ${
            category === 'Coffee' ? 'text-[#4d2a1f]' : 'text-[#b02222]'
          } group-hover:hidden`}
        >
          <h1 className="w-[70%] leading-none">{title}</h1>
          <p>₱{price}</p>
        </div>
        <div
          className={`text-customWhite p-1 px-3 rounded-full font-semibold text-sm ${
            category === 'Coffee' ? 'bg-[#4d2a1f]' : 'bg-[#b02222]'
          } group-hover:hidden`}
        >
          <p>{category}</p>
        </div>
      </div>
      {/* Hidden Content */}
      <div className="absolute bottom-0 w-full h-2/5 flex space-x-4 justify-center items-center opacity-0 group-hover:opacity-100 group-hover:flex transition-opacity duration-300">
        <button
          onClick={onEdit}
          className="rounded-full p-3 bg-[#fd7d14df] hover:bg-[#fd7744]"
        >
          <UpdateIcon className="text-customWhite" />
        </button>
        <button
          onClick={handleOpenConfirmation}
          className="rounded-full p-3 bg-[#dc3545df] hover:bg-[#dc3545]"
        >
          <DeleteIcon className="text-customWhite" />
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isVisible={isConfirmationVisible}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmDelete}
        actionType="delete" // Indicate the type of action
      />
    </div>
  )
}

export default ProductsCard
