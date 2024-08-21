'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail } from '@/firebase/utils'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
// import Button from '@/components/Button'
import Error from '@/components/Error'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
import Input from '@/components/Input'
import { useRouter } from 'next/navigation';
import Subtitle from '@/components/Subtitle'








const Button = ({ url, children, src }) => {
  return <Link href={`/Admin/Edit/Section?item=${url}`} className='font-medium'>
    <button className='bg-[#ffbd2f] w-[150px] sm:w-[200px] lg:w-[250px] flex flex-col justify-self-center justify-center items-center  p-2 rounded-[5px]  m-3'>
      <img src={src} className='w-[100px]' alt="" />
      {children}
    </button>
  </Link>
}
export default function Home() {

  const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()
  const router = useRouter()


  const signUpHandler = (e) => {

  }

  useEffect(() => {

  }, [user, success]);


  console.log(user)
  return (

    <div className="relative min-h-full"
      style={{
        backgroundImage: 'url(/gif.gif)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}>

      <div className='relative  pt-[100px] pb-[200px]  bg-gradient-to-t from-[#00061860] to-[#000618d1]  lg: pb-[100px] lg:pb-0  min-h-screen lg:py-[50px] flex flex-col justify-center z-10 '>
        <div className='flex justify-center pb-12'>
          <img src="/favicon.png" className='min-w-[200px] w-[15vw]' alt="User" />
        </div>

        <div className='relative   z-10  grid grid-cols-2 sm:grid-cols-3 justify-items-center'>
          <Button url='inicio' src="/icons/HOME.png" >Inicio</Button>
          <Button url='acerca' src="/icons/HOME.png" >Acerca de</Button>

          <Button url='cursos' src="/icons/TERRESTRE.png" >Cursos  </Button>

          {/* <Button url='terrestre' src="/icons/TERRESTRE.png" >Transporte Terrestre  </Button>
          <Button url='maritimo' src="/icons/MARITIMO.png" > Transporte Maritimo  </Button>
          <Button url='aereo' src="/icons/AEREO.png" > Transporte Aereo</Button>
          <Button url='despachos' src="/icons/DESPACHO ADUANERO.png" > Despachos Aduaneros  </Button>
          <Button url='proyecto' src="/icons/CARGA REFRIGERADA.png" >Carga Proyecto</Button>
          <Button url='exportaciones' src="/icons/TERRESTRE.png" >Exportaciones</Button>
          <Button url='farmaceutico' src="/icons/DESPACHO ADUANERO.png" >Farmaceuticos y sanitario </Button> */}
          <Button url='experiencia' src="/icons/EXPERIENCIA.png" >Testimonios</Button>
          {/* <Button url='solucionesIT' src="/icons/HERRAMIENTAS.png" >SolucionesIT</Button> */}
          <Button url='contactos' src="/icons/CARGA REFRIGERADA.png" > Contactos  </Button>
          {/* <Button url='maritimos' src="/icons/DESPACHO ADUANERO.png" >Contenedores Maritimos </Button>
          <Button url='aereos' src="/icons/DESPACHO ADUANERO.png" >Contenedores Aereos </Button> */}
        </div>

      </div>
    </div>
  )
}
