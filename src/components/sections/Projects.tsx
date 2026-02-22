'use client'

import { motion } from 'framer-motion'
import ProjectCard from '@/components/cards/ProjectCard'

const projects = [
  {
    title: 'Dorta',
    description:
      'Pagina web de una empresa de ferretería, con diseño moderno y animaciones suaves para una experiencia atractiva.',
    media: '/videos/dorta.mp4',
    technologies: ['NextJs', 'TypeScript', 'Tailwind', 'Framer Motion'],
    liveUrl: 'https://dorta.vercel.app/',
  },
  {
    title: 'Portfolio Website',
    description:
      'Portafolio moderno desarrollado con Next.js, animaciones fluidas y diseño High-Tech y Espacial.',
    media: '/videos/cunaguaros.mp4',
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    liveUrl: 'https://portfolio-cunaguarosdev.vercel.app/',
  },
]

export default function Projects() {
  return (
    <>
      <div className='w-full h-[5vh] bg-linear-to-b from-transparent to-neutral-950'></div>

      <section
        id='projects'
        className='relative py-24 px-6 md:px-16 bg-neutral-950 overflow-hidden'
      >
        <div className='relative max-w-6xl mx-auto'>
          <div className='flex flex-row items-start'>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5, once: true }}
              className='text-4xl md:text-5xl font-extrabold orbitron mb-4 md:mb-8 bg-linear-to-r from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent select-none min-w-min'
            >
              Projects
            </motion.h2>
          </div>

          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.15 }}
            className='flex flex-wrap justify-center gap-8'
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <div className='w-full h-[5vh] bg-linear-to-b from-neutral-950 to-transparent'></div>
    </>
  )
}
