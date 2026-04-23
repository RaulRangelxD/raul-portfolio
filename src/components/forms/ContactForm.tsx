'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { TbMail, TbMailForward, TbMailCheck } from 'react-icons/tb'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setSent(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success('Mensaje enviado correctamente')

        setName('')
        setEmail('')
        setMessage('')

        setSent(true)
      } else {
        toast.error('No se pudo enviar el mensaje')
      }
    } catch (error) {
      toast.error('Error de red')
    }

    setLoading(false)

    setTimeout(() => setSent(false), 3000)
  }

  const renderIcon = () => {
    if (loading) return <TbMailForward className='text-xl animate-pulse' />
    if (sent) return <TbMailCheck className='text-xl' />
    return <TbMail className='text-xl' />
  }

  const renderText = () => {
    if (loading) return 'Enviando...'
    if (sent) return 'Enviado'
    return 'Enviar mensaje'
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-[80vw] md:w-[50vw] flex flex-col justify-center space-y-4 p-4'
    >
      <input
        type='text'
        placeholder='Tu nombre'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full p-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 focus:outline-none focus:border-fuchsia-500'
      />

      <input
        type='email'
        placeholder='Tu email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full p-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500'
      />

      <textarea
        placeholder='Tu mensaje'
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className='w-full p-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 focus:outline-none focus:border-fuchsia-500'
      />

      <motion.button
        type='submit'
        disabled={loading}
        whileHover={!loading ? { scale: 1.06 } : {}}
        whileTap={!loading ? { scale: 0.92 } : {}}
        animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className='w-full py-3 rounded-xl bg-linear-to-r from-blue-500 to-fuchsia-500 hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2'
      >
        {renderIcon()}
        <span>{renderText()}</span>
      </motion.button>
    </form>
  )
}
