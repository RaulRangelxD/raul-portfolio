'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { BsGithub, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs'
import PhysicsRabbits from './PhysicsRabbits'

export default function Footer() {
  return (
    <footer className='relative overflow-hidden'>
      <div className='w-full h-[5vh] bg-linear-to-b from-transparent to-slate-950'></div>
      <div className='flex flex-col md:flex-row p-4 md:p-8 bg-slate-950 text-slate-50 text-sm select-none'>
        <div className='flex flex-col w-full md:w-1/3 justify-center items-center'>
          <span className='text-center'>
            Si necesitas un equipo de desarrolladores profesional, puedes
            contactarnos en{' '}
            <motion.a
              href='https://portfolio-cunaguarosdev.vercel.app/'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='text-cyan-500 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)] font-extrabold'
            >
              CunaguarosDev
            </motion.a>
            .
          </span>
          <motion.a
            href='https://portfolio-cunaguarosdev.vercel.app/'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className=''
          >
            <Image
              src='/cunaguaros.png'
              alt='cunaguaros'
              width={200}
              height={200}
              className='hue-rotate-70 saturate-200 hover:hue-rotate-180 hover:saturate-200 w-[30vw] md:w-[14vw] h-auto transition-all duration-500'
            />
          </motion.a>
        </div>
        <div className=' md:w-1/3'></div>
        <div className='flex flex-col w-full gap-4 md:w-1/3 items-center md:items-end'>
          <span className='text-fuchsia-500 drop-shadow-[0_0_6px_rgba(217,70,239,0.6)] text-xl font-extrabold'>
            Sígueme
          </span>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='relative group'
          >
            <div className='absolute -inset-1 bg-linear-to-r from-cyan-500 to-fuchsia-500 rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-500'></div>

            <div className='relative flex flex-row flex-wrap gap-2'>
              <motion.a
                href='https://www.youtube.com/@rauldevxd'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <BsYoutube
                  size={32}
                  className='text-red-500/80 transition-colors'
                />
              </motion.a>
              <motion.a
                href='https://www.instagram.com/rauldevgames?igsh=OTh3OHYzbW43dHpm'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <BsInstagram
                  size={32}
                  className='text-pink-500/80 transition-colors'
                />
              </motion.a>
              <motion.a
                href='https://github.com/RaulRangelxD'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <BsGithub
                  size={32}
                  className='text-slate-50/80 transition-colors'
                />
              </motion.a>
              <motion.a
                href='https://www.linkedin.com/in/raul-rangel-765693258/'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <BsLinkedin
                  size={32}
                  className='text-blue-500/80 transition-colors'
                />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
      <div className='flex justify-center items-center col-span-3 row-start-2 bg-slate-950'>
        ©2026 — All rights reserved.
      </div>
      <PhysicsRabbits />
    </footer>
  )
}
