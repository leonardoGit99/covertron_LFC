import React from 'react'
import { CiMenuFries } from 'react-icons/ci'
import { MenuDrawer } from '@/components/MenuDrawer'

function NbMobileItems() {
  const burguerBtn = (<CiMenuFries />)
  return (
    <>
      <MenuDrawer trigger={burguerBtn} />
    </>
  )
}

export default NbMobileItems