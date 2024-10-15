import pic from '../assets/3.png'
import Notification from '../assets/notification-02-stroke-rounded'

export default function Profile() {
  const name = localStorage.getItem('username')
  const role =
    localStorage.getItem('role') === 'ADMIN' ? 'Administrator' : 'Staff Member'

  return (
    <div className="h-24 flex items-center px-2 relative">
      <img
        src={pic}
        alt="Profile Picture"
        className="h-[60%] rounded-xl mr-5"
      />
      <div>
        <p className="text-base font-bold mb-1">{name}</p>
        <p className="text-sm text-gray-500 mt-1">{role}</p>
      </div>
    </div>
  )
}
