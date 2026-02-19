import { motion, Variants } from 'motion/react'

export default function MeCard() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.5 },
    },
  }

  const lineVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0 },
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='relative group'
    >
      <div className='absolute -inset-1 bg-linear-to-r from-cyan-500 to-fuchsia-500 rounded-b-2xl rounded-r-2xl blur opacity-10 group-hover:opacity-30 transition duration-500'></div>

      <div className='relative bg-black/40 backdrop-blur-md border border-white/10 rounded-b-2xl rounded-r-2xl overflow-hidden shadow-2xl'>
        <div className='flex items-center justify-between p-1 bg-white/5 border-b border-white/5'>
          <div className='flex gap-2'>
            <div className='w-3 h-3 rounded-full bg-red-500/80 transition-colors' />
            <div className='w-3 h-3 rounded-full bg-yellow-500/80 transition-colors' />
            <div className='w-3 h-3 rounded-full bg-green-500/80 transition-colors' />
          </div>
        </div>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='p-2 font-mono text-xs md:text-sm leading-relaxed bg-[#0f111a] shadow-[0_0_20px_rgba(34,211,238,0.15)]'
        >
          {[
            {
              label: 'name',
              value: "'Raúl Rangel'",
              color: 'text-yellow-300',
            },
            {
              label: 'role',
              value: "'Fullstack Developer'",
              color: 'text-purple-400',
            },
            {
              label: 'specialty',
              value: "'Web Apps & Game Development'",
              color: 'text-cyan-400',
            },
            {
              label: 'stack',
              value: "['Next.js', 'React', 'Node', 'TypeScript', 'Godot']",
              color: 'text-fuchsia-400',
            },
            {
              label: 'mission',
              value: "'Build immersive digital experiences'",
              color: 'text-green-400',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={lineVariants}
              className='hover:bg-cyan-500/5 px-2 rounded flex gap-3 transition-colors duration-500'
            >
              <span className='text-zinc-600'>{i + 1}</span>
              <p>
                <span className='text-zinc-400'>{item.label}</span>:{' '}
                <span className={item.color}>{item.value}</span>,
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
