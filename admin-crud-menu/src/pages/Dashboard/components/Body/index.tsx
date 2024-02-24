import React from 'react'
import Card from '../../../../components/GroceryCard'

const Body = () => {

  return (
    <div className='relative m-8 rounded-lg bg-white pt-5 pb-12 shadow sm:px-6 sm:pt-6'>
      <div className='flex absolute right-20'>
        <button
          type="submit"
          className="ml-10 w-48 bg-emerald-900 hover:bg-emerald-950 text-white border-transparent cursor-pointer py-3 h-14 mt-1 px-10 border rounded-md shadow-sm disabled:opacity-40 text-lg"
        >
          <span className="text-custom-white-900">Add</span>
        </button>
      </div>
      <div className='mt-20'>
        <Card />
      </div>


    </div>
  )
}

export default Body