'use client'
import { useUser } from '@/context/Context'
import { getSpecificData } from '@/firebase/utils'

import { useState, useEffect } from 'react'
import { handleSignOut } from '@/firebase/utils'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BottomNavigation from '@/components/BottomNavigation'
import Navbar from '@/components/Navbar'
import { onAuth } from '@/firebase/utils'

function Home({ children }) {
  const router = useRouter()
  const { user, userDB, setUserProfile, setUserCart, setNavItem, setUserProduct, setRecetaDB, setUserDistributorPDB, setUserData, filter, setFilter, nav, setNav, modal, setModal, cart, cliente, setCliente } = useUser()
  const pathname = usePathname()


  console.log(pathname)



  const redirectHandler = (ref) => {
    router.push(ref)
  }

  const handlerFilter = (e) => {
    const data = e.target.value
    setFilter(data)
  }
  const back = () => {
    router.back()
  }
  function openNav(e) {
    e.preventDefault()
    e.stopPropagation()
    setNav(!nav)
  }

  const handleSignOutConfirm = () => {
    setUserProfile(null)
    setUserCart({})
    setUserProduct(undefined),
      setRecetaDB(undefined),
      setUserDistributorPDB(undefined)
    setUserData(null)
    router.push('/')
    setModal('')
    handleSignOut()
  }



  useEffect(() => {
    if (user === undefined){ onAuth(setUserProfile, setUserData)}
    if (userDB === null && user && user !== undefined){ getSpecificData(`Users/${user.uid}` ,setUserData)}
    cliente === undefined && getSpecificData('/Cliente', setCliente)
  }, [user, cliente])
  return (
    <div className="relative" onClick={() => setNavItem(false)}>
              <img src="/background.png" className='fixed bottom-0 w-full h-[100vh] pb-[10px] object-cover object-bottom ' alt="" />

      {user !== undefined && cliente !== undefined && <main className={`relative min-w-screen  object-cover z-10 bg-gradient-to-tr from-[#06102bdc]  via-[#06102b88] to-[#06102bdc]  lg:pb-0  lg:min-w-auto my-[0px]   lg:min-h-screen  ${nav ? 'w-screen pl-[100vw] overflow-hidden ' : '  lg:px-[0px]'}`} onClick={() => setNav(false)} style={{ transition: 'all 0.5' }}>
        {children}
        {/* {pathname !== '/Login' && pathname !== '/SignUp' && pathname !== '/Register' && <BottomNavigation />} */}
      </main>}
    </div>
  )
}

export default Home

