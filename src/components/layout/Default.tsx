import React from 'react'
import { Outlet } from 'react-router'

import LayoutHeader from '~/components/layout/LayoutHeader'
import { SidebarProvider } from '~/contexts/sidebar-context'

const DefaultLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className='min-h-screen bg-gray-50'>
        <LayoutHeader />
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}

export default DefaultLayout