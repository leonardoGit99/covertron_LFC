import React from 'react'
import { CiMenuFries } from 'react-icons/ci'
import { MenuDrawer } from './MenuDrawer'

function NbMobileItems() {
  const burguerBtn = (<CiMenuFries />)
  return (
    <div>
      <MenuDrawer trigger={burguerBtn} />
    </div>
  )
}

export default NbMobileItems