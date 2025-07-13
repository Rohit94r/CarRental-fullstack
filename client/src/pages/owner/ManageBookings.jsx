import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/Appcontext'
import toast from 'react-hot-toast'

const ManageBookings = () => {
  const { currency, axios } = useAppContext()
  const [bookings, setBookings] = useState([])

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner')
      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', { bookingId, status })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerBookings()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title
        title='Manage Bookings'
        subTitle='Track all customer bookings, approve or cancel requests, and manage booking statuses.'
      />

      <table className='w-full border-collapse text-left text-sm text-gray-600 mt-6'>
        <thead className='text-gray-500'>
          <tr>
            <th className='p-3 font-medium'>Car</th>
            <th className='p-3 font-medium max-md:hidden'>Dates</th>
            <th className='p-3 font-medium'>Price</th>
            <th className='p-3 font-medium'>Status</th>
            <th className='p-3 font-medium'>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className='border-t border-borderColor text-gray-500'>
              <td className='p-3 flex items-center gap-3'>
                <img
                  src={booking.car.image}
                  alt=''
                  className='h-12 w-12 aspect-square rounded-md object-cover'
                />
                <p className='font-medium max-md:hidden'>
                  {booking.car.brand} {booking.car.model}
                </p>
              </td>

              <td className='p-3 max-md:hidden'>
                {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
              </td>

              <td className='p-3'>
                {currency}
                {booking.price}
              </td>

              <td className='p-3 max-md:hidden'>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold 
                  ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-600'
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {booking.status}
                </span>
              </td>

              <td className='p-3'>
                {booking.status === 'pending' ? (
                  <select
                    onChange={(e) => changeStatus(booking._id, e.target.value)}
                    value={booking.status}
                    className='px-2 py-1.5 text-sm text-gray-700 border border-borderColor rounded-md outline-none'
                  >
                    <option value='pending'>Pending</option>
                    <option value='cancelled'>Cancelled</option>
                    <option value='confirmed'>Confirmed</option>
                  </select>
                ) : (
                  <span className='text-xs text-gray-400'>No action</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageBookings
