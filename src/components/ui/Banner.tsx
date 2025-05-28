import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface BannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage = 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
}) => {
  return (
    <div 
      className="relative bg-cover bg-center h-[500px] flex items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            {subtitle}
          </p>
          <Link 
            to={ctaLink}
            className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-300"
          >
            {ctaText}
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;