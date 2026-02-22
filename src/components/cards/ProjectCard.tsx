'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import GlowDivider from '../GlowDivider'

type ProjectCardProps = {
  title: string
  description: string
  media: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
}

export default function ProjectCard({
  title,
  description,
  media,
  technologies,
  liveUrl,
}: ProjectCardProps) {
  const isVideo = (src: string) =>
    src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.ogg')
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.06 }}
      className='relative group rounded-2xl w-xs h-full'
    >
      <div className='absolute -inset-1 bg-linear-to-r from-cyan-500 to-fuchsia-600 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500 pointer-events-none' />

      <div className='flex flex-col bg-black/40 rounded-2xl overflow-hidden border border-white/10 h-full'>
        <div className='relative w-full min-h-64 h-64 overflow-hidden'>
          {isVideo(media) ? (
            <video
              src={media}
              autoPlay
              muted
              loop
              playsInline
              className='w-full h-full object-cover group-hover:scale-105 transition duration-500'
            />
          ) : (
            <Image
              src={media}
              alt={title}
              fill
              className='w-full h-full object-cover group-hover:scale-105 transition duration-500'
            />
          )}
        </div>

        <div className='p-6 flex flex-col gap-2 h-full'>
          <h3 className='text-xl font-semibold bg-linear-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent'>
            {title}
          </h3>
          <GlowDivider />
          <p className='text-sm text-gray-400 leading-relaxed'>{description}</p>

          <div className='flex flex-wrap gap-2'>
            {technologies.map((tech, index) => (
              <span
                key={index}
                className='text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300'
              >
                {tech}
              </span>
            ))}
          </div>

          <div className='flex flex-row gap-4 pt-2 mt-auto'>
            {liveUrl && (
              <Link
                href={liveUrl}
                target='_blank'
                className='flex items-center gap-2 text-cyan-500 hover:text-fuchsia-400 transition'
              >
                <BsBoxArrowUpRight size={18} />
                Live
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
