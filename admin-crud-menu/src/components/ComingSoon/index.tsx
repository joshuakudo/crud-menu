import React from 'react'
import ComingSoonImage from "../../assets/ComingSoon.png"

const ComingSoon = () => {
  return (
    <div>
      <div className="py-6 h-[77vh]">
        <div className="flex justify-center items-center md:px-8 sm:px-6 px-4 h-[100%]">
          <div>
            <img className='mx-auto lg:max-w-[100%] sm:max-w-[70%] max-w-[100%] w-96 h-96 lg:h-[250px] ' src={ComingSoonImage} alt="Coming Soon"/>
            <p className='mx-auto mt-10 w-[90%] text-[#707070] text-center text-4xl'>This feature is coming soon!</p>
          </div>
        </div>
    </div>
    </div>
  )
}

export default ComingSoon