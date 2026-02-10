import React from 'react'
import { Features } from './Homedata'

const FourthSec = () => {
  return (
    <div> 
        <section className="w-full py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Core Features
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Everything you need in one platform
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 ">
          {Features.map((item, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${item.color}`}
              >
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mt-5">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}

export default FourthSec