'use client'
import { TypeAnimation } from 'react-type-animation';
import { Translator, getTranslation } from '@miracleufo/react-g-translator';
import { useUser } from '@/context/Context'
import { useEffect, useState } from 'react'

const TextMaquina = ({textDB}) => {
  const { user, userDB, modal, setModal, setUserProfile, success, languaje, setUserDistributorPDB, filter, setFilter, nav, setNav, navItem, setNavItem, setSeeMore } = useUser()

  console.log(textDB[0])

  return <TypeAnimation
    sequence={[
      // Same substring at the start will only be typed out once, initially
      textDB[0],
      1000, // wait 1s before replacing "Mice" with "Hamsters"
      textDB[2],
      1000,
      textDB[3],
      1000,
    ]}
    wrapper="span"
    speed={40}
    style={{ fontSize: '16px', fontWeight: '100', display: 'inline-block', color: 'white', width: '300px', textAlign: 'left', }}
    repeat={Infinity}
  />



};
export default TextMaquina