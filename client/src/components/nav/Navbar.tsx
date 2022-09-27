import React from 'react'

const Navbar: React.FC<{title: string}> = (props) => {
  return (
    <div className='w-full flex flex-row min-h-[8vh] justify-content items-center space-between px-[4vw] bg-white justify-between border-b-2'>
        <p className='text-[#535353] text-md font-semibold font-jakarta'>{props.title}</p>
        <p className='text-[#535353] font-semibold font-jakarta'>Botezatu Emil</p>
    </div>
  )
}

export default Navbar