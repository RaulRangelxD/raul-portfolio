import { motion } from 'motion/react'
import Image from 'next/image'

export default function WorkingProgress() {
  return (
    <div className='flex w-full justify-center items-center'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.5, once: true }}
        className='relative group w-[90vw] md:w-[70vw] m-4 flex justify-center items-center'
      >
        <div className='absolute left-1/2 -translate-x-1/2 w-[80vw] md:w-[60vw] h-full bg-linear-to-r from-cyan-500 to-fuchsia-600 rounded-2xl blur opacity-20 group-hover:opacity-40 z-0 pointer-events-none transition duration-500'></div>

        <div className='relative z-10 w-[80vw] md:w-[60vw] border border-white/10 rounded-2xl overflow-hidden'>
          <Image
            src='/working-progress.png'
            alt='working progress'
            width={800}
            height={600}
            className='w-full h-auto object-cover'
          />
        </div>
      </motion.div>
    </div>
  )
}
