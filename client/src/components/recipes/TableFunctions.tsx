import React from 'react'

const TableFunctions = () => {
  return (
    <div className='w-full flex-row flex justify-between mt-4'>
        <p  className='font-semibold text-sm'> 16 meals</p>
        <div className='flex flex-row space-x-4'>
            <p className='font-semibold text-sm'>Sort by calories</p>
            <p className='font-semibold text-sm'>Filter diets</p>
        </div>

    </div>
  )
}

export default TableFunctions