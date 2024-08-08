
import { UserProvider } from '../context/Context'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {

  return (
    <html lang="es" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/favicon.png' />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#000000" />
        <meta name="description" content="Cursos Bottak" />
        <meta name="keywords" content="Cursos Bottak" />
        <meta name="author" content="Cursos Bottak" />
        <title>Cursos Bottak</title>
      </head>
      <body className={inter.className}   >
        <UserProvider>
          <Navbar></Navbar>

          <main id='home' className='min-h-screen bg-gradient-to-t from-[#00061880] to-[#000618d1]'>
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  )
}


