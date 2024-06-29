import {FC, PropsWithChildren} from 'react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex flex-col'>
      <div className='bg-gray-300 px-6 py-2'>
        <h2 className='text-lg font-bold'>
          Msbar ERP
        </h2>
      </div>
      <div className='mt-2 py-2'>
        {children}
      </div>
    </div>
  )
}

export default Layout;
