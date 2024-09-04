'use client'
import { useUser } from '@/context/Context'
import Slider from '@/components/Slider'
import Button from '@/components/Button'
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const { cliente, languaje, setUserSuccess } = useUser()
  const [email, setEmail] = useState({mensaje: ''})
  const router = useRouter()
  const pathname = usePathname()

  function handlerOnChange(e) {
    setEmail({ ...email, [e.target.name]: e.target.value })
  }
  async function sendEmail(e) {
    e.preventDefault()
    setUserSuccess('Enviando mensaje')
    await fetch(`/api/sendEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email)
    })
    setEmail({ ...email, mensaje: 'MENSAJE ENVIADO, si tienes alguna otra consulta no dudes en escribirnos... 😄' })

    setUserSuccess('')

  }
  return (
    <footer className="relative w-screen  text-center text-white  lg:pb-0 z-20" id="contactos"



    >






      <div className=' bg-gradient-to-tr from-[#3e3f52dc] via-[#06102bdc] to-[#323147dc] '
      // style={{
      //   backgroundColor: '#011B68',
      //   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23011B68'/%3E%3Cstop offset='1' stop-color='%23323268'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%231a2768'/%3E%3Cstop offset='1' stop-color='%23323268'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.1' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      //   backgroundAttachment: 'fixed',
      //   backgroundSize: 'cover',
      // }}
      >


        <div className='overflow-hidden  '>

          <div class="mt-6 mx-auto bg-[#111a33d0] rounded-lg">

            <div class="grid lg:grid-cols-2 items-center gap-14 sm:p-8 p-4 font-[sans-serif]">
              <div>
                <h1 class="text-4xl font-bold text-white">Contactos</h1>
                <br /><br /><br />
                {/* <p class="text-[14px] text-gray-300 mt-4 leading-relaxed">Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project  and provide help.</p> */}

                <ul class="mt-12 space-y-8">
                  <li class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff'
                      viewBox="0 0 479.058 479.058">
                      <path
                        d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                        data-original="#000000" />
                    </svg>
                    <a href="javascript:void(0)" class="text-white text-[14px] ml-4">
                      {cliente.contactos && cliente.contactos.gmail}
                    </a>
                  </li>
                  <li class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff' viewBox="0 0 482.6 482.6">
                      <path d="M98.339 320.8c47.6 56.9 104.9 101.7 170.3 133.4 24.9 11.8 58.2 25.8 95.3 28.2 2.3.1 4.5.2 6.8.2 24.9 0 44.9-8.6 61.2-26.3.1-.1.3-.3.4-.5 5.8-7 12.4-13.3 19.3-20 4.7-4.5 9.5-9.2 14.1-14 21.3-22.2 21.3-50.4-.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2-12.8 0-25.1 5.6-35.6 16.1l-35.8 35.8c-3.3-1.9-6.7-3.6-9.9-5.2-4-2-7.7-3.9-11-6-32.6-20.7-62.2-47.7-90.5-82.4-14.3-18.1-23.9-33.3-30.6-48.8 9.4-8.5 18.2-17.4 26.7-26.1 3-3.1 6.1-6.2 9.2-9.3 10.8-10.8 16.6-23.3 16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4-6.6-6.8-13.5-13.8-20.3-20.1-10.3-10.1-22.4-15.4-35.2-15.4-12.7 0-24.9 5.3-35.6 15.5l-37.4 37.4c-13.6 13.6-21.3 30.1-22.9 49.2-1.9 23.9 2.5 49.3 13.9 80 17.5 47.5 43.9 91.6 83.1 138.7zm-72.6-216.6c1.2-13.3 6.3-24.4 15.9-34l37.2-37.2c5.8-5.6 12.2-8.5 18.4-8.5 6.1 0 12.3 2.9 18 8.7 6.7 6.2 13 12.7 19.8 19.6 3.4 3.5 6.9 7 10.4 10.6l29.8 29.8c6.2 6.2 9.4 12.5 9.4 18.7s-3.2 12.5-9.4 18.7c-3.1 3.1-6.2 6.3-9.3 9.4-9.3 9.4-18 18.3-27.6 26.8l-.5.5c-8.3 8.3-7 16.2-5 22.2.1.3.2.5.3.8 7.7 18.5 18.4 36.1 35.1 57.1 30 37 61.6 65.7 96.4 87.8 4.3 2.8 8.9 5 13.2 7.2 4 2 7.7 3.9 11 6 .4.2.7.4 1.1.6 3.3 1.7 6.5 2.5 9.7 2.5 8 0 13.2-5.1 14.9-6.8l37.4-37.4c5.8-5.8 12.1-8.9 18.3-8.9 7.6 0 13.8 4.7 17.7 8.9l60.3 60.2c12 12 11.9 25-.3 37.7-4.2 4.5-8.6 8.8-13.3 13.3-7 6.8-14.3 13.8-20.9 21.7-11.5 12.4-25.2 18.2-42.9 18.2-1.7 0-3.5-.1-5.2-.2-32.8-2.1-63.3-14.9-86.2-25.8-62.2-30.1-116.8-72.8-162.1-127-37.3-44.9-62.4-86.7-79-131.5-10.3-27.5-14.2-49.6-12.6-69.7z" data-original="#000000"></path>
                    </svg>
                    <a href="javascript:void(0)" class="text-white text-[14px] ml-4">
                      {cliente.contactos && `Telf: ${cliente.contactos.telefono}`}{cliente.contactos && <span><br />{`Cel: ${cliente.contactos.celular}`}</span>}
                    </a>
                  </li>
                  <li class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff' viewBox="0 0 368.16 368.16">
                      <path d="M184.08 0c-74.992 0-136 61.008-136 136 0 24.688 11.072 51.24 11.536 52.36 3.576 8.488 10.632 21.672 15.72 29.4l93.248 141.288c3.816 5.792 9.464 9.112 15.496 9.112s11.68-3.32 15.496-9.104l93.256-141.296c5.096-7.728 12.144-20.912 15.72-29.4.464-1.112 11.528-27.664 11.528-52.36 0-74.992-61.008-136-136-136zM293.8 182.152c-3.192 7.608-9.76 19.872-14.328 26.8l-93.256 141.296c-1.84 2.792-2.424 2.792-4.264 0L88.696 208.952c-4.568-6.928-11.136-19.2-14.328-26.808-.136-.328-10.288-24.768-10.288-46.144 0-66.168 53.832-120 120-120s120 53.832 120 120c0 21.408-10.176 45.912-10.28 46.152z" data-original="#000000"></path>
                      <path d="M184.08 64.008c-39.704 0-72 32.304-72 72s32.296 72 72 72 72-32.304 72-72-32.296-72-72-72zm0 128c-30.872 0-56-25.12-56-56s25.128-56 56-56 56 25.12 56 56-25.128 56-56 56z" data-original="#000000"></path>
                    </svg>
                    <a href="javascript:void(0)" class="text-white text-[14px] ml-4">
                      {cliente.contactos && cliente.contactos['direccion 1']}
                      {cliente.contactos && cliente.contactos['direccion 2'] && <br />}
                      {cliente.contactos && cliente.contactos['direccion 2']} <br />
                      {cliente.contactos && cliente.contactos.departamento + ' - Bolivia'}                    </a>
                  </li>
                </ul>


              </div>

              <div class="bg-gray-100 p-6 rounded-lg">
                <p class="text-3xl font-semibold text-gray-800">Atencion al cliente</p>


                <form class="mt-8 space-y-4" onSubmit={sendEmail}>
                  <input type='text' name='nombre' onChange={handlerOnChange} placeholder='Nombre'
                    class="w-full rounded-lg py-3 px-4 text-gray-800 text-[14px] outline-[#353535] shadow-xl" required />
                  <input type='email' name='correo' onChange={handlerOnChange} placeholder='Email'
                    class="w-full rounded-lg py-3 px-4 text-gray-800 text-[14px] outline-[#353535] shadow-xl" required />
                  <input type='text' name='referencia' onChange={handlerOnChange} placeholder='Referencia'
                    class="w-full rounded-lg py-3 px-4 text-gray-800 text-[14px] outline-[#353535] shadow-xl" required />
                  <textarea placeholder='Mensaje' value={email.mensaje} name='mensaje' onChange={handlerOnChange} rows="6" required
                    class="w-full rounded-lg px-4 text-gray-800 text-[14px] pt-3 outline-none shadow-xl border-transparent focus:border-transparent focus:ring-0"></textarea>
                  <button
                    class="text-white bg-[#353535] hover:bg-[#353535e2] tracking-wide rounded-lg text-[14px] px-4 py-3 flex items-center justify-center w-full !mt-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff' class="mr-2" viewBox="0 0 548.244 548.244">
                      <path fill-rule="evenodd" d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z" clip-rule="evenodd" data-original="#000000" />
                    </svg>
                    Enviar mensaje
                  </button>
                </form>
              </div>
            </div>



            <div className="w-full px-6 pt-6 flex justify-center bg-[#272b3db7]">
              <div className="mb-1 flex justify-center">
                <a
                  href={cliente.contactos && cliente.contactos.facebook ? cliente.contactos.facebook : '#'}
                  target='_blank'
                  type="button"
                  className="m-1 h-9 w-9 relative flex items-center justify-center rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-full w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href={cliente.contactos && cliente.contactos.twiter ? cliente.contactos.twiter : '#'}
                  type="button"
                  className="m-1 h-9 w-9 flex items-center justify-center  rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-full w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M19.1696 5.13274C19.0076 5.04902 18.85 4.95725 18.6972 4.85776C18.2528 4.564 17.8454 4.21786 17.4837 3.82681C16.5788 2.79136 16.2408 1.74091 16.1163 1.00545H16.1213C16.0173 0.39498 16.0603 0 16.0668 0H11.945V15.9382C11.945 16.1522 11.945 16.3637 11.936 16.5727C11.936 16.5987 11.9335 16.6227 11.932 16.6507C11.932 16.6622 11.932 16.6742 11.9295 16.6862V16.6952C11.886 17.267 11.7027 17.8194 11.3957 18.3038C11.0886 18.7882 10.6672 19.1897 10.1686 19.473C9.64888 19.7687 9.06108 19.9238 8.46317 19.923C6.54276 19.923 4.98634 18.3571 4.98634 16.4232C4.98634 14.4893 6.54276 12.9234 8.46317 12.9234C8.82669 12.923 9.18798 12.9802 9.53361 13.0928L9.53861 8.89606C8.48935 8.76052 7.42338 8.84391 6.40795 9.14096C5.39253 9.43802 4.44969 9.94229 3.63891 10.622C2.92847 11.2392 2.33121 11.9758 1.87399 12.7984C1.7 13.0983 1.04354 14.3038 0.96404 16.2602C0.914043 17.3706 1.24753 18.5211 1.40652 18.9966V19.0066C1.50651 19.2865 1.89399 20.242 2.52546 21.0474C3.03466 21.6935 3.63625 22.2611 4.31087 22.7319V22.7219L4.32087 22.7319C6.31627 24.0878 8.52866 23.9988 8.52866 23.9988C8.91164 23.9833 10.1946 23.9988 11.6515 23.3083C13.2674 22.5429 14.1874 21.4024 14.1874 21.4024C14.7751 20.721 15.2424 19.9444 15.5693 19.106C15.9423 18.1256 16.0668 16.9497 16.0668 16.4797V8.0241C16.1168 8.0541 16.7828 8.49458 16.7828 8.49458C16.7828 8.49458 17.7422 9.10955 19.2391 9.51003C20.3131 9.79501 21.76 9.85501 21.76 9.85501V5.76321C21.253 5.81821 20.2236 5.65822 19.1696 5.13274Z" fill="white" />
                  </svg>
                </a>

                {/* <a
              href={cliente.contactos && cliente.contactos.gmail ? cliente.contactos.gmail : '#'}
              type="button"
              className="m-1 h-9 w-9 rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              data-te-ripple-init
              data-te-ripple-color="light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-full w-4"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                  fillRule="evenodd"
                  clipRule="evenodd" />
              </svg>
            </a> */}

                <a
                  href={cliente.contactos && cliente.contactos.instagram ? cliente.contactos.instagram : '#'}
                  type="button"
                  className="m-1 h-9 w-9 flex items-center justify-center  rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-full w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href={cliente.contactos && cliente.contactos.linkedin ? cliente.contactos.linkedin : '#'}
                  type="button"
                  className="m-1 h-9 w-9 flex items-center justify-center  rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-full w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>

              </div>

            </div>

            <div
              className="p-4 text-center "
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
              <a className="text-whitehite underline" href="https://swoou.com/"
              > Bottak LLC </a> 2024


            </div>


          </div>








          {/* {pathname === '/SolucionesIT' && cliente.Slider2 && <div className='relative  pb-[0px] lg:pb-0 '>
            <h1 className='text-center font-bold text-[25px] py-[50px] text-white'>{languaje === 'Español' ? 'Somos parte de' : 'Business partners'}</h1>
            <Slider content={Object.values(cliente.Slider2)} />
          </div>} */}

          {pathname !== '/SolucionesIT' && cliente.Slider3 && <div className='relative pb-[0px] lg:pb-0 '
          // style={{
          //   backgroundColor: '#011B68',
          //   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(360,683,325)'%3E%3Cstop offset='0' stop-color='%23011B68'/%3E%3Cstop offset='1' stop-color='%23535368'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='300' height='250' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.03'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E")`,
          //   backgroundAttachment: 'fixed',
          //   backgroundSize: 'cover',
          // }}
          // style={{
          //   backgroundColor: '#011B68',
          //   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23011B68'/%3E%3Cstop offset='1' stop-color='%232A3168'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='9' height='9' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23909090' cx='4.5' cy='4.5' r='4.5'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          //   // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(12,683,325)'%3E%3Cstop offset='0' stop-color='%23011B68'/%3E%3Cstop offset='1' stop-color='%231B2E68'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='300' height='250' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.09'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E")`,
          //   backgroundAttachment: 'fixed',
          //   backgroundSize: 'cover',
          // }}
          >

            <h1 className='text-center font-bold text-[25px] py-[50px] text-white'>{languaje === 'Español' ? 'Nuestros Proveedores' : 'Companies'}</h1>
            <Slider content={Object.values(cliente.Slider3)} rtl={true} />
          </div>}
        </div>
        {/* 
        <h3 className={`w-full text-white text-left pt-[150px] font-bold text-[26px] pl-[5px]`}>{languaje === 'Español' ? 'Contactos' : 'Contacts'}</h3>
        <br />
        <div className="p-4  ">
          <p className='w-full flex justify-start items-center py-3 text-[16px]'>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.7656 33.5626L35.2656 30.0626C35.737 29.597 36.3335 29.2783 36.9825 29.1452C37.6315 29.012 38.3052 29.0702 38.9219 29.3126L43.1875 31.0157C43.8106 31.2686 44.3449 31.7004 44.7231 32.2565C45.1013 32.8126 45.3063 33.4682 45.3125 34.1407V41.9532C45.3089 42.4107 45.2127 42.8627 45.0298 43.282C44.8469 43.7013 44.581 44.0793 44.2482 44.3931C43.9153 44.707 43.5224 44.9502 43.0931 45.1083C42.6637 45.2663 42.2069 45.3358 41.75 45.3126C11.8594 43.4532 5.82812 18.1407 4.6875 8.45319C4.63455 7.97746 4.68292 7.49592 4.82945 7.04024C4.97597 6.58455 5.21731 6.16505 5.5376 5.80934C5.85789 5.45363 6.24987 5.16976 6.68774 4.97641C7.12562 4.78307 7.59947 4.68463 8.07812 4.68756H15.625C16.2984 4.68956 16.9559 4.89298 17.5128 5.27167C18.0697 5.65036 18.5006 6.187 18.75 6.81256L20.4531 11.0782C20.7035 11.6924 20.7674 12.3667 20.6368 13.017C20.5062 13.6672 20.1869 14.2646 19.7187 14.7344L16.2187 18.2344C16.2187 18.2344 18.2344 31.8751 31.7656 33.5626Z" fill="white" />
            </svg>
            <span className='pl-[20px]'>
              {cliente.contactos && `Telf: ${cliente.contactos.telefono}`}{cliente.contactos && <span><br />{`Cel: ${cliente.contactos.celular}`}</span>}
            </span>
          </p>
          <p className='w-full flex justify-start items-center py-3 text-[16px]'>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1_443)">
                <path d="M44.9028 8.33348C44.7135 8.31397 44.5227 8.31397 44.3333 8.33348H5.44445C5.19521 8.33732 4.94762 8.37469 4.70834 8.44459L24.7778 28.4307L44.9028 8.33348Z" fill="white" />
                <path d="M46.9583 10.2637L26.7361 30.4026C26.2156 30.9199 25.5116 31.2103 24.7778 31.2103C24.0439 31.2103 23.3399 30.9199 22.8194 30.4026L2.77776 10.4164C2.71615 10.6429 2.68348 10.8762 2.68054 11.1109V38.8887C2.68054 39.6254 2.9732 40.3319 3.49413 40.8529C4.01507 41.3738 4.72161 41.6664 5.45832 41.6664H44.3472C45.0839 41.6664 45.7905 41.3738 46.3114 40.8529C46.8323 40.3319 47.125 39.6254 47.125 38.8887V11.1109C47.1139 10.8215 47.0577 10.5357 46.9583 10.2637ZM7.3611 38.8887H5.43054V36.9026L15.5278 26.8887L17.4861 28.847L7.3611 38.8887ZM44.3194 38.8887H42.375L32.25 28.847L34.2083 26.8887L44.3055 36.9026L44.3194 38.8887Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_1_443">
                  <rect width="50" height="50" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className='pl-[20px]'>
              {cliente.contactos && cliente.contactos.gmail}
            </span>
          </p>
          <p className='w-full flex justify-start items-center py-3 text-[16px]'>
            <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 0.125C13.4432 0.130376 9.07464 1.94292 5.85253 5.16504C2.63041 8.38716 0.817864 12.7557 0.812488 17.3125C0.80703 21.0363 2.02339 24.659 4.27499 27.625C4.27499 27.625 4.74374 28.2422 4.8203 28.3312L18 43.875L31.1859 28.3234C31.2547 28.2406 31.725 27.625 31.725 27.625L31.7265 27.6203C33.977 24.6556 35.1928 21.0346 35.1875 17.3125C35.1821 12.7557 33.3696 8.38716 30.1474 5.16504C26.9253 1.94292 22.5567 0.130376 18 0.125ZM18 23.5625C16.7639 23.5625 15.5555 23.1959 14.5277 22.5092C13.4999 21.8224 12.6988 20.8463 12.2257 19.7043C11.7527 18.5622 11.6289 17.3056 11.8701 16.0932C12.1112 14.8808 12.7065 13.7672 13.5806 12.8931C14.4546 12.019 15.5683 11.4237 16.7807 11.1826C17.9931 10.9414 19.2497 11.0652 20.3918 11.5383C21.5338 12.0113 22.5099 12.8124 23.1967 13.8402C23.8834 14.868 24.25 16.0764 24.25 17.3125C24.2479 18.9695 23.5888 20.558 22.4171 21.7296C21.2455 22.9013 19.657 23.5604 18 23.5625Z" fill="white" />
            </svg>
            <span className='pl-[34px]'>
              {cliente.contactos && cliente.contactos['direccion 1']}
              {cliente.contactos && cliente.contactos['direccion 2'] && <br />}
              {cliente.contactos && cliente.contactos['direccion 2']} <br />
              {cliente.contactos && cliente.contactos.departamento + ' - Bolivia'}
            </span>
          </p>
        </div> 
        */}

        {/* <div className="w-full px-6 pt-6 flex justify-center bg-[#272b3db7]">
          <div className="mb-1 flex justify-center">
            <a
              href={cliente.contactos && cliente.contactos.facebook ? cliente.contactos.facebook : '#'}
              target='_blank'
              type="button"
              className="m-1 h-9 w-9 relative flex items-center justify-center rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              data-te-ripple-init
              data-te-ripple-color="light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-full w-4"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a
              href={cliente.contactos && cliente.contactos.twiter ? cliente.contactos.twiter : '#'}
              type="button"
              className="m-1 h-9 w-9 flex items-center justify-center  rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              data-te-ripple-init
              data-te-ripple-color="light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-full w-4"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M19.1696 5.13274C19.0076 5.04902 18.85 4.95725 18.6972 4.85776C18.2528 4.564 17.8454 4.21786 17.4837 3.82681C16.5788 2.79136 16.2408 1.74091 16.1163 1.00545H16.1213C16.0173 0.39498 16.0603 0 16.0668 0H11.945V15.9382C11.945 16.1522 11.945 16.3637 11.936 16.5727C11.936 16.5987 11.9335 16.6227 11.932 16.6507C11.932 16.6622 11.932 16.6742 11.9295 16.6862V16.6952C11.886 17.267 11.7027 17.8194 11.3957 18.3038C11.0886 18.7882 10.6672 19.1897 10.1686 19.473C9.64888 19.7687 9.06108 19.9238 8.46317 19.923C6.54276 19.923 4.98634 18.3571 4.98634 16.4232C4.98634 14.4893 6.54276 12.9234 8.46317 12.9234C8.82669 12.923 9.18798 12.9802 9.53361 13.0928L9.53861 8.89606C8.48935 8.76052 7.42338 8.84391 6.40795 9.14096C5.39253 9.43802 4.44969 9.94229 3.63891 10.622C2.92847 11.2392 2.33121 11.9758 1.87399 12.7984C1.7 13.0983 1.04354 14.3038 0.96404 16.2602C0.914043 17.3706 1.24753 18.5211 1.40652 18.9966V19.0066C1.50651 19.2865 1.89399 20.242 2.52546 21.0474C3.03466 21.6935 3.63625 22.2611 4.31087 22.7319V22.7219L4.32087 22.7319C6.31627 24.0878 8.52866 23.9988 8.52866 23.9988C8.91164 23.9833 10.1946 23.9988 11.6515 23.3083C13.2674 22.5429 14.1874 21.4024 14.1874 21.4024C14.7751 20.721 15.2424 19.9444 15.5693 19.106C15.9423 18.1256 16.0668 16.9497 16.0668 16.4797V8.0241C16.1168 8.0541 16.7828 8.49458 16.7828 8.49458C16.7828 8.49458 17.7422 9.10955 19.2391 9.51003C20.3131 9.79501 21.76 9.85501 21.76 9.85501V5.76321C21.253 5.81821 20.2236 5.65822 19.1696 5.13274Z" fill="white" />
              </svg>
            </a>

            <a
              href={cliente.contactos && cliente.contactos.gmail ? cliente.contactos.gmail : '#'}
              type="button"
              className="m-1 h-9 w-9 rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              data-te-ripple-init
              data-te-ripple-color="light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-full w-4"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                  fillRule="evenodd"
                  clipRule="evenodd" />
              </svg>
            </a>

            <a
              href={cliente.contactos && cliente.contactos.instagram ? cliente.contactos.instagram : '#'}
              type="button"
              className="m-1 h-9 w-9 flex items-center justify-center  rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              data-te-ripple-init
              data-te-ripple-color="light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-full w-4"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href={cliente.contactos && cliente.contactos.linkedin ? cliente.contactos.linkedin : '#'}
              type="button"
              className="m-1 h-9 w-9 flex items-center justify-center  rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              data-te-ripple-init
              data-te-ripple-color="light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-full w-4"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </a>

          </div>

        </div>

        <div
          className="p-4 text-center "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          <a className="text-whitehite underline" href="https://swoou.com/"
          > Bottak LLC </a> 2024


        </div> */}


      </div>

    </footer>
  )
}




