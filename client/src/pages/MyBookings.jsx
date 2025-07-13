import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/Appcontext'
import toast from 'react-hot-toast'

const MyBookings = () => {
  const { axios, user, currency } = useAppContext()
  const [bookings, setBookings] = useState([])

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user')
      if (data.success) {
        setBookings(data.booking || [])
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) fetchMyBookings()
  }, [user])

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl mx-auto'>
      <Title
        title='My Bookings'
        subTitle='View and manage your car bookings'
        align='center'
        className='mb-8'
      />

      {bookings.length === 0 ? (
        <p className='text-center text-gray-500 mt-20'>You haven't made any bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12 bg-white shadow-sm'
          >
            {/* CAR IMAGE */}
            <div className='md:col-span-1'>
              <img
                src={booking.car?.image || assets.default_car}
                alt={`${booking.car?.brand || 'Car'} ${booking.car?.model || ''}`}
                className='w-full rounded-md aspect-video object-cover mb-3'
              />
            </div>

            {/* CAR INFO */}
            <div className='md:col-span-3 flex flex-col justify-center'>
              <p className='text-lg font-bold text-gray-800'>
                {booking.car?.brand || 'Brand'} {booking.car?.model || 'Model'}
              </p>
              <p className='text-sm text-gray-500'>
                {booking.car?.year || ''} · {booking.car?.category || ''} · {booking.car?.location || ''}
              </p>
            </div>

            {/* BOOKING DETAILS */}
            <div className='md:col-span-2'>
              <div className='flex items-center gap-2'>
                <span className='px-3 py-1.5 bg-light rounded font-semibold text-gray-700'>Booking</span>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {booking.status || 'Unknown'}
                </span>
              </div>

              <div className='flex items-start gap-2 mt-4'>
                <img src={assets.calendar_icon_colored} className='w-4 h-4 mt-1' alt='Calendar Icon' />
                <div>
                  <p className='text-gray-500'>Rental Period</p>
                  <p className='font-medium'>
                    {booking.pickupDate?.split?.('T')[0] || '-'} to {booking.returnDate?.split?.('T')[0] || '-'}
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.location_icon_colored} className='w-4 h-4 mt-1' alt='Location Icon' />
                <div>
                  <p className='text-gray-500'>Pick-up Location</p>
                  <p className='font-semibold'>{booking.car?.location || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* PRICE SECTION */}
            <div className='md:col-span-1 flex flex-col justify-between text-right'>
              <div className='text-sm text-gray-500'>
                <p>Total Price</p>
                <h1 className='text-2xl font-semibold text-primary'>
                  {currency}
                  {booking.price || 0}
                </h1>
                <p className='text-sm mt-1'>
                  Booked on:{' '}
                  <span className='font-medium'>{booking.createdAt?.split?.('T')[0] || 'Unknown'}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default MyBookings
