import { Outlet } from 'react-router'

import { LayoutHeader } from '~/components/layouts/LayoutHeader'

export function Default() {
  return (
    <>
      <LayoutHeader />
      <Outlet />
    </>
  )
}

export default Default
