import logo from '../assets/logo/icon.png'

export default function Logo() {
  return (
    <div className="flex justify-center items-center h-28">
      <img src={logo} alt="Logo" className="w-14" />
    </div>
  )
}
