import React, { useEffect, useState, useMemo } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CarCard from '../components/CarCard';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation') || '';
  const pickupDate = searchParams.get('pickupDate') || '';
  const returnDate = searchParams.get('returnDate') || '';

  const { cars, axios } = useAppContext();

  const [query, setQuery] = useState('');
  const [availableCars, setAvailableCars] = useState([]);

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        setAvailableCars(data.availableCars);
        if (data.availableCars.length === 0) {
          toast('No cars available for selected dates.');
        }
      } else {
        toast.error(data.message || 'Failed to fetch availability');
      }
    } catch (err) {
      toast.error(err.message || 'Server error');
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    } else {
      setAvailableCars(cars); // fallback to all cars
    }
  }, [cars, pickupLocation, pickupDate, returnDate]);

  // ✅ Final filteredCars based on query and availability
  const filteredCars = useMemo(() => {
    if (!query.trim()) return availableCars;

    const q = query.toLowerCase();
    return availableCars.filter(
      ({ brand, model, features = [] }) =>
        brand?.toLowerCase().includes(q) ||
        model?.toLowerCase().includes(q) ||
        features.some(f => f.toLowerCase().includes(q))
    );
  }, [query, availableCars]);

  return (
    <section>
      <div className="flex flex-col items-center py-20 bg-gradient-to-br from-sky-50 to-sky-200 max-md:px-4">
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />

        {/* Search Bar */}
        <div className="flex items-center bg-white px-5 mt-8 max-w-2xl w-full h-12 rounded-full shadow-lg ring-1 ring-gray-100 hover:ring-2 hover:ring-primary transition-all duration-300">
          <img src={assets.search_icon} className="w-5 h-5 mr-3 opacity-60" alt="search" />
          <input
            type="search"
            placeholder="Search by brand, model, or features"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 h-full bg-transparent outline-none text-gray-600 placeholder-gray-400"
          />
          <img src={assets.filter_icon} className="w-5 h-5 ml-3 opacity-60" alt="filter" />
        </div>
      </div>

      {/* Car Results */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-14">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto text-2xl">
          Showing&nbsp;
          <span className="font-medium text-gray-700">{filteredCars.length}</span>&nbsp;
          {filteredCars.length === 1 ? 'car' : 'cars'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 xl:px-20 max-w-7xl mx-auto">
          {filteredCars.map((car, i) => (
            <CarCard key={i} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cars;
