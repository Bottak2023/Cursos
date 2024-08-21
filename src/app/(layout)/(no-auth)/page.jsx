'use client'
import { useUser } from '@/context/Context'
import { onAuth, signInWithEmail, writeUserData, removeData } from '@/firebase/utils'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Slider from '@/components/Slider'
import SliderTestimonios from '@/components/SliderTestimonios'
import Section from '@/components/Section'
import { glosario } from '@/db'
import Footer from '@/components/Footer'
import TextMaquina from '@/components/TextMaquina'
import TextMaquina2 from '@/components/TextMaquina2'
import { useRouter, usePathname } from 'next/navigation';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
import 'react-awesome-slider/dist/styles.css';
import InputEspecial from '@/components/InputEspecial'
import QRscanner from '@/components/QRscanner'
import { QRreaderUtils } from '@/utils/QRreader'
import InputFlotante from '@/components/InputFlotante'
import { generateUUID } from '@/utils/UIDgenerator'
import SelectSimple from '@/components/SelectSimple'
import MiniTarjeta from '@/components/MiniTarjeta'
import mercancias from '@/db/mercancias.json'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import dynamic from 'next/dynamic'
import { equipoDB, mercanciaDB, tipoDeUnidadDB } from '@/db/arrDB'
import { Translator, getTranslation } from '@miracleufo/react-g-translator';
import parse from 'html-react-parser';

import { useHash } from '@/HOCs/useHash';


const InvoicePDF = dynamic(() => import("@/components/CotizacionPDF"), {
  ssr: false,
});

export default function Home() {
  const { user, introVideo, userDB, selectValue, setSelectValue, setUserProfile, languaje, modal, setModal, setUserSuccess, calcValueFCL, setCalcValueFCL, calcValue, setCalcValue, element, setElement, naviera, setNaviera, success, setUserData, postsIMG, setUserPostsIMG, nav, cliente, setCliente, focus, setFocus, seeMore, setSeeMore } = useUser()


  const [code, setCode] = useState('')
  const hash = useHash();

  // const [hash, sethash] = useState('')

  const pathname = usePathname()

  const router = useRouter()
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  const inputRef = useRef('')
  const inputRef2 = useRef('')


  const redirectHandlerWindow = (ref) => {
    window.open(ref, '_blank')
  }


  function handlerClickSelect2(e) {
    setSelectValue({ ...selectValue, SERVICIO: e })

  }
  function handlerOnChangeQR(e) {
    QRreaderUtils(e, setCode)

  }

  async function HandlerCheckOut2() {
    const db = Object.entries({ ORIGEN: inputRef.current.value, DESTINO: inputRef2.current.value, ...selectValue }).reverse().reduce((acc, i, index) => {
      const data = `${i[0]}: ${i[1]}\n`
      return data + '\r\n' + acc
    }, ``)

    var whatsappMessage = "SOLICITUD DE SERVICIO" + "\r\n\r\n" + db
    whatsappMessage = window.encodeURIComponent(whatsappMessage)
    console.log(whatsappMessage)
    // window.open(`https://api.whatsapp.com/send?phone=${perfil.whatsapp.replaceAll(' ', '')}&text=${whatsappMessage}`, '_blank')
    window.open(`https://api.whatsapp.com/send?phone=+59169941749&text=${whatsappMessage}`, '_blank')

  }

  function handlerOnChange(e) {
    e.stopPropagation();
    setSelectValue({ ...selectValue, [e.target.name]: e.target.value })

  }

  function reset() {
    setFocus('')
  }

  function handlerSelect(i) {
    inputRef.current.value = i
    inputRef2.current.value = ''

    setFocus('')
  }
  function handlerSelect2(i) {
    inputRef2.current.value = i
    setFocus('')
  }


  function handlerClickSelect(name, i, uuid) {
    let db = { [name]: i }
    setSelectValue({ ...selectValue, ...db })
  }


  function write() {
    writeUserData('Cliente/comisionFTL', {
      [generateUUID()]: {
        de: 1,
        hasta: 1000,
        monto: 20,
      },
      [generateUUID()]: {
        de: 1001,
        hasta: 10000,
        monto: '2%,'
      },
      [generateUUID()]: {
        de: 10001,
        hasta: 20000,
        monto: '1.50%',
      },
      [generateUUID()]: {
        de: 20001,
        hasta: 30000,
        monto: '1.25%',
      },
      [generateUUID()]: {
        de: 30001,
        hasta: 50000,
        monto: '1%',
      },
      [generateUUID()]: {
        de: 50001,
        hasta: 100000,
        monto: '0.75%',
      },
      [generateUUID()]: {
        de: 100001,
        hasta: 1000000000000,
        monto: '0.50%',
      },
    }
    )
  }
  function calculator(e) {
    e.preventDefault()

    if (user === null || user === undefined) {
      router.push('/Login')
      return
    }
    preValidate() ? handlerElement('FTL') : HandlerCheckOut2()

    let val = Object.values(cliente.priceFTL).find((i) => {
      return i.ORIGEN === inputRef.current.value && i.DESTINO === inputRef2.current.value && i.MERCANCIA === selectValue.MERCANCIA && i['PESO (KG)'] >= selectValue['PESO (KG)'] && i.SERVICIO === selectValue.SERVICIO && i['TIPO DE UNIDAD'] === selectValue['TIPO DE UNIDAD'] && i['VOLUMEN M3'] >= selectValue['VOLUMEN M3']
    })
    val !== undefined ? setCalcValue({ ...val, ['PESO (KG)']: selectValue['PESO (KG)'], ['VOLUMEN M3']: selectValue['VOLUMEN M3'], TOTAL: val['SERVICIOS LOGISTICOS USD'] * 1 + val['FLETE USD'] * 1 }) : setUserSuccess('NO DATA')




  }
  function calculatorFCL(e) {
    e.preventDefault()
    if (user === null || user === undefined) {
      router.push('/Login')
      return
    }

    inputRef.current && Object.values(cliente.priceFCL).filter((i) => i.ORIGEN === inputRef.current.value && i.DESTINO === inputRef2.current.value).map((i) => i.EQUIPO).filter(onlyUnique) && Object.values(cliente.priceFCL).filter((i) => i.ORIGEN === inputRef.current.value && i.DESTINO === inputRef2.current.value).map((i) => i.EQUIPO).filter(onlyUnique).length > 0
      ? handlerElement('FCL')
      : HandlerCheckOut2()




    let val = Object.values(cliente.priceFCL).filter((i) => {
      return i.ORIGEN === inputRef.current.value && i.DESTINO === inputRef2.current.value
    })
    if (val !== undefined) {
      setCalcValueFCL(val)
      //   const res = await fetch('/FCL', {
      //     method: 'POST',
      //     headers: {
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(data)
      // })
      // console.log(res)
    } {
      setUserSuccess('NO DATA')
    }
  }
  function handlerSeeMore(key) {
    seeMore === key ? setSeeMore('') : setSeeMore(key)
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  function onChangeHandler(e) {
    setCode(e.target.value)

  }
  function filterTracking(e) {
    e.preventDefault()

    if (userDB) {
      router.push(`/Tracking?item=${code}`)
    } else {
      setModal('REGISTRATE')
    }
  }
  function handlerElement(data) {
    if (userDB) {
      setElement(data)
    } else {
      setModal('REGISTRATE')
    }
  }

  // async function getTranslate() {
  //   const res = await fetch("/api/translate");
  //   return console.log(await res.json());
  // }
  const Tarjetas = [
    {
      ip: '400+',
      ic: 'Alumnos'
    },
    {
      ip: '+5 años',
      ic: 'Experiencia Docente'
    },
    {
      ip: '400 +',
      ic: 'Alumnos'
    },
    {
      ip: '400 +',
      ic: 'Alumnos'
    }
  ]


  function preValidate() {
    if (inputRef.current && inputRef2.current && selectValue.MERCANCIA && selectValue['PESO (KG)'] && selectValue.SERVICIO && selectValue['TIPO DE UNIDAD'] && selectValue['VOLUMEN M3']) {
      let val = Object.values(cliente.priceFTL).find((i) => {
        return i.ORIGEN === inputRef.current.value && i.DESTINO === inputRef2.current.value && i.MERCANCIA === selectValue.MERCANCIA && i['PESO (KG)'] >= selectValue['PESO (KG)'] && i.SERVICIO === selectValue.SERVICIO && i['TIPO DE UNIDAD'] === selectValue['TIPO DE UNIDAD'] && i['VOLUMEN M3'] >= selectValue['VOLUMEN M3']
      })
      return val
    }
  }

  // console.log(hash)
  useEffect(() => {
    // const section = hash.replace("#", "");
    // if (section) scrollToSection(section);
  }, [hash, languaje]);

  return (
    <main className={`relative  w-screen `} onClick={reset} id='inicio'>
      <div className='absolute top-0 justify-space-between'>
        <div id='Tracking'></div>
        <div id='FTL'></div>
        <div id='FCL'></div>
      </div>

      <section className='relative ' >
        {/* <img src="/background.png" className='fixed bottom-0 w-full h-[100vh] pb-[10px] object-cover object-bottom ' alt="" /> */}
        {/* <video className='fixed bottom-0 w-full h-[100vh] pb-[10px] object-cover object-bottom ' autoPlay loop muted playsInline>
          <source src={'/bg.mp4'} type="video/mp4" />
        </video> */}
        {/* <video className='fixed bottom-0 w-full h-[100vh] pb-[10px] object-cover object-bottom ' autoPlay loop muted playsInline>
          <source src={cliente.inicio.url} type="video/mp4" />
        </video> */}
        <div className='absolute top-0  w-full min-h-[100vh] h-full object-cover z-10  '></div>

        <div className='relative min-h-[100vh] h-auto   w-full lg:pt-[70px] pb-0 flex flex-col justify-center lg:flex-row items-center lg:justify-around  z-20' style={{ background: '-gradient(to bottom, #000000,  #000000c7, #00000050' }}>
          <img src={cliente?.inicio?.url ? cliente?.inicio?.url: ''} className=' relative my-[70px] inline-block w-[80vw] h-[80vw]    lg:w-[35vw] lg:h-[70vh]  object-contain object-center ' />
          <div className='relative  w-[95%] lg:w-[40%] bg-[#111a3396] lg:bg-[#111a33d0] p-10 lg:p-5 '>

            <div className='   font-bold'>
              {languaje === 'Español' ? <TextMaquina /> : <TextMaquina2 />}
            </div>


            <br />
            <div className='grid grid-cols-2 gap-2 w-full '>
              {/* <button onClick={write}>Click</button> */}
              <Link type="button" href='#cursos' className="w-full border-[2px]   text-gray-900 bg-[#ffd900] hover:bg-[#ffd900]/90 focus:ring-4 focus:outline-none focus:ring-[#ffd900]/50 font-medium rounded-lg text-[12px] px-5 py-2.5 text-center inline-flex items-center ">
                {languaje === 'Español' ? 'Ver Cursos' : 'Glossary'}
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
              <button type="button" onClick={() => redirectHandlerWindow(`https://api.whatsapp.com/send?phone=${cliente.contactos.celular.replaceAll(' ', '')}&text=hola%20Logistics%20Gear`)} className="w-full border-[2px]  text-black bg-[#24cfb8]  focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-[12px] px-5 py-2.5 text-center inline-flex items-center ">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.0508 2.91006C16.134 1.98399 15.042 1.24973 13.8384 0.750111C12.6349 0.250494 11.3439 -0.00448012 10.0408 5.95696e-05C4.58078 5.95696e-05 0.130781 4.45006 0.130781 9.91006C0.130781 11.6601 0.590781 13.3601 1.45078 14.8601L0.0507812 20.0001L5.30078 18.6201C6.75078 19.4101 8.38078 19.8301 10.0408 19.8301C15.5008 19.8301 19.9508 15.3801 19.9508 9.92006C19.9508 7.27006 18.9208 4.78006 17.0508 2.91006ZM10.0408 18.1501C8.56078 18.1501 7.11078 17.7501 5.84078 17.0001L5.54078 16.8201L2.42078 17.6401L3.25078 14.6001L3.05078 14.2901C2.22853 12.977 1.79192 11.4593 1.79078 9.91006C1.79078 5.37006 5.49078 1.67006 10.0308 1.67006C12.2308 1.67006 14.3008 2.53006 15.8508 4.09006C16.6183 4.85402 17.2265 5.76272 17.6402 6.76348C18.0539 7.76425 18.2648 8.83717 18.2608 9.92006C18.2808 14.4601 14.5808 18.1501 10.0408 18.1501ZM14.5608 11.9901C14.3108 11.8701 13.0908 11.2701 12.8708 11.1801C12.6408 11.1001 12.4808 11.0601 12.3108 11.3001C12.1408 11.5501 11.6708 12.1101 11.5308 12.2701C11.3908 12.4401 11.2408 12.4601 10.9908 12.3301C10.7408 12.2101 9.94078 11.9401 9.00078 11.1001C8.26078 10.4401 7.77078 9.63006 7.62078 9.38006C7.48078 9.13006 7.60078 9.00006 7.73078 8.87006C7.84078 8.76006 7.98078 8.58006 8.10078 8.44006C8.22078 8.30006 8.27078 8.19006 8.35078 8.03006C8.43078 7.86006 8.39078 7.72006 8.33078 7.60006C8.27078 7.48006 7.77078 6.26006 7.57078 5.76006C7.37078 5.28006 7.16078 5.34006 7.01078 5.33006H6.53078C6.36078 5.33006 6.10078 5.39006 5.87078 5.64006C5.65078 5.89006 5.01078 6.49006 5.01078 7.71006C5.01078 8.93006 5.90078 10.1101 6.02078 10.2701C6.14078 10.4401 7.77078 12.9401 10.2508 14.0101C10.8408 14.2701 11.3008 14.4201 11.6608 14.5301C12.2508 14.7201 12.7908 14.6901 13.2208 14.6301C13.7008 14.5601 14.6908 14.0301 14.8908 13.4501C15.1008 12.8701 15.1008 12.3801 15.0308 12.2701C14.9608 12.1601 14.8108 12.1101 14.5608 11.9901Z" fill="black" />
                </svg>
                <span className='pl-5'> {languaje === 'Español' ? 'Contactar' : 'Contact'}</span>
              </button>
            </div>
            <br />
            <div className='relative bg-[#ffffff] rounded-[10px] p-5 z-30' >
              <ScrollAnimation animateIn='bounceInRight'
                animateOut='bounceOutLeft'
                initiallyVisible={true}
              >
                <h3 className='text-[20px] text-center font-medium  py-5'>{cliente?.inicio?.titulo}</h3>
              </ScrollAnimation>


              <ScrollAnimation animateIn='bounceInRight'
                animateOut='bounceOutLeft'
                initiallyVisible={true}
              >

                <p className=' text-[16px]  ql-editor'>
                  {/* <Translator from='es' to={languaje.slice(0, 2).toLowerCase()}> */}
                  {cliente?.inicio?.content && parse(cliente.inicio.content)}
                  {/* </Translator> */}
                </p>
              </ScrollAnimation>

            </div>
            <marquee className="text-white py-5" behavior="" direction="">
              <a href={`tel:${cliente.contactos.telefono}`} className='inline-block w-[100%]'>
                {languaje === 'Español'
                  ? 'Llamanos clickea aqui'
                  : 'Call us click here'}
                <button className='border px-5 ml-5  rounded-full bg-[#00000070]' >{cliente.contactos.telefono}</button>
              </a>
              {/* <span className='inline-block  w-[100%]'>
                Trabaja con nosotros <button className='border px-5 ml-5 text-white rounded-full bg-[#00000070]' onClick={() => router.push('/Postulaciones')}>Postula aqui</button>
              </span> */}
            </marquee>


          </div>
        </div>
      </section>

      <section className='relative w-full z-1000 overflow-x-hidden' id="acerca">

        <div className='relative px-5 py-12 w-full flex flex-col  lg:grid lg:grid-cols-2 justify-around items-center     bg-gradient-to-tr from-[#3e3f52dc] via-[#06102bdc] to-[#323147dc]  ' id='Nosotros'>
          <div>

            <Subtitle><h3 className='text-[30px] text-[white] text-center font-medium  py-5'>{cliente.acerca.titulo}</h3></Subtitle>
            <ScrollAnimation animateIn='bounceInRight'
              animateOut='bounceOutLeft'
              initiallyVisible={true}
            >
              <p className=' text-[16px] text-[white] ql-editor'>
                {/* <Translator from='es' to={languaje.slice(0, 2).toLowerCase()}> */}
                {cliente?.acerca?.content && parse(cliente.acerca.content)}
                {/* </Translator> */}
              </p>
            </ScrollAnimation>

          </div>
          <div className='w-full text-[white] grid grid-cols-2 gap-5 py-12'>
            {cliente?.acerca?.miniTarjetas && cliente.acerca.miniTarjetas !== undefined && Object.values(cliente.acerca.miniTarjetas).map((i, index) => <MiniTarjeta e1={i[`ip`]} e2={i[`ic`]} />)}
          </div>

          {/* <div className='relative block  md:grid md:grid-cols-2 w-[100%] mt-5 ' style={{ with: '100%' }}>


            <ScrollAnimation animateIn='bounceInRight'>

              <button type="button" onClick={() => handlerSeeMore('PORQUE')} className="relative w-full border-[2px] md:min-w-[300px] md:max-w-[300px] text-black bg-[#24cfb8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-[#ffd900]/50 rounded-lg text-[12px] px-5 py-2.5 text-center inline-flex items-center my-2">
                {languaje === 'Español'
                  ? '¿POR QUE ELEGIRNOS? saber'
                  : 'WHY CHOOSE US? know'} {seeMore === 'PORQUE' ? 'menos' : 'mas'}...
                <span className={seeMore === 'PORQUE'
                  ? 'absolute right-5 rotate-[270deg]'
                  : 'absolute right-5 rotate-90'}>{'>'}</span>

              </button>

            </ScrollAnimation>

            <div className={`col-span-2 text-center transition-all w-[100%] ${seeMore === 'PORQUE' ? 'h-auto py-5' : 'h-0'} text-[14px] overflow-hidden text-white lg:hidden`} id='PorQueElegirnos'>

              <h4 className='text-[26px] text-center font-bold text-[#ffd900]  py-5' >{languaje === 'Español' ? '¿POR QUE ELEGIRNOS?' : 'WHY CHOOSE US?'}</h4>
              <p className='text-left '>
                {languaje === 'Español'
                  ? '•	Nuestro servicio está orientado a estándares de calidad, estamos comprometidos a darle una atención personalizada y crear soluciones logísticas inteligentes de acuerdo a cada negocio.'
                  : 'SERVICE'}
              </p>
              <p className='text-left '>
                {languaje === 'Español'
                  ? '•	Sabemos la responsabilidad que conlleva nuestro servicio por lo cual cada que se nos asigna una operación la llevamos a cabo con un riguroso control para optimizar los recursos a utilizar.'
                  : '•	We know the responsibility that our service entails, which is why every time we are assigned an operation we carry it out with rigorous control to optimize the resources to be used.'}
              </p>
            </div>

            <ScrollAnimation animateIn='bounceInRight'>

              <button type="button" onClick={() => handlerSeeMore('MISION')} className="relative w-full border-[2px] md:min-w-[300px] md:max-w-[300px] text-gray-900 bg-[#ffd900] hover:bg-[#ffd900]/90 focus:ring-4 focus:outline-none focus:ring-[#ffd900]/50 font-medium rounded-lg text-[12px] px-5 py-2.5 text-center inline-flex items-center mt-[20px] lg:mt-2 my-2">
                {languaje === 'Español'
                  ? 'MISIÓN y VISIÓN saber'
                  : 'MISSION and VISION know'}{seeMore === 'MISION' ? 'menos' : 'mas'}...
                <span className={seeMore === 'MISION' ? 'absolute right-5 rotate-[270deg]' : 'absolute right-5 rotate-90'}>{'>'}</span>

              </button>

            </ScrollAnimation>


          </div> 


          <div className={`col-span-2 text-center transition-all md:grid grid-cols-2 ${seeMore === 'MISION' ? 'h-auto py-5' : 'h-0'} text-[14px] overflow-hidden text-white`}>



            <div className='md:px-[20px] text-[16px]'>
              <h4 className='text-[26px] text-center font-bold text-[#ffd900]  py-5'>{languaje === 'Español' ? 'SERVICIO' : 'SERVICE'}MISION</h4>
              {languaje === 'Español'
                ? 'Nuestra misión es integrarnos en la cadena de suministro de nuestros clientes como un aliado estratégico, optimizando y cuidando cada proceso para garantizar la máxima eficiencia. Nos comprometemos a simplificar la logística de tal manera que nuestros clientes puedan enfocarse en su negocio principal, asegurando al mismo tiempo una reducción significativa de costos. En Logistics Gear, no solo transportamos mercancías; facilitamos soluciones logísticas integrales que aceleran el éxito de nuestros clientes.'
                : 'Our mission is to integrate into our clients supply chain as a strategic ally, optimizing and taking care of each process to guarantee maximum efficiency. We are committed to simplifying logistics so that our clients can focus on their core business, while ensuring significant cost reduction. At Logistics Gear, we dont just transport goods; We provide comprehensive logistics solutions that accelerate the success of our clients.'}


            </div>
            <div className='md:px-[20px]  text-[16px]'>
              <h4 className='text-[26px] text-center font-bold text-[#ffd900] py-5'>{languaje === 'Español' ? 'SERVICIO' : 'SERVICE'}VISION</h4>
              {languaje === 'Español'
                ? 'Nuestra visión es consolidarnos como el referente indiscutible en el sector logístico, ganándonos la confianza plena de nuestros clientes a través de la excelencia, innovación y un servicio impecable. Aspiramos a ser reconocidos por nuestra capacidad de superar expectativas, adaptarnos a los cambios del mercado con agilidad y liderar el camino hacia un futuro donde la eficiencia logística y la sostenibilidad van de la mano. En Logistics Gear, nos comprometemos a ser sinónimo de confiabilidad y calidad, estableciendo nuevos estándares en la industria y expandiendo nuestra presencia global para conectar aún más el mundo con nuestros servicios.'
                : 'SERVOur vision is to consolidate ourselves as the undisputed benchmark in the logistics sector, earning the full trust of our clients through excellence, innovation and impeccable service. We aspire to be recognized for our ability to exceed expectations, adapt to market changes with agility and lead the way towards a future where logistics efficiency and sustainability go hand in hand. At Logistics Gear, we are committed to being synonymous with reliability and quality, setting new standards in the industry and expanding our global presence to further connect the world with our services.ICE'}
            </div>
          </div>
          <div className={`col-span-2 text-center transition-all w-[50%] ${seeMore === 'PORQUE' ? 'h-auto py-5' : 'h-0'} text-[14px] overflow-hidden text-white hidden lg:block `} id='PorQueElegirnos'>

            <h4 className='text-[26px] text-center font-bold text-[#ffd900]  py-5' >¿POR QUE ELEGIRNOS?</h4>
            <p className='text-left '>
              {languaje === 'Español'
                ? '•	Nuestro servicio está orientado a estándares de calidad, estamos comprometidos a darle una atención personalizada y crear soluciones logísticas inteligentes de acuerdo a cada negocio.'
                : 'SERVICE'}
            </p>
            <p className='text-left '>
              {languaje === 'Español'
                ? '•	Sabemos la responsabilidad que conlleva nuestro servicio por lo cual cada que se nos asigna una operación la llevamos a cabo con un riguroso control para optimizar los recursos a utilizar.'
                : 'SERVICE'}
            </p>
          </div>
*/}
        </div>
        {cliente.Slider1 && <div className='relative   pb-[0px] lg:pb-0 bg-gradient-to-t from-[#00195cdc] via-[#7f7f80b6] to-[#00195cdc] '


        // style={{
        //   backgroundColor: '#011B68',
        //   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23011B68'/%3E%3Cstop offset='1' stop-color='%232A3168'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='9' height='9' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23909090' cx='4.5' cy='4.5' r='4.5'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.1'/%3E%3C/svg%3E")`,
        //   // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(12,683,325)'%3E%3Cstop offset='0' stop-color='%23011B68'/%3E%3Cstop offset='1' stop-color='%231B2E68'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='300' height='250' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.09'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E")`,
        //   backgroundAttachment: 'fixed',
        //   backgroundSize: 'cover',
        // }}
        >

          <h1 className='text-center font-bold text-[25px] py-[50px] text-white '>{languaje === 'Español' ? 'Clientes Satisfechos' : 'Satisfied customers'}</h1>
          <Slider content={Object.values(cliente.Slider1)} />
        </div>}
      </section>











      {cliente['cursos'] && <Section
        subtitle={cliente['cursos'].titulo} subtitleEN={cliente['cursos'].tituloEN}
        description={cliente['cursos'].content} descriptionEN={cliente['cursos'].contentEN}
        video={cliente['cursos'].url} degrade='#00000067' tarjetas={cliente['cursos'].tarjetas} miniTarjetas={cliente['cursos'].miniTarjetas} id={'cursos'}></Section>}

      {cliente['resursos'] && <Section
        subtitle={cliente['resursos'].titulo} subtitleEN={cliente['resursos'].tituloEN}
        description={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid molestiae, numquam, sit officia quidem quasi placeat deserunt voluptate illum provident quas recusandae, quia velit fugit laboriosam animi tenetur repudiandae! Quaerat.'} descriptionEN={cliente['resursos'].contentEN}
        video={cliente['resursos'].url} degrade='#00000067' tarjetas={cliente['resursos'].tarjetas} miniTarjetas={cliente['resursos'].miniTarjetas} id={'resursos'}></Section>}

      {/*    {cliente['aereo'] && <Section
        subtitle={cliente['aereo'].titulo} subtitleEN={cliente['aereo'].tituloEN}
        description={cliente['aereo'].content} descriptionEN={cliente['aereo'].contentEN}
        video={cliente['aereo'].url} degrade='#00000067' tarjetas={cliente['aereo'].tarjetas} miniTarjetas={cliente['aereo'].miniTarjetas} id={'aereo'}></Section>}

      {cliente['despachos'] && <Section
        subtitle={cliente['despachos'].titulo} subtitleEN={cliente['despachos'].tituloEN}
        description={cliente['despachos'].content} descriptionEN={cliente['despachos'].contentEN}
        video={cliente['despachos'].url} degrade='#00000067' tarjetas={cliente['despachos'].tarjetas} miniTarjetas={cliente['despachos'].miniTarjetas} id={'despachos'}></Section>}

      {cliente['proyecto'] && <Section
        subtitle={cliente['proyecto'].titulo} subtitleEN={cliente['proyecto'].tituloEN}
        description={cliente['proyecto'].content} descriptionEN={cliente['proyecto'].contentEN}
        video={cliente['proyecto'].url} degrade='#00000067' tarjetas={cliente['proyecto'].tarjetas} miniTarjetas={cliente['proyecto'].miniTarjetas} id={'proyecto'}></Section>}

      {cliente['exportaciones'] && <Section
        subtitle={cliente['exportaciones'].titulo} subtitleEN={cliente['exportaciones'].tituloEN}
        description={cliente['exportaciones'].content} descriptionEN={cliente['exportaciones'].contentEN}
        video={cliente['exportaciones'].url} degrade='#00000067' tarjetas={cliente['exportaciones'].tarjetas} miniTarjetas={cliente['exportaciones'].miniTarjetas} id={'exportaciones'}></Section>}

      {cliente['farmaceutico'] && <Section
        subtitle={cliente['farmaceutico'].titulo} subtitleEN={cliente['farmaceutico'].tituloEN}
        description={cliente['farmaceutico'].content} descriptionEN={cliente['farmaceutico'].contentEN}
        video={cliente['farmaceutico'].url} degrade='#00000067' tarjetas={cliente['farmaceutico'].tarjetas} miniTarjetas={cliente['farmaceutico'].miniTarjetas} id={'farmaceutico'}></Section>}
 */}


      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quibusdam necessitatibus in explicabo odit temporibus vero error quisquam ex et soluta voluptatibus, perspiciatis inventore ipsam optio quaerat amet nesciunt quasi? */}



      <div className='relative  bg-gradient-to-tr from-[#3e3f52dc] via-[#06102bdc] to-[#323147dc] ' id='testimonios'>
        {cliente.Testimonios && <>
          <h1 className='text-center font-bold text-[25px] py-[50px] text-white z-50' id='testimonios'>Testimonios</h1>
          <SliderTestimonios content={Object.values(cliente.Testimonios)} />
        </>}

      </div>







      {/* {cliente['solucionesIT'] && <Section
        subtitle={cliente['solucionesIT'].titulo} subtitleEN={cliente['solucionesIT'].tituloEN}
        description={cliente['solucionesIT'].content} descriptionEN={cliente['solucionesIT'].contentEN}
        video={cliente['solucionesIT'].url} degrade='#00000067' tarjetas={cliente['solucionesIT'].tarjetas} miniTarjetas={cliente['solucionesIT'].miniTarjetas} id={'solucionesIT'}  especial={true}></Section>} */}

      {/* {cliente['experiencia'] && <Section
        subtitle={cliente['experiencia'].titulo} subtitleEN={cliente['experiencia'].tituloEN}
        description={cliente['experiencia'].content} descriptionEN={cliente['experiencia'].contentEN}
        video={cliente['experiencia'].url} degrade='#00000067' tarjetas={cliente['experiencia'].tarjetas} miniTarjetas={cliente['experiencia'].miniTarjetas} id={'experiencia'} especial={true}></Section>} */}

      {/* <div className='relative  h-[100vh] md:h-[80vh] bg-gradient-to-t py-[20vh] md:py-[10vh] from-[#00195cdc] via-[#293f79d3] to-[#00195cdc]'> */}
      {/* <div className='relative  h-[100vh] md:h-[80vh] bg-gradient-to-t py-[20vh] md:py-[10vh] from-[#00195c] via-[#293e79] to-[#00195c]'> */}



      {/* {cliente.Slider1 && <>
          <h1 className='text-center font-bold text-[25px] py-[50px] text-white'>Testimonios</h1>
          <SliderTestimonios content={Object.values(cliente.Testimonios)} />
        </>} */}
      {/* {cliente.Slider1 && <div className='relative  bg-[#384C94] '>
            <h1 className='text-center font-bold text-[25px] py-[50px] text-white '>Nuestros Clientes</h1>
            <Slider content={Object.values(cliente.Slider1)} />
          </div>}

          {cliente.Slider2 && <div className='relative '>
            <h1 className='text-center font-bold text-[25px] py-[50px] text-white'>Socios  Comerciales</h1>
            <Slider content={Object.values(cliente.Slider2)} />
          </div>}

          {cliente.Slider3 && <div className='relative '>
            <h1 className='text-center font-bold text-[25px] py-[50px] text-white'>Empresas</h1>
            <Slider content={Object.values(cliente.Slider3)} />
          </div>} */}

      {/* <div className='w-full flex flex-col justify-center items-center relative '>
            <h1 className='text-center font-bold text-[25px] py-[50px] text-white'>Postula y trabaja  con nosotros</h1>
            <Button theme='Primary' click={() => router.push('/Postulaciones')}>Postular</Button>
          </div> */}




      {/* </div> */}

      <Footer></Footer>




    </main>

  )
}




