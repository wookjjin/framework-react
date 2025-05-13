import React from 'react'
import { Outlet } from 'react-router'

import LayoutHeader from '~/components/layouts/LayoutHeader'

const Default: React.FC = () => {
  return (
    <>
      <LayoutHeader />
      <Outlet />
    </>
  )
}

export default Default
