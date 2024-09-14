// Modal.jsx
import React from 'react'

function Modal({ isVisible, children }) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0  z-50  bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg relative">
        {children}
      </div>
    </div>
  )
}

export default Modal
