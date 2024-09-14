import { useState } from 'react'

function NavElements({ Image, Label, isActive, onClick }) {
  return (
    <a
      className={`nav-labeled-icon group transform-colors duration-300 ${isActive ? 'text-customWhite bg-primary' : 'text-customGray hover:text-primary'}`}
      onClick={onClick}
    >
      <Image
        className={`nav-icon ${isActive ? 'text-customWhite' : 'group-hover:text-primary text-customGray'}`}
      />
      <p
        className={`nav-label ${isActive ? 'text-customWhite' : 'group-hover:text-primary text-customGray'}`}
      >
        {Label}
      </p>
    </a>
  )
}

export default NavElements
