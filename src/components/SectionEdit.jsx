'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail, writeUserData, removeData, getSpecificData } from '@/firebase/utils'
import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import Button from '@/components/Button'
import "animate.css/animate.compat.css"
import TextEditor from '@/components/TextEditor'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';

export default function Home({image, textMaquina}) {

    const { user, introVideo, userDB, option, setOption, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const [textEditor, setTextEditor] = useState(undefined)
    const [textEditor2, setTextEditor2] = useState(undefined)
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})

    function onChangeHandler(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    function saveFrontPage(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        writeUserData(`/Cliente/${query}`, { ...data, content: textEditor }, setUserSuccess)
    }

    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente])


    useEffect(() => {

        if (textEditor == undefined && cliente && cliente[query] && cliente[query] && cliente[query].content) {
            console.log('text')
            setTextEditor(cliente[query].content)
        }
        if (textEditor == undefined && cliente && cliente[query] && cliente[query] && cliente[query].contentEN) {
            console.log('text')
            setTextEditor2(cliente[query].contentEN)
        }
    }, [textEditor, textEditor2, query, option, cliente, success])

    return (
        option === 'Seccion' && <form className="relative  pt-5" onSubmit={saveFrontPage} >
            <div className="col-span-full">
                <h2 className="text-base font-bold leading-7 text-gray-900  text-center p-5 ">ADMINISTRAR SECCIONES</h2>
                {/* <div className='flex justify-center p-5'>
                    <Suspense >
                        <video src={data && data.url && data.url ? data.url : (cliente && cliente[query] && cliente[query].url)} className='h-[300px]' autoPlay loop muted playsInline ></video>
                    </Suspense >
                </div> */}
            </div>








{
           image== true && <div className="w-full flex justify-center">
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 md:w-[250px] md:h-[200px]"
                    style={{
                        backgroundImage: `url(${data[`url`] ? data[`url`] : cliente && cliente[query] && cliente[query].url})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="text-center flex flex-col justify-center">
                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                        </svg>

                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF</p>
                    </div>
                </div>
            </div>}





            {image== true && <div className="sm:col-span-3 pb-7">
                <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Subir Perfil por URL</label>
                <input type="text" name="url" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].url} />
            </div>}

            {textMaquina== true && <div className="sm:col-span-3 pb-7">
                <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Texto Dinamico 1</label>
                <input type="text" name="textMaquina 1" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query]['textMaquina 1']} />
            </div>}
            {textMaquina== true && <div className="sm:col-span-3 pb-7">
                <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Texto Dinamico 2</label>
                <input type="text" name="textMaquina 2" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query]['textMaquina 2']} />
            </div>}
            {textMaquina== true && <div className="sm:col-span-3 pb-7">
                <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Texto Dinamico 3</label>
                <input type="text" name="textMaquina 3" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query]['textMaquina 3']} />
            </div>}

            <div className="sm:col-span-3 pb-7">
                <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Titulo</label>
                <input type="text" name="titulo" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].titulo} />
            </div>
            {/* <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Titulo (Ingles)</label>
                <input type="text" name="tituloEN" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].tituloEN} />
            </div> */}
            <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-[14px] font-medium leading-6 text-gray-900">Contenido de texto</label>
                        <TextEditor value={textEditor} setValue={setTextEditor} edit={true} ></TextEditor>
                    </div>
                </div>
            </div>
            {/* <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Contenido de texto (Ingles)</label>
                        <TextEditor value={textEditor2} setValue={setTextEditor2} edit={true} ></TextEditor>
                    </div>
                </div>
            </div> */}
            <div className="mt-6 flex items-center justify-center gap-x-6">
                <Button type="submit" theme="Primary">Guardar</Button>
            </div>
        </form>
    )
}

