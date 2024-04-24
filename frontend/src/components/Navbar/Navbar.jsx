import React from 'react'
import { TabNav } from '@radix-ui/themes';

const Navbar = () => {
  return (
    <TabNav.Root justify="end" >
      <TabNav.Link href="/login" active>
        Login
      </TabNav.Link>
    </TabNav.Root>
  )
}

export default Navbar