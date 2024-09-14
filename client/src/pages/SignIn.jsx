import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Bg from '../assets/menu/beans.jpg'
import logo from '../assets/logo/logo.png'
import SubmitIcon from '../assets/svg/arrow-right-02-stroke-rounded.jsx'
import Eye from '../assets/svg/user-stroke-rounded.jsx'
import EyeOff from '../assets/svg/view-off-slash-stroke-rounded.jsx'

function SignIn() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    // Sign-in logic here
    navigate('/') // Navigate to the Home page
  }

  const [usernameHasContent, setUsernameHasContent] = useState(false)
  const [passwordHasContent, setPasswordHasContent] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const handleFocus = (setState) => setState(true)
  const handleBlur = (e, setState) => setState(e.target.value.length > 0)
  const handleInput = (e, setState) => {
    setState(e.target.value.length > 0 || document.activeElement === e.target)
  }

  const isButtonEnabled = usernameHasContent && passwordHasContent

  return (
    <div className="flex h-screen bg-primary">
      <div className="w-[40%] hidden lg:block ">
        <img src={Bg} alt="" className="w-full h-full object-cover" />
        {/* Position logo at top-left corner */}
      </div>
      <div className="flex flex-1 bg-primary-2 min-w-[320px]  items-center justify-center relative ">
        <div className="absolute top-0 left-0 w-[200px] h-[100px] overflow-hidden">
          <img
            src={logo}
            alt="logo"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Center the form container */}

        <div className="w-[400px] max-w-md bg-signUp-2 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                type="text"
                id="username"
                className="w-full px-2 pt-4 pb-1 text-base bg-signUp-1 rounded-sm hover:bg-signUp-3 focus:bg-signUp-2 transition-colors duration-200 outline-none focus:outline focus:outline-1 focus:-outline-offset-2 focus:outline-tertiary peer"
                required
                onFocus={() => handleFocus(setUsernameHasContent)}
                onBlur={(e) => handleBlur(e, setUsernameHasContent)}
                onInput={(e) => handleInput(e, setUsernameHasContent)}
              />
              <label
                htmlFor="username"
                className={`absolute top-3.5 left-3 text-2xs font-bold text-gray-500 transition-transform duration-300 transform ${usernameHasContent ? '-translate-x-1 -translate-y-3' : ''}`}
              >
                USERNAME
              </label>
            </div>
            <div className="relative mb-4">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                className="w-full px-2 pt-4 pb-1 text-base bg-signUp-1 rounded-sm hover:bg-signUp-3 focus:bg-signUp-2 transition-colors duration-200 outline-none focus:outline focus:outline-1 focus:-outline-offset-2 focus:outline-tertiary peer"
                required
                onFocus={() => handleFocus(setPasswordHasContent)}
                onBlur={(e) => handleBlur(e, setPasswordHasContent)}
                onInput={(e) => handleInput(e, setPasswordHasContent)}
              />
              <label
                htmlFor="password"
                className={`absolute top-3.5 left-3 text-2xs font-bold text-gray-500 transition-transform duration-300 transform ${passwordHasContent ? '-translate-x-1 -translate-y-3' : ''}`}
              >
                PASSWORD
              </label>
              {passwordHasContent && (
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-3 flex items-center z-10 cusor-pointer"
                >
                  {passwordVisible ? (
                    <Eye className="text-gray-500" />
                  ) : (
                    <EyeOff className="text-gray-500" />
                  )}
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={!isButtonEnabled}
              className={`float-end p-3 rounded-2xl transition-colors duration-200 ${
                isButtonEnabled
                  ? 'bg-primary-2 text-signUp-2 bg-primary '
                  : 'bg-signUp-0 text-gray-500 '
              }`}
            >
              <SubmitIcon
                className={`w-full ${isButtonEnabled ? 'text-signUp-2' : 'text-gray-500'}`}
              />
            </button>
          </form>
        </div>
        <span className="absolute bottom-0 text-customWhite flex w-[40%] justify-between pb-2 text-secondary-2 text-xs font-semibold  ">
          <p>© SHOT Café! : A Point of Sale System 2023</p>
          <p>v2.0</p>
        </span>
      </div>
    </div>
  )
}

export default SignIn
