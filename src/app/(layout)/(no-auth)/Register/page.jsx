'use client'
import { writeUserData, getSpecificData } from '@/firebase/utils'
import { useUser } from '@/context/Context'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { generateUUID } from '@/utils/UIDgenerator'

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import { useRouter } from 'next/navigation';

export default function Home() {

    const { user, cliente, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData } = useUser()
    const router = useRouter()
    const [countries, setCountries] = useState(null)
    const [flag, setFlag] = useState('https://flagcdn.com/w320/bo.png')
    const [state, setState] = useState({})
    const [state2, setState2] = useState({})
    const [query, setQuery] = useState('')

    const [pais, setPais] = useState('Estado Plurinacional de Bolivia')
    const [uuid, setUuid] = useState('non exist')
    const [pais2, setPais2] = useState({
        "translations": {
            "spa": {
                "official": "Estado Plurinacional de Bolivia",
                "common": "Bolivia"
            },
        },
        "flags": {
            "png": "https://flagcdn.com/w320/bo.png",
        },
    })
    const [paso, setPaso] = useState(1)
    const changeHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const changeHandler2 = (e) => {
        setState2({ ...state2, [e.target.name]: e.target.value })
    }
    const onClickHandlerCountry = (name, value) => {
        setPais(value.translations.spa.official)
        setPais2(value)
        setFlag(value.flags.png)
    }
    const registerHandler = (e) => {
        e.preventDefault()
        let uuid = generateUUID()
        writeUserData(`Users/${uuid}`, { rol: 'Alumno', uuid, flag, pais, curso: cliente.cursos.tarjetas[query].title, cursoUUID: query, ...state }, setUserSuccess)
        setUuid(uuid)
        setPaso(2)

    }



    const registerHandler2 = (e) => {
        e.preventDefault()
        writeUserData(`Users/${uuid}`, state2, setUserSuccess)
        setUuid(uuid)
        setPaso(3)

    }

    const getContries = async (e) => {
        const res = await fetch('https://restcountries.com/v3.1/all')
        const data = await res.json()
        setCountries(data)

    }
    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente])

    return (
        <div className="min-h-full "
        // style={{
        //     backgroundImage: 'url(/bg-2.jpg)',
        //     backgroundRepeat: 'no-repeat',
        //     backgroundPosition: '50% 50%',
        //     backgroundAttachment: 'fixed',
        //     backgroundSize: 'cover'
        // }}
        >
            {/* <Video /> */}
            <div className='w-screen min-h-screen py-[100px] flex flex-col justify-center items-center'>


                {/* <img src="/airplane-bg.jpg" className='absolute  w-screen h-screen  object-cover ' alt="" /> */}

                <div className={`space-y-6 lg:space-y-3   bg-[rgba(0,6,24,0.71)] rounded-[10px] w-[100%] max-w-[400px] lg:max-w-[800px] p-5 h-auto px-5 py-10 lg:p-10 z-10 lg:scale-110`}  >
                    <h3 className='text-white text-center uppercase py-7'>
                        CURSO:  {cliente && cliente.cursos.tarjetas[query] && cliente.cursos.tarjetas[query].title}
                    </h3>
                    <div className='border-b flex space-x-5 pb-5 '>
                        <h5 className={`text-[18px] text-center  font-medium flex items-center pr-5 ${paso === 1 ? 'text-white' : 'text-[#ffffff52]'}`}>
                            <span className={`rounded-full text-black w-[50px] h-[50px] flex justify-center items-center mr-5  ${paso === 1 ? ' bg-slate-200 ' : 'bg-[#ffffff52]'} `}>1</span>
                            <span className={paso === 1 ? 'text-white' : 'text-[#ffffff52] hidden md:inline-block'}>
                                Registro
                            </span>
                        </h5>
                        <h5 className={`text-[18px] text-center  font-medium flex items-center pr-5 ${paso === 2 ? 'text-white' : 'text-[#ffffff52]'}`}>
                            <span className={`rounded-full text-black w-[50px] h-[50px] flex justify-center items-center mr-5  ${paso === 2 ? ' bg-slate-200 ' : 'bg-[#ffffff52]'} `}>2</span>
                            <span className={paso === 2 ? 'text-white' : 'text-[#ffffff52] hidden md:inline-block'}>
                                Matricula
                            </span>
                        </h5>
                        <h5 className={`text-[18px] text-center  font-medium flex items-center pr-5 ${paso === 3 ? 'text-white' : 'text-[#ffffff52]'}`}>
                            <span className={`rounded-full text-black w-[50px] h-[50px] flex justify-center items-center mr-5  ${paso === 3 ? ' bg-slate-200 ' : 'bg-[#ffffff52]'} `}>3</span>
                            <span className={paso === 3 ? 'text-white' : 'text-[#ffffff52] hidden md:inline-block'}>
                                Link de clase

                            </span>
                        </h5>
                    </div>

                    <br />
                    {paso === 1 && <form className='space-y-4p-5  rounded-[10px] lg:space-y-2 grid sm:grid-cols-2 gap-10 ' onSubmit={registerHandler} >
                        <div>
                            <label htmlFor="nombre" className="block mb-2 text-[16px] text-left font-medium text-white">Nombre Completo</label>
                            <Input type="text" name="nombre" onChange={changeHandler} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                        </div>
                        <div>
                            <label htmlFor="pais" className="block mb-2 text-[16px] text-left  font-medium text-white">Pais</label>
                            <Select arr={countries ? countries : []} name='Ciudad' click={onClickHandlerCountry} defaultValue={pais2 ? pais2 : 'Ninguno'} />
                        </div>
                        <div>
                            <label htmlFor="ciudad" className="block mb-2 text-[16px] text-left font-medium text-white">Ciudad</label>
                            <Input type="text" name="ciudad" onChange={changeHandler} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Email</label>
                            <Input type="email" name="email" onChange={changeHandler} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                        </div>
                        <div>
                            <label htmlFor="whatsapp" className="block mb-2 text-[16px] text-left font-medium text-white">Whatsapp</label>
                            <Input type="text" name="telefono" onChange={changeHandler} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />

                        </div>
                        <div className="flex flex-col items-center md:items-start">
                            <div className="flex items-start pb-5">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <Link href="/Politicas" className="ml-2 text-[14px] font-medium text-gray-100 ">Políticas de Servicio</Link>
                            </div>
                            <Button type="submit" theme="Transparent" >Continuar</Button>
                        </div>
                        <br />
                        {/* <div className="text-[14px] text-center font-medium text-white dark:text-gray-300">Ya tienes una cuenta? <Link href="/" className="text-gray-100 hover:underline">Inicia Sessión</Link >
                        </div> */}
                    </form>}

                    {paso === 2 && <form className='space-y-4p-5  rounded-[10px] lg:space-y-3 grid md:grid-cols-2 gap-10' onSubmit={registerHandler2} >
                        <div>
                            <label htmlFor="nombre tarjeta" className="block mb-2 text-[16px] text-left font-medium text-white">Nombre De La Tarjeta</label>
                            <Input type="text" name="nombre tarjeta" onChange={changeHandler2} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Bisa" required />
                        </div>
                        <div>
                            <label htmlFor="numero tarjeta" className="block mb-2 text-[16px] text-left  font-medium text-white">Numero De La Tarjeta</label>
                            <Input type="text" name="numero tarjeta" onChange={changeHandler2} id="email" placeholder='xxxx-xxxx-xxxx-xxxx' className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div>
                            <label htmlFor="expiracion tarjeta" className="block mb-2 text-[16px] text-left font-medium text-white">Expiración De Terjeta</label>
                            <Input type="text" name="expiracion tarjeta" onChange={changeHandler2} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="24/12" required />
                        </div>
                        <div>
                            <label htmlFor="cvc" className="block mb-2 text-[16px] text-left font-medium text-white">CVC</label>
                            <Input type="number" name="cvc" onChange={changeHandler2} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="123" required />

                        </div>
                        <div className="flex flex-col items-center md:items-start">

                            <Button type="submit" theme="Transparent" >Continuar</Button>
                        </div>
                        <br />
                        {/* <div className="text-[14px] text-center font-medium text-white dark:text-gray-300">Ya tienes una cuenta? <Link href="/" className="text-gray-100 hover:underline">Inicia Sessión</Link >
                        </div> */}
                    </form>}
                    {paso === 3 && cliente && cliente.cursos.tarjetas[query] && <div className='bg-white rounded-[10px]'>
                        <h3 className='text-center p-5 uppercase font-bold'>
                            FELICIDADES ESTAS INSCRITO AL:  <br />
                            CURSO:  {cliente.cursos.tarjetas[query].title} <br />
                        </h3>
                        <p className='ql-editor' dangerouslySetInnerHTML={{ __html: cliente.cursos.tarjetas[query].paragraphEN }}>
                        </p>


                        <p className='font-bold p-5'>*Estos datos Tambien se te enviaron a tu correo</p>

                    </div>}


















                </div>
            </div>
        </div>
    )
}



