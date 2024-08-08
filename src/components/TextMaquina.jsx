'use client'
import { TypeAnimation } from 'react-type-animation';
import { Translator, getTranslation } from '@miracleufo/react-g-translator';
import { useUser } from '@/context/Context'
import { useEffect, useState } from 'react'

const TextMaquina = () => {
  const { user, userDB, modal, setModal, setUserProfile, success, languaje, setUserDistributorPDB, filter, setFilter, nav, setNav, navItem, setNavItem, setSeeMore } = useUser()

  console.log(languaje)

  return <TypeAnimation
    sequence={[
      // Same substring at the start will only be typed out once, initially
      'CursoS de INVERSION EN CRYPTOS',
      1000, // wait 1s before replacing "Mice" with "Hamsters"
      'Cursos de INVERSION FINANCIERA',
      1000,
      'Cursos de LIBERTAD FINANCIERA',
      1000,
    ]}
    wrapper="span"
    speed={40}
    style={{ fontSize: '16px', display: 'inline-block', color: 'white', width: '300px', textAlign: 'left', }}
    repeat={Infinity}
  />



};
export default TextMaquina