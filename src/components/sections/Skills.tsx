'use client'

import { motion } from 'framer-motion'
import { IoLogoFigma } from 'react-icons/io5'
import { BiLogoPostgresql } from 'react-icons/bi'
import { SiTypescript, SiGodotengine } from 'react-icons/si'
import { FaReact } from 'react-icons/fa'
import { RiNodejsLine, RiTailwindCssFill, RiNextjsFill } from 'react-icons/ri'

type Skill = {
  name: string
  icon: React.ElementType
}

const skills: Skill[] = [
  { name: 'React', icon: FaReact },
  { name: 'Next.js', icon: RiNextjsFill },
  { name: 'Tailwind CSS', icon: RiTailwindCssFill },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Node.js', icon: RiNodejsLine },
  { name: 'PostgreSQL', icon: BiLogoPostgresql },
  { name: 'Godot', icon: SiGodotengine },
  { name: 'Figma', icon: IoLogoFigma },
]

export default function Skills() {
  return (
    <section className='relative py-24 px-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-row items-start'>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5, once: true }}
            className='text-4xl md:text-5xl font-extrabold orbitron mb-4 md:mb-8 bg-linear-to-r from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent select-none min-w-min'
          >
            My Skills
          </motion.h2>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8'>
          {skills.map((skill) => {
            const Icon = skill.icon

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.06 }}
                className='group relative p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all duration-300 shadow-lg'
              >
                <div className='absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-500/0 to-fuchsia-500/0 group-hover:from-cyan-500/10 group-hover:to-fuchsia-500/10 transition-all duration-300' />

                <div className='relative flex flex-col items-center gap-4'>
                  <Icon
                    size={42}
                    className='text-cyan-400 group-hover:text-fuchsia-400 transition-colors duration-300'
                  />

                  <p className='text-sm md:text-base font-medium tracking-wide text-white/80 group-hover:text-white transition-colors duration-300 select-none'>
                    {skill.name}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
