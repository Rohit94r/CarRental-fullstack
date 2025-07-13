import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { assets, ownerMenuLinks } from '../../assets/assets';
import { useAppContext } from '../../context/Appcontext';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();

  const [image, setImage] = useState(null);

  // ✅ Refresh image when user is updated
  useEffect(() => {
    setImage(null); // clear image after successful upload or route change
  }, [user]);

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      const { data } = await axios.post('/api/owner/update-image', formData);

      if (data.success) {
        await fetchUser(); // Refresh user details after image upload
        toast.success(data.message);
      } else {
        toast.error(data.message || "Upload failed");
      }

      setImage(null); // Clear selected image
    } catch (error) {
      toast.error(error?.response?.data?.message || "Upload error");
      console.error("Image upload error:", error);
    }
  };

  return (
    <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm bg-white shadow'>

      {/* Avatar Upload */}
      <div className='group relative'>
        <label htmlFor="image" className="cursor-pointer relative block">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
            }
            alt="User"
            className="h-20 w-20 rounded-full object-cover border-2 border-gray-300 transition-all duration-300 group-hover:brightness-90"
          />
          <input
            type="file"
            id='image'
            accept='image/*'
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className='absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/40 rounded-full'>
            <img src={assets.edit_icon} alt="Edit" className="h-5 w-5" />
          </div>
        </label>
      </div>

      {/* Save Button */}
      {image && (
        <button
          onClick={updateImage}
          className='absolute top-2 right-2 flex items-center gap-1 px-3 py-1 bg-primary/90 text-white text-xs rounded-full shadow hover:bg-primary transition-all duration-300'
        >
          Save <img src={assets.check_icon} width={13} alt="check" />
        </button>
      )}

      {/* User Name */}
      <p className='mt-3 text-base font-semibold text-gray-800 max-md:hidden'>{user?.name}</p>

      {/* Menu Links */}
      <div className='w-full mt-6'>
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `relative flex items-center gap-3 w-full py-3 pl-6 pr-4 transition-all duration-300 hover:bg-primary/10 hover:text-primary 
              ${isActive || link.path === location.pathname ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600'}`
            }
          >
            <img
              src={link.path === location.pathname ? link.coloredIcon : link.icon}
              alt={`${link.name} icon`}
              className='h-5 w-5'
            />
            <span className='max-md:hidden'>{link.name}</span>
            {link.path === location.pathname && (
              <div className='absolute right-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded bg-primary'></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
