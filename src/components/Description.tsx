import { motion } from 'motion/react'
import Image from 'next/image'
import GlowDivider from '@/components/GlowDivider'

export default function Description() {
  return (
    <>
      <div className='w-full h-[5vh] bg-linear-to-b from-transparent to-slate-950'></div>
      <div className='flex flex-col min-h-screen items-start text-center p-4 md:p-8 bg-slate-950 text-slate-50 select-none'>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5, once: true }}
          className='text-4xl md:text-5xl font-extrabold orbitron mb-4 text-cyan-400'
        >
          Sobre mí
        </motion.h2>

        <div className='flex flex-col md:flex-row w-full gap-4 md:gap-16 items-center md:justify-center'>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.5, once: true }}
            className='relative group w-[50vw] md:w-[30vw]'
          >
            <div className='absolute -inset-1 bg-linear-to-r from-cyan-500 to-fuchsia-600 rounded-b-2xl rounded-r-2xl blur opacity-20 group-hover:opacity-40 transition duration-500'></div>

            <div className='w-[50vw] md:w-[30vw] border border-white/10 rounded-b-2xl rounded-r-2xl overflow-hidden relative'>
              <Image
                src='/yo.jpg'
                alt='yo'
                width={800}
                height={1200}
                className='w-full h-auto rounded-b-2xl rounded-r-2xl group-hover:scale-105 transition-all duration-500'
                priority
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.5, once: true }}
            className='relative group'
          >
            <div className='absolute -inset-1 bg-linear-to-r from-cyan-500 to-fuchsia-600 rounded-b-2xl rounded-r-2xl blur opacity-10 group-hover:opacity-30 transition duration-500'></div>

            <div className='relative w-[80vw] md:w-[40vw] flex flex-col items-start gap-4 p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-b-2xl rounded-r-2xl overflow-hidden shadow-2xl'>
              <p className='text-start'>
                No solo escribo código, construyo{' '}
                <span className='text-cyan-500 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)] font-extrabold'>
                  experiencias
                </span>
                .
              </p>
              <GlowDivider />
              <p className='text-start'>
                Desarrollo aplicaciones y sistemas que combinan arquitectura
                sólida, rendimiento y una identidad visual fuerte. Trabajo
                principalmente con{' '}
                <span className='text-fuchsia-500 drop-shadow-[0_0_6px_rgba(217,70,239,0.6)] font-extrabold'>
                  Next.js, TypeScript y PostgreSQL
                </span>
                , diseñando soluciones escalables, bien estructuradas y pensadas
                para crecer sin perder claridad.
              </p>
              <GlowDivider />
              <p className='text-start'>
                Además del desarrollo web, también trabajo en desarrollo de
                videojuegos utilizando{' '}
                <span className='text-fuchsia-500 drop-shadow-[0_0_6px_rgba(217,70,239,0.6)] font-extrabold'>
                  Godot
                </span>
                , donde aplico principios de arquitectura, máquinas de estados y
                sistemas modulares para crear mecánicas limpias y reutilizables.
                Me interesa tanto la lógica interna como la sensación que
                transmite el juego al jugador.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className='w-full h-[5vh] bg-linear-to-b from-slate-950 to-transparent'></div>
    </>
  )
}
