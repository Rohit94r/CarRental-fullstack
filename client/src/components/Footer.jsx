import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-white px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-600">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-300">
        {/* Logo & About */}
        <div className="transition-all hover:scale-[1.03] hover:shadow-lg duration-300">
          <img src={assets.logo} alt="logo" className="h-10 mb-4" />
          <p className="max-w-xs">
            Premium car rental service with a wide selection of luxury and everyday vehicles for all your travel needs.
          </p>
          <div className="flex gap-3 mt-4">
            {[assets.facebook_logo, assets.instagram_logo, assets.twitter_logo, assets.gmail_logo].map((icon, i) => (
              <a key={i} href="#" className="transition-transform hover:scale-125">
                <img src={icon} alt="social" className="w-5 h-5 hover:drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="hover:scale-105 transition duration-300">
          <h2 className="text-base font-semibold text-gray-800 uppercase mb-3">Quick Links</h2>
          <ul className="space-y-2">
            {['Home', 'Browse Cars', 'List Your Car', 'About Us'].map((text, i) => (
              <li key={i}>
                <a href="#" className="hover:text-blue-500 transition-colors">{text}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="hover:scale-105 transition duration-300">
          <h2 className="text-base font-semibold text-gray-800 uppercase mb-3">Resources</h2>
          <ul className="space-y-2">
            {['Help Center', 'Privacy Policy', 'List Your Car', 'Insurance'].map((text, i) => (
              <li key={i}>
                <a href="#" className="hover:text-blue-500 transition-colors">{text}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="hover:scale-105 transition duration-300">
          <h2 className="text-base font-semibold text-gray-800 uppercase mb-3">Contact</h2>
          <ul className="space-y-2 text-sm">
            <li>5649 Luxury Drive</li>
            <li>Nashik, Maharashtra, India 16544</li>
            <li>+91 9876543210</li>
            <li>inforohit@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs py-6">
        <p className="text-center">© {new Date().getFullYear()} <span className="font-semibold text-gray-800">Brand</span>. All rights reserved. by <span className="text-blue-500 font-medium">Rohit Jadhav</span></p>
        <ul className="flex gap-4 items-center text-gray-500">
          <li><a href="#" className="hover:text-blue-600">Privacy</a></li>
          <li>|</li>
          <li><a href="#" className="hover:text-blue-600">Terms</a></li>
          <li>|</li>
          <li><a href="#" className="hover:text-blue-600">Sitemap</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
