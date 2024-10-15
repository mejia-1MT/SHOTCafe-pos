import React from 'react'
import Modal from './Modal'
import UpdateIcon from '../../assets/svg/edit-01-stroke-rounded'
import DeleteIcon from '../../assets/svg/delete-02-stroke-rounded'
import AddIcon from '../../assets/svg/add-01-stroke-rounded'

const ConfirmationModal = ({ isVisible, onClose, onConfirm, actionType }) => {
  const getActionText = () => {
    switch (actionType) {
      case 'delete':
        return 'Are you sure you want to delete this product?'
      case 'update':
        return 'Are you sure you want to update this product?'
      case 'add':
        return 'Are you sure you want to add this product?'
      default:
        return 'Action not accepted'
    }
  }

  const getButtonStyles = () => {
    switch (actionType) {
      case 'delete':
        return 'border-red-500 bg-red-500 text-customWhite hover:bg-red-600 hover:border-red-600'
      case 'update':
        return 'border-yellow-500 bg-yellow-500 text-customWhite hover:bg-yellow-600 hover:border-yellow-600'
      case 'add':
        return 'border-blue-500 bg-blue-500 text-customWhite hover:bg-blue-600 hover:border-blue-600'
      default:
        return ''
    }
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div>
        <div className="flex">
          <div className="mr-2">
            {actionType === 'delete' ? (
              <DeleteIcon className="text-" />
            ) : actionType === 'update' ? (
              <UpdateIcon />
            ) : actionType === 'add' ? (
              <AddIcon />
            ) : (
              ''
            )}
          </div>
          <h3 className="text-lg font-bold mb-4">
            {actionType === 'delete'
              ? 'Confirm Deletion'
              : actionType === 'update'
                ? 'Confirm Update'
                : actionType === 'add'
                  ? 'Confirm New Product'
                  : 'Confirm Action'}
          </h3>
        </div>
        <p>{getActionText()}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="mr-3 border border-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`text-sm px-4 py-2 rounded transition-colors ${getButtonStyles()}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
