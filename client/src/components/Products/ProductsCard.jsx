import React, { useState } from 'react'
import UpdateIcon from '../../assets/svg/edit-01-stroke-rounded'
import DeleteIcon from '../../assets/svg/delete-02-stroke-rounded'
function ProductsCard({ product, onEdit, onDelete }) {
  return (
    <div
      className="relative h-[250px] w-[220px] shadow-2xl rounded-lg overflow-hidden bg-contain group"
      style={{
        backgroundImage: `url(http://localhost:3000/assets/${product.image})`,
      }}
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
            product.category === 'Coffee' ? 'text-[#4d2a1f]' : 'text-[#b02222]'
          } group-hover:hidden`}
        >
          <h1 className="w-[70%] leading-none">{product.name}</h1>
          <p>₱{product.price}</p>
        </div>
        <div
          className={`text-customWhite p-1 px-3 rounded-full font-semibold text-sm ${
            product.category === 'Coffee' ? 'bg-[#4d2a1f]' : 'bg-[#b02222]'
          } group-hover:hidden`}
        >
          <p>{product.category}</p>
        </div>
      </div>
      {/* Hidden Content */}
      <div className="absolute bottom-0 w-full h-2/5 flex space-x-4 justify-center items-center opacity-0 group-hover:opacity-100 group-hover:flex transition-opacity duration-300">
        <button
          onClick={() => onEdit(product)}
          className="rounded-full p-3 bg-[#fd7d14df] hover:bg-[#fd7744]"
        >
          <UpdateIcon className="text-customWhite" />
        </button>
        <button
          onClick={() => onDelete(product)}
          className="rounded-full p-3 bg-[#dc3545df] hover:bg-[#dc3545]"
        >
          <DeleteIcon className="text-customWhite" />
        </button>
      </div>

      {/* Confirmation Modal for Delete */}
      {/* <ConfirmationModal
        isVisible={isConfirmationVisible}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmDelete}
        actionType="delete" // Indicate the type of action
      /> */}
    </div>
  )
}

export default ProductsCard
