 import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-6 py-16 px-4 p-4' style={{ 
      background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)'
    }}>
      <div className="text-center max-w-2xl">
        <h1 className='text-3xl md:text-4xl font-bold text-[#7c3aed] mb-3'>
          Find by <span className="text-[#fef08a]">Speciality</span>
        </h1>
        <p className='text-gray-600'>
          Scroll through our list of trusted doctors and schedule your required
          appointment quickly.
        </p>
      </div>

      <div className='flex justify-center gap-6 pt-5 w-full overflow-x-auto pb-4'>
        {specialityData.map((item, index) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            className='flex flex-col items-center text-sm cursor-pointer flex-shrink-0 transition-all duration-200 group'
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full bg-white p-4 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:bg-[#fef08a] transition-all">
              <img
                className='w-full h-full object-contain pointer-events-none'
                src={item.image}
                alt={`${item.speciality} specialist`}
              />
            </div>
            <p className="font-medium text-[#7c3aed] group-hover:text-[#5b21b6] transition-colors">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu