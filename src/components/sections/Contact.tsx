import { motion } from 'framer-motion'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { SiGmail } from 'react-icons/si'
import ContactForm from '../forms/ContactForm'

export default function Contact() {
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
            Contact
          </motion.h2>
        </div>
        <div className='flex flex-col md:flex-row w-full gap-4 md:gap-16 items-center md:justify-center'>
          <div className='flex flex-col justify-center space-y-4 p-4'>
            <h2 className='text-2xl font-bold text-slate-50/80'>¡Hablemos!</h2>

            <div className='flex gap-4'>
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
              <motion.a
                href='mailto:raulrangel1230@gmail.com?subject=Contacto&body=Hola, quiero hablar contigo'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SiGmail
                  size={32}
                  className='text-red-500/80 transition-colors'
                />
              </motion.a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
